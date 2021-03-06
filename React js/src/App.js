import { Router, Switch, Route } from "react-router-dom";

import Login from "./components/user/Login";
import UserRegistration from "./components/user/UserRegistration";
import DashBoard from "./components/dashboard/DashBoard";

import history from "./history";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducer);
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/userRegistration" component={UserRegistration} />

          <Route path="/dashboard" component={DashBoard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
