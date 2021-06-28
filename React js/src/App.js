import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./components/Login";
import UserRegistration from "./components/UserRegistration";

function App() {
  return (
    <Router>
    <div>
      
      <Switch>
          <Route exact path='/' component={Login} exact />
          {/* {/* <Route path='/contact' component={Contact} /> */}
          <Route path='/UserRegistration' component={UserRegistration} /> 
      </Switch>
    </div>
  </Router>
  );
}

export default App;
