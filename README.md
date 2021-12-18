# Most Likely To

This project aims to implement a fun and intuitive room-based "Who's Most Likely To" game. Currently, it is very basic—for the most part, the server is just a way for clients to talk to each other. Both the client and the server are written in TypeScript and use socket.io to communicate. The client uses React with styled-components for styling and react-spring for animations (I have yet to work on transitions). 

## Setup

1. Make sure you have Node.js installed with at least npm version 7 since the project uses npm workspaces.
2. Install dependencies by running `npm i` in the project root.
3. Start the dev server by running `npm run dev`.

## Project Structure

The project consists of a React single-page web app (located in `client`) and a Socket.io-based server (located in `server`) for handling shared game state. There is also a shared types subproject (located in `types`) that can be referenced in any subproject with the `mlt-types` package.

### Client

In the `client/src` directory, there is really only one file that should be touched, and that’s `App.tsx` as it handles routing. Otherwise, there are four subdirectories:

* `components`
  * Includes basic components with which to build out the rest of the app. Most of these components are just styled components.
* `hooks`
  * Custom hooks.
* `pages`
  * Complex components that serve to maintain app state and build interfaces from the basic components.
* `util`
  * Utility functions and classes. 

### Server

Honestly the server is a mess right now, but you can find it in the `server/src` d

## Contributing

