import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { login, loginFailed } from '../actions/index';
import { useHistory } from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService'
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignInAlt,faUser, faKey } from '@fortawesome/free-solid-svg-icons';



export default function Login() {

    const dispatch = useDispatch();
    let history = useHistory();
    const authService = new AuthenticationService();
    let loggedIn = false;
    const { register, handleSubmit } = useForm({ mode: "onSubmit" });


    const onSubmit = (data) => {

        authService.login(data).then((resp) => {
            let jwt = resp.headers.authorization;
            authService.saveToken(jwt);
            dispatch(login(data))
            authService.getUser(jwt, data.username);
            history.push('/home')
        })
            .catch(error=> alert(" Username ou mot de passe incorrect")).catch(document.getElementById("loginForm").reset())}


    if (localStorage.getItem("token") != null) {
        loggedIn = true
    }
    if (loggedIn === true) {

        return (<Redirect to="/table" />)
      }
    else{

    return (
        <div >
            <div className="login-page">

                <div className="login">
                    <h4 className="title text-white " > <FontAwesomeIcon icon={faSignInAlt}/> &nbsp;Authentification</h4>
                    <Form className="col justify-content-center" onSubmit={handleSubmit(onSubmit)} id="loginForm">

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="text-white ">Username</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faUser}/> </InputGroup.Text> 
                                </InputGroup.Prepend>
                                <Form.Control name="username" type="text" placeholder="Username" required ref={register} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="text-white ">Mot de passe</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faKey}/> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control name="password" type="password" placeholder="Password" required ref={register} />
                            </InputGroup>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Button variant="warning" type="submit" className="btn-block"  >Login</Button>
                        </Form.Group>


                    </Form></div></div>

        </div>



    )
}}
