import React from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import AuthenticationService from '../services/AuthenticationService';
import { Container} from 'react-bootstrap';

export default function home() {
    const idUser= localStorage.getItem('id')
    const token = localStorage.getItem("token");
    const authService = new AuthenticationService()
    authService.getDemandes(token,1);
    authService.getCompte2(token,1);
    if(localStorage.getItem('id')!==null) console.log(localStorage.getItem('id'))

    return (
        <div>
            <NavBar />
            <Container className="homePage">

                <h1 className='homeTitle'>Home Page</h1>

            </Container>
            <Footer />
        </div>
    )

}
