import React from "react";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import Footer from './Footer';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { getDemandesSuccess, getDemandesFailure } from '../actions';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCreditCard, faCalendarAlt, faAlignJustify, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function UpdateDemande() {

    const dispatch = useDispatch();
    let history = useHistory();
    const demandeUpdate = useSelector(state => state.demandeUpdate);
    const comptes = useSelector(state => state.comptes);
    const token = localStorage.getItem('token')
    const idUser=localStorage.getItem('id')
    let loggedIn = true
    if (token == null) {
        loggedIn = false
    }


    const { register, handleSubmit, errors, setValue } = useForm()

    const onSubmit = (data) => {
        demandeUpdate.compte = "http://localhost:8080/comptes/" + data.compte;
        demandeUpdate.motif = data.motif
        demandeUpdate.date_execution = data.date_execution
        demandeUpdate.montant_chequier = data.montant_chequier
        console.log(demandeUpdate);
        axios.patch('http://localhost:8080/demandeChequiers/' + demandeUpdate.id, demandeUpdate, {
            headers: {
                authorization: token
            }
        })
            .then(res => {
                console.log(res.data);
                console.log("Updated succefully");
                history.push('/listeDemandes')
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


    }

    function handleChange(evt) {
        setValue(evt.target.name, evt.target.value)
    }


    const validateDate = value => new Date(value) > new Date();

    if (loggedIn === false) {

        return (<Redirect to="/" />)
    }
    else {

    return (

        <div className="formPage">
            <NavBar />

            <Form className="FormDemand" onSubmit={handleSubmit(onSubmit)}>
                <h5 className="title"><FontAwesomeIcon icon={faEdit}/> &nbsp;Modification Du Demande Chequier</h5>

                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label >Numéro Compte</Form.Label>

                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon={faCreditCard}/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" name="compte"
                            custom
                            required
                            ref={register}
                            className="form-control fontAwesome"
                            onChange={handleChange}
                            defaultValue={demandeUpdate.compte.id}>
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


                <Form.Group controlId="formGroupDate">
                    <Form.Label >Date Exécution</Form.Label>

                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt}/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="date_execution"
                            type="date"
                            className="form-control"
                            required
                            defaultValue={demandeUpdate.date_execution}
                            ref={register({ validate: validateDate })}
                            onChange={handleChange}


                        />
                    </InputGroup>
                    <div style={{ fontSize: 16, color: "red" }}>{errors.date_execution && <p>La date choisie est invalide</p>}</div>



                </Form.Group>

                <Form.Group controlId="formGroupDate">
                    <Form.Label >Motif</Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon={faAlignJustify}/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <textarea maxLength='250'
                            name="motif"
                            className="form-control"
                            placeholder="Pourquoi vous avez besoin de ce chéquier ?"
                            required
                            defaultValue={demandeUpdate.motif}
                            onChange={handleChange}
                            ref={register}

                        />
                    </InputGroup>
                    <Form.Text className="text-muted">
                        Ne dépassez pas trois à quatre phrases
            </Form.Text>


                </Form.Group>

                <Form.Group controlId="formGroupDate">
                    <Form.Label >Montant</Form.Label>

                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon={faDollarSign}/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number"
                            name="montant_chequier"
                            className="form-control"
                            placeholder="Montant en DH"
                            required
                            defaultValue={demandeUpdate.montant_chequier}
                            onChange={handleChange}
                            ref={register}

                        />
                    </InputGroup>

                </Form.Group>

                <div className="submit">
                    <Button className="btn-block" variant="warning" type="submit" align="right">
                        Mofidier
          </Button></div>
            </Form>

            <Footer />
        </div>
    )
}
}
