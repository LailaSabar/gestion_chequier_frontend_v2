import React, { Component } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getComptesSuccess, getDemandesSuccess, getComptesFailure, getDemandesFailure } from '../actions';


export default class AuthenticationService extends Component {
    host = "http://localhost:8080";
    jwtToken = null;
    history = useHistory();


    login(user) {
        return axios.post(this.host + "/login", user, { observe: 'response' })
    }
    saveToken(jwt) {
        localStorage.setItem('token', jwt);
    }

    loadToken() {
        this.jwtToken = localStorage.getItem('token')
    }

    getUser(token, username) {
        if (token == null) this.loadToken();
        return axios.get(`http://localhost:8080/getId/${username}`, {
            headers: {
                authorization: token
            }
        })
            .then(res => {
                localStorage.setItem('id', res.data[0].id)

                return axios.get('http://localhost:8080/abonnes/' + res.data[0].id + '/comptes', {
                    headers: {
                        authorization: token
                    }
                })
                    .then(res => {
                        const result = res.data;
                        const listComptes = result._embedded.comptes;
                        const numeroCompte = listComptes.map((ligne => ligne.numero_compte));
                        localStorage.setItem('compteUser', numeroCompte)

                    })
            }).catch((error) => {

            })

    }


    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    insertDemand(token, numCompte, data, id) {
        if (token == null) this.loadToken();
        return axios.post(`http://localhost:8080/insertDemand/${numCompte}/${id}`, { ...data, date_creation: this.formatDate(new Date()), statut: "Enregitré" }, { observe: 'response' }, {
            headers: {
                authorization: token
            }
        })
            .then(res => {
                console.log(res)
            }).catch((error) => {

            })
    }

    getDemandes = (token, id) => {

        const dispatch = useDispatch();
        return axios.get('http://localhost:8080/abonnes/' + id + '/demandes/?projection=p1', {
            headers: {
                authorization: token
            }
        })
            .then(response => {
                const result = response.data;
                const listDemandes = result._embedded.demandeChequiers;
                dispatch(getDemandesSuccess(listDemandes))
            })
            .catch(error => {
                dispatch(getDemandesFailure(error.message))
            })
    }


    getCompte2 = (token, id) => {
        const dispatch = useDispatch();
        return axios.get('http://localhost:8080/abonnes/' + id + '/comptes', {
            headers: {
                authorization: token
            }
        })
            .then(response => {
                const result = response.data;
                const listComptes = result._embedded.comptes;
                dispatch(getComptesSuccess(listComptes))


            })
            .catch(error => {
                dispatch(getComptesFailure(error.message))
            })
    }




    render() {
        return (
            <div>

            </div>
        )
    }
}
