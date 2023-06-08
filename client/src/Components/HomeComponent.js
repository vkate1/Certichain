import React, { Component } from 'react';
import '../App.css';
import { Container} from 'reactstrap';


function Home() {
    return (
        <>
            <div>
                <Container>
                    <h1>Welcome to  Acropolis Certicate Management System</h1>
                    <div>
                        <img src="https://universitykart.b-cdn.net//Content/upload/admin/uulrwtck.a4x.jpg" width={700}/>
                    </div>
                </Container>
            </div>
        </>
    );
}


export default Home;
