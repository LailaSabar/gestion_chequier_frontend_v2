import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form2 from './components/Form2';
import SignDemand from './components/SignDemand';
import Succes from './components/succes';
import Login from './components/Login';
import Logout from './components/Logout';
import table from './components/home';
import ListDemandes from './components/listDemandes';
import UpdateDemande from './components/updateDemande';
import   {BrowserRouter as Router, Switch, Route} from 'react-router-dom'





class App extends Component{
  
  render(){
  return (
    <Router>
    <div>
      <Switch>
        
        <Route path="/home" component={table}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/demandForm" exact component={Form2}/>
        <Route path="/listeDemandes" component={ListDemandes}/>
        <Route path="/UpdateDemande" component={UpdateDemande}/>
        <Route path="/demandForm/signDemand" exact component={SignDemand}/>
        <Route path="/demandForm/signDemand/succes" exact component={Succes}/>
        <Route path="/" exact component={Login}/>
      </Switch>

      
      
    </div>
    </Router>
  );
}}

export default App;
