import './assets/css/custom.css';
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import React, {createContext, useContext, useEffect, useState} from "react";
import { isLoggedIn } from './services/auth'
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
      <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <LoginRoute exact={true} path={"/"}>
            <Login/>
          </LoginRoute>
          <Route path={"/signup"}>
            <Signup/>
          </Route>
          <Route path={'/check-email'}>
            <SignupCheckemail/>
          </Route>
          <Route path={"/forgotpassword"}>
            <Forgotpassword/>
          </Route>
          <PrivateRoute path={'/home'}>
            <Layout page={<Home/>}/>
          </PrivateRoute>
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
      </ProvideAuth>
    </div>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
      <Route
          {...rest}
          render={({ location }) =>
              auth ? (
                  children
              ) : (
                  <Redirect
                      to={{
                          pathname: "/",
                          state: { from: location }
                      }}
                  />
              )
          }
      />
  );
}
function LoginRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
      <Route
          {...rest}
          render={({ location }) =>
              auth ? (
                      <Redirect
                          to={{
                              pathname: "/",
                              state: { from: location }
                          }}
                      />
              ) : (
                  children
              )
          }
      />
  );
}

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = isLoggedIn();
  return (
      <authContext.Provider value={auth}>
          {children}
      </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}