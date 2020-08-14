import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { closedSub } from '../actions/index';
import { Link } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService'


export default function Succes() {
  const dispatch = useDispatch()
  const stateSigned = useSelector(state => state.signed);
  const token = localStorage.getItem("token");
  const authService = new AuthenticationService();
  let loggedIn = true
  const idUser= localStorage.getItem('id')
  authService.getDemandes(token,idUser);
  authService.getCompte2(token,idUser);


  if (token == null) {
    loggedIn = false
  }

  if (loggedIn === false) {

    return (<Redirect to="/" />)
  }
  else if (stateSigned === false) {
    return (<Redirect to="/demandForm" />)
  }
  else {
    dispatch(closedSub())
    return (

      <div className="succesPage">
        <NavBar />
        <div className="succes">

          <Alert variant="primary">
            <Alert.Heading>votre demande a été transmise au service concerné</Alert.Heading>
            <p><br />

                Nous vous remercions de nous avoir contactés à propos de votre demande.
                Si vous avez besoin d'une assistance supplémentaire, n'hésitez pas à nous recontacter.
            </p>
            <hr />
            <p className="mb-0">
              Vous pouvez à tout moment consulter vos demandes et aussi faire des modifications.
           </p>
            <hr />
            <div className="d-flex justify-content-end">
            <Link to="/listeDemandes">
              <Button variant="outline-primary">
                Consultation
              </Button>
            </Link>  
            </div>
          </Alert>

        </div>
        <Footer /></div>
    )
  }
}
