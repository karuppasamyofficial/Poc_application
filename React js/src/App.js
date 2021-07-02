import {
  Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";

import Login from "./components/Login";
import UserRegistration from "./components/user/UserRegistration";
import DashBoard from "./components/dashboard/DashBoard";
import QuestionsView from "./components/dashboard/QuestionsView";
import Questions from "./components/dashboard/Questions";
// import DashBoard from "./components/dashboard/DashBoard";
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
   
      
      <Switch>
            <Route exact path='/' component={Login}  />
            <Route path='/userRegistration' component={UserRegistration} /> 
            
            <Route path='/dashboard'  component={DashBoard} />
              {/* <IndexRoute component={AuthCheck(HomeContainer)} /> */}
            {/* <Route path='/dashboard/questions'   component={Questions} />  
            <Route path='/dashboard/questions/ask'   component={QuestionsView} />  */}
               
            
              
            

      </Switch>
   
  </Router>
  </Provider>
  );
}

export default App;
