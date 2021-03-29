import './assets/css/custom.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from '../src/Views/Signup'
import Login from '../src/Views/Login'
import Forgotpassword from '../src/Views/Forgotpassword'
import SignupCheckemail from '../src/Views/SignupCheckemail'
import Profile from '../src/Views/Profile'
import Home from '../src/Views/Home'
import Contact from '../src/Views/Contact'
import About from '../src/Views/About'
import Layout from './Components/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={"/"}>
            <Login/>
          </Route>
          <Route path={"/signup"}>
            <Signup/>
          </Route>
          <Route path={'/check-email'}>
            <SignupCheckemail/>
          </Route>
          <Route path={"/forgotpassword"}>
            <Forgotpassword/>
          </Route>
          <Route path={'/home'}>
            <Layout page={<Home/>}/>
          </Route>
          <Route path={'/contact'}>
            <Layout page={<Contact/>}/>
          </Route>
          <Route path={'/profile'}>
            <Layout page={<Profile/>}/>
          </Route>
          <Route path={'/about'}>
            <Layout page={<About/>}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
