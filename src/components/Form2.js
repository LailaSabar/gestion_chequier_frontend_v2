import React from "react";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { submitDemand } from '../actions/index';
import NavBar from './NavBar';
import Footer from './Footer';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { formValueSelector } from "redux-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCreditCard, faCalendarAlt, faAlignJustify, faDollarSign } from '@fortawesome/free-solid-svg-icons';



export default function Form2() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  let history = useHistory();
  let loggedIn = true;


  if (token == null) {
    loggedIn = false
  }
  const { register, handleSubmit, errors } = useForm()
  if (loggedIn === false) {

    return (<Redirect to="/" />)
  }
  else {
    const comptes = localStorage.getItem('compteUser')
    const comptes2 = comptes.split(',')
    const MakeItem = function (X) {
      return <option key={X}>{X}</option>;
    };


    const onSubmit = (data) => {
      dispatch(submitDemand(data))
      history.push('/demandForm/signDemand')
  
    }

    const validateDate = value => new Date(value) > new Date();



    return (

      <div className="formPage">
        <NavBar />

        <Form className="FormDemand" onSubmit={handleSubmit(onSubmit)}>
          <h5 className="title"> <FontAwesomeIcon icon={faEdit}/> &nbsp;Création Du Demande Chequier</h5> 

          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label >Numéro Compte</Form.Label>

            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text><FontAwesomeIcon icon={faCreditCard}/> </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" name="numero_compte" custom required ref={register} className="form-control fontAwesome">
                {comptes2.map(MakeItem)}


              </Form.Control>

            </InputGroup>

          </Form.Group>


          <Form.Group controlId="formGroupDate">
            <Form.Label >Date Exécution</Form.Label>

            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt}/> </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="date_execution"
                type="date"
                className="form-control"
                required
                ref={register({ validate: validateDate })}


              />
            </InputGroup>
            <div style={{ fontSize: 16, color: "red" }}>{errors.date_execution && <p>La date choisie est invalide</p>}</div>



          </Form.Group>

          <Form.Group controlId="formGroupDate">
            <Form.Label >Motif</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text><FontAwesomeIcon icon={faAlignJustify}/> </InputGroup.Text> 
              </InputGroup.Prepend>
              <textarea maxLength='250'
                name="motif"
                className="form-control"
                placeholder="Pourquoi vous avez besoin de ce chéquier ?"
                required
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
                <InputGroup.Text><FontAwesomeIcon icon={faDollarSign}/> </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="number"
                name="montant_chequier"
                className="form-control"
                placeholder="Montant en DH"
                required
                ref={register}

              />
            </InputGroup>



          </Form.Group>

          <div className="submit">
            <Button className="btn-block" variant="warning" type="submit" align="right">
              Enregistrer
          </Button></div>
        </Form>

        <Footer />
      </div>
    )
  }
}
