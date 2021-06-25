import { Server } from "socket.io";
import data from "./data/questions.json";

const mixed = data.data.reduce<string[]>(
  (prev, curr) => [...curr.questions, ...prev],
  []
);

const categories = new Map<string, typeof data.data[0]>(
  data.data.map((cat) => [cat.id, cat])
);
categories.set("mixed", {
  id: "mixed",
  name: "Mixed",
  questions: mixed,
  nsfw: true,
});

const io = new Server(parseInt(process.env.PORT, 10) || 8080, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

interface User {
  name: string;
  id: string;
  room: string;
}

interface Room {
  question: string;
  state: "joining" | "deliberating" | "reviewing";
  code: string;
  host: string;
  players: User[];
  queue: User[];
  ready: string[];
  category: string;
}

interface Submission {
  user: string;
  choice: string;
}

const deadUsers = new Map<string, User>();
const users = new Map<string, User>();
const rooms = new Map<string, Room>();
const submissions = new Map<string, Submission[]>();
const codeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateRoom(): string {
  const code = Array(6)
    .fill(0)
    .map(() => codeChars.charAt(Math.floor(Math.random() * codeChars.length)))
    .join("");

  if (rooms.has(code)) {
    return generateRoom();
  }

  return code;
}

function questionFrom(category: string) {
  const q = categories.get(category).questions;
  const i = Math.floor(Math.random() * q.length);
  return q[i];
}

function removeUser(id: string) {
  const user = users.get(id);
  const room = rooms.get(user.room);
  const subs = submissions.get(room.code);

  const sidx = subs.findIndex((s) => s.user === user.id);
  if (sidx >= 0) {
    subs.splice(sidx, 1);
  }
}

function resetUser(room: string, name: string) {
  // TODO: get user back to playing after being disconnected
}

io.on("connect", (socket) => {
  socket.on("join-room", (room: string, name: string, ack) => {
    socket.join(room);
    users.set(socket.id, { id: socket.id, name: name, room });

    if (rooms.has(room)) {
      const r = rooms.get(room)!;

      if (!r.host) {
        r.host = socket.id;
      }

      if (r.state !== "deliberating") {
        if (!r.players.find((p) => p.id === socket.id)) {
          r.players.push(users.get(socket.id));
        }
      } else {
        if (
          !r.players.find((p) => p.id === socket.id) &&
          !r.queue.find((p) => p.id === socket.id)
        ) {
          r.queue.push(users.get(socket.id));
        }
      }
    } else {
      const r: Room = {
        question: "",
        code: room,
        host: socket.id,
        players: [users.get(socket.id)],
        queue: [],
        state: "joining",
        ready: [],
        category: "mixed",
      };

      rooms.set(room, r);
      submissions.set(room, []);
    }

    io.to(room).emit("update-room", rooms.get(room));
    ack(rooms.get(room));
  });

  socket.on("start", (category: string = "mixed") => {
    const user = users.get(socket.id);
    const room = rooms.get(user.room);

    if (room.state === "joining") {
      room.category = category;
      room.state = "deliberating";
      room.question = questionFrom(room.category);
      io.to(room.code).emit("update-room", room);
    }
  });

  socket.on("new-room", (ack) => {
    const code = generateRoom();
    ack(code);
  });

  socket.on("ready", () => {
    const user = users.get(socket.id);
    const room = rooms.get(user.room);

    if (!room.ready.includes(user.id)) {
      room.ready.push(user.id);
      if (room.ready.length === room.players.length) {
        room.question = questionFrom(room.category);
        room.state = "deliberating";
        room.ready = [];
      }
      io.to(room.code).emit("update-room", room);
    }
  });

  socket.on("submit", (choice) => {
    const user = users.get(socket.id);
    const room = rooms.get(user.room);
    const subs = submissions.get(user.room);

    if (!subs.find((sub) => sub.user === user.id)) {
      subs.push({ choice, user: user.id });
      if (subs.length === room.players.length) {
        io.to(room.code).emit(
          "show-answers",
          subs.map((s) => users.get(s.choice).name)
        );
        submissions.set(room.code, []);
        room.state = "reviewing";
        if (room.queue.length) {
          room.players.push(...room.queue);
          room.queue = [];
        }
        io.to(room.code).emit("update-room", room);
      }
    }
  });

  socket.on("disconnect", () => {
    deadUsers.set(socket.id, users.get(socket.id));
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});
