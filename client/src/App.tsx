import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppFrame from "./components/AppFrame";
import Welcome from "./pages/welcome/Welcome";
import Play from "./pages/play/Play";
import socket from "./socket";

console.log(socket);

function App() {
  return (
    <AppFrame>
      <Router>
        <Switch>
          <Route path="/play/:code">
            <Play />
          </Route>
          <Route path="/" exact>
            <Welcome />
          </Route>
        </Switch>
      </Router>
    </AppFrame>
  );
}

export default App;
