import React, { Component } from 'react';
import '../App.css';
import { Container} from 'reactstrap';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    
    render() {
        return (
            <>
                <div>
                    <Container>
                        <h1>Welcome to Certichain</h1>
                    </Container>
                </div>
            </>
        );
    }
}

export default Home;
