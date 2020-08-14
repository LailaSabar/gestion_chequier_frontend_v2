import React from 'react'
import { Table, Container, Button, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCreditCard, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faAdjust, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getDemandeUpdate, getDemandesFailure, getDemandesSuccess, clearFiltredData, getFiltredDemandesSuccess, getFiltredDemandesFailure } from '../actions';
import { useForm } from "react-hook-form";
import NavBar from './NavBar';
import Footer from './Footer';
import { Redirect } from "react-router-dom";


function ListDemandes() {
    const abonne = useSelector(state => state.abonne);
    const demandes = useSelector(state => state.data);
    const filtredData = useSelector(state => state.filtredData);
    const comptes = useSelector(state => state.comptes);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const token = localStorage.getItem('token')
    const history = useHistory();
    const idUser=localStorage.getItem('id')
    let loggedIn = true
    if (token == null) {
        loggedIn = false
    }




    function handleChange(evt) {
        setValue(evt.target.name, evt.target.value)
    }

    const appUser=localStorage.getItem('id')

    const onSubmit = (data) => {
        axios.post('http://localhost:8080/search', { abonne: appUser, ...data }, { observe: 'response' }, {

            headers: {
                authorization: token
            }
        })
            .then(response => {
                const result = response.data;

                dispatch(getFiltredDemandesSuccess(result))

            })
            .catch(error => {

                dispatch(getFiltredDemandesFailure(error.message))

            })
    }



    function clear() {
        dispatch(clearFiltredData());
        document.getElementById("searchForm").reset();
    }
    if (loggedIn === false) {

        return (<Redirect to="/" />)
    }
    else {
    return (
        <div>
        <NavBar />
        <Container className="mt-4 containerTab">
             
            
            <Form onSubmit={handleSubmit(onSubmit)} id="searchForm" className="filter">
                <Form.Row>
                    <Form.Group as={Col} controlId="formCompte">
                        <Form.Label>Numero Compte</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" name="compte" defaultValue="" onChange={handleChange} ref={register}>
                                <option key={0} value="" selected disabled >
                                    Selectionner compte ...
                                </option>
                                {
                                    comptes.map((compte) =>
                                        <option
                                            key={compte.id}
                                            value={compte.id}>
                                            {compte.numero_compte}
                                        </option>
                                    )
                                }
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDateDebut">
                        <Form.Label>Date début</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name="date_debut" onChange={handleChange} ref={register} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDateFin">
                        <Form.Label>Date fin</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="date" name="date_fin" onChange={handleChange} ref={register} />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formMontantMin">
                        <Form.Label>Montant min</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" name="montant_min" onChange={handleChange} ref={register} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formMontantMax">
                        <Form.Label>Montant max</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" name="montant_max" onChange={handleChange} ref={register} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formStatut">
                        <Form.Label>Statut</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faAdjust} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" name="statut" defaultValue="" onChange={handleChange} ref={register}>
                                <option key={0} value="" selected disabled>
                                    Selectionner statut ...
                                </option>
                                <option value="Enregistré">Enregistré</option>
                                <option value="Confirmé et signé">Confirmé et signé</option>
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row align="right">
                    <Form.Group as={Col} controlId="formRecheche">
                        <Button variant="warning" type="submit" align="right">
                            Rechercher
                        </Button>
                    </Form.Group>
                </Form.Row>
                {
                    filtredData != null ?
                        <Form.Row align="right">
                            <Form.Group as={Col} controlId="formReset">
                                <Button variant="primary" align="right" onClick={() => clear()}>
                                    Clear
                        </Button>
                            </Form.Group>
                        </Form.Row> : ""
                }
            </Form>
            <Table bordered hover responsive className="tableDem">
                <thead className="thead-dark">
                    <tr>
                        <th>Numero Compte</th>
                        <th>Motif</th>
                        <th>Date Execution</th>
                        <th>Montant cheque</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (filtredData != null) ?
                            filtredData.map((demande, index) => {
                                return <tr key={demande.id}>
                                    <td>{demande.compte.numero_compte}</td>
                                    <td>{demande.motif}</td>
                                    <td>{demande.date_execution}</td>
                                    <td>{demande.montant_chequier}</td>
                                    <td>{demande.statut}</td>
                                    <td>
                                        <Container>
                                            <Row className="justify-content-md-center">
                                                <Button variant="outline-primary">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="outline-success"
                                                    onClick={() => {
                                                        dispatch(getDemandeUpdate(demande))
                                                        history.push('/updateDemande')
                                                    }
                                                    }>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </Button>
                                                <Button variant="outline-danger"
                                                    onClick={() => {
                                                        axios.delete('http://localhost:8080/demandeChequiers/' + demande.id, {
                                                            headers: {
                                                                authorization: token
                                                            }
                                                        })
                                                            .then(res => {
                                                                demandes.splice(index, 1);
                                                                console.log("Deleted succefully");
                                                            })
                                                            .catch(error =>
                                                                console.log(error.message))
                                                    }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            })
                            : demandes.map((demande, index) => {
                                return <tr key={demande.id}>
                                    <td>{demande.compte.numero_compte}</td>
                                    <td>{demande.motif}</td>
                                    <td>{demande.date_execution}</td>
                                    <td>{demande.montant_chequier}</td>
                                    <td>{demande.statut}</td>
                                    <td>
                                        <Container>
                                            <Row className="justify-content-md-center">
                                                <Button variant="outline-primary">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="outline-success"
                                                    onClick={() => {
                                                        dispatch(getDemandeUpdate(demande))
                                                        history.push('/updateDemande')
                                                    }
                                                    }>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </Button>
                                                <Button variant="outline-danger"
                                                    onClick={() => {
                                                        axios.delete('http://localhost:8080/demandeChequiers/' + demande.id, {
                                                            headers: {
                                                                authorization: token

                                                            }
                                                        })
                                                            .then(res => {
                                                                return axios.get('http://localhost:8080/abonnes/' + idUser + '/demandes/?projection=p1', {
                                                                    headers: {
                                                                        authorization: token
                                                                    }
                                                                })
                                                                    .then(response => {
                                                                        const result = response.data;
                                                                        const listDemandes = result._embedded.demandeChequiers;
                                                                        dispatch(getDemandesSuccess(listDemandes))
                                                                        console.log("Deleted succefully");
                                                                    })
                                                                    .catch(error => {
                                                                        dispatch(getDemandesFailure(error.message))
                                                                    })


                                                            })
                                                            .catch(error =>
                                                                console.log(error.message))

                                                    }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            })
                    }
                </tbody>
            </Table>
            
        </Container >
        <Footer />
        </div>
    );}
}


export default ListDemandes