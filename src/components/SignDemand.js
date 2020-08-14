import React from 'react'
import { Form, Button, InputGroup} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { signDemande } from '../actions/index';
import { signDemandeFailure } from '../actions/index';
import NavBar from './NavBar';
import Footer from './Footer';
import { Redirect } from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt,faKey} from '@fortawesome/free-solid-svg-icons';



export default function SignDemand() {

    const dispatch = useDispatch();
    const authService = new AuthenticationService();
    const token = localStorage.getItem("token")
    let loggedIn = true
    let history = useHistory();
    if (token == null) {
        loggedIn = false
    }

    const { register, handleSubmit } = useForm();


    authService.getUser(localStorage.getItem("token"), localStorage.getItem("id"));
    const id_abonne = localStorage.getItem("id")
    const demandData = useSelector(state => state.demand.demand);
    const pass = useSelector(state => state.logged.user.password);
    const stateSubmit = useSelector(state => state.demand);


    const onSubmit = (data) => {

        if (data.password === pass) {
            authService.insertDemand(localStorage.getItem("token"), demandData.numero_compte, demandData, id_abonne)
            dispatch(signDemande())
            history.push('/demandForm/signDemand/succes')
        }
        else {
            alert(" Le mot de passe saisie est incorrect")
            dispatch(signDemandeFailure())
            document.getElementById("form-sign").reset();          
        }

    }

    if (loggedIn === false) {

        return (<Redirect to="/" />)
    }
    else if (stateSubmit === false) {
        return (<Redirect to="/demandForm" />)
    }
    else {

        return (

            <div className="signPage">
                <NavBar />
                <div className="sign-form">

                    <h5 className="title" ><FontAwesomeIcon icon={faPenAlt}/> &nbsp;Signature Du Demande Chequier</h5> 
                    <Form className="col justify-content-center" onSubmit={handleSubmit(onSubmit)} id="form-sign">

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faKey}/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control name="password" type="password" placeholder="Password" required ref={register} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Button variant="warning" type="submit" className="btn-block" ref={register}>Signer</Button>
                        </Form.Group>


                    </Form>

                </div><Footer /></div>



        )
    }
}
