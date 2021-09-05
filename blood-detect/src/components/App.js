import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { Register } from "./register/register";
import { SignIn } from "./signin/signin";
import { Dashboard } from "./dashboard/dashboard";
import { ForgotPassword } from "./forgot-password/forgotPassword"; 
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/" exact component={Dashboard}></PrivateRoute>
            <Route path="/register" component={Register}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
            {/* 
            <Route path="/list/:id?" component={List}></Route>
             */}
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
