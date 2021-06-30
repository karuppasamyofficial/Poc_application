import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./components/Login";
import UserRegistration from "./components/user/UserRegistration";
import DashBoard from "./components/dashboard/DashBoard";

import history from './history';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer);
function App() {
  return (
    <Provider  store={store}>
    <Router history={history}>
    <div>
      
      <Switch>
          <Route exact path='/' component={Login} exact />
          <Route path='/UserRegistration' component={UserRegistration} /> 
          <Route path='/DashBoard' component={DashBoard} /> 

      </Switch>
    </div>
  </Router>
  </Provider>
  );
}

export default App;
