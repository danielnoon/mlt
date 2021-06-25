import { io } from "socket.io-client";

const URL = window.location.hostname.includes("localhost")
  ? "http://localhost:8080"
  : "https://mlt-gateway.danielnoon.info";
const socket = io(URL, { autoConnect: true });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
