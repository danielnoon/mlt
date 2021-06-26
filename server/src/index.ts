import { Server } from "socket.io";
import { counter } from "./counter";
import data from "./data/questions.json";
import { deadUsers, rooms, submissions, users } from "./data/store";
import { getToken, validateToken } from "./token";
import { Room, User } from "./types";

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

io.on("connect", (socket) => {
  socket.on("join-room", async (room: string, name: string, ack) => {
    socket.join(room);
    const user = { id: socket.id, name: name, room };

    users.set(socket.id, user);

    if (rooms.has(room)) {
      const r = rooms.get(room)!;

      if (!r.host) {
        r.host = socket.id;
      }

      if (r.state !== "deliberating") {
        if (!r.players.find((p) => p.id === socket.id)) {
          r.players.push(user);
        }
      } else {
        if (
          !r.players.find((p) => p.id === socket.id) &&
          !r.queue.find((p) => p.id === socket.id)
        ) {
          r.queue.push(user);
        }
      }
    } else {
      const r: Room = {
        question: "",
        code: room,
        host: socket.id,
        players: [user],
        queue: [],
        state: "joining",
        ready: [],
        category: "mixed",
        results: [],
      };

      rooms.set(room, r);
      submissions.set(room, []);
    }

    const token = await getToken(user);

    io.to(room).emit("update-room", rooms.get(room));
    ack({ error: null, data: { room: rooms.get(room), token } });
  });

  socket.on("rejoin", async (token: string, ack) => {
    const user = await validateToken(token).catch(() => "token error" as const);

    if (user === "token error") {
      ack({ error: "token invalid", data: null });
      return;
    }

    const room = rooms.get(user.room);

    if (!room) {
      ack({ error: "room does not exist", data: null });
      return;
    }

    ack({ error: null, data: room });
  });

  socket.on("start", async (token: string, category: string = "mixed", ack) => {
    const user = await validateToken(token).catch(() => "token error" as const);

    if (user === "token error") {
      ack({ error: "token invalid", data: null });
      return;
    }

    const room = rooms.get(user.room);

    if (!room) {
      ack({ error: "room does not exist", data: null });
    }

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

  socket.on("ready", async (token: string, ack) => {
    const user = await validateToken(token).catch(() => "token error" as const);

    if (user === "token error") {
      ack({ error: "token invalid", data: null });
      return;
    }

    const room = rooms.get(user.room);

    if (!room) {
      ack({ error: "room does not exist", data: null });
    }

    if (!room.ready.includes(user.id)) {
      room.ready.push(user.id);

      if (room.ready.length === room.players.length) {
        room.question = questionFrom(room.category);
        room.state = "deliberating";
        room.ready = [];
      }

      io.to(room.code).emit("update-room", room);
      ack({ error: null, data: null });
    } else {
      ack({ error: "already voted", data: null });
    }
  });

  socket.on("submit", async (token: string, choice: string) => {
    const user = await validateToken(token);
    const room = rooms.get(user.room);
    const subs = submissions.get(user.room);

    if (!subs.find((sub) => sub.user === user.id)) {
      subs.push({ choice, user: user.id });
      if (subs.length === room.players.length) {
        const results = Object.entries(counter(subs.map((s) => s.choice)));
        room.results = results.map(([user, votes]) => ({ user, votes }));
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
