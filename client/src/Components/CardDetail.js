import React, { Component } from 'react';
//import moment from 'moment';
import {Button,Form,FormGroup,Label,Input,Col,Card,CardImg,CardTitle,CardBody,CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';

import Web3 from 'web3';


let allcoll = [];
let alldocs = [];
const ETHER = 1000000000000000000;

class Allpatrender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            isModalOpen: false,
            sellPrice: 0
        };

    }

    

    render() {
        
        return (
            <Card >
            <i className="fa fa-certificate fa-4x"></i>
            <CardBody>
            <CardTitle><small>Student ID : {this.props.art.stu_id}</small></CardTitle>
        <CardText><small>College Id : {this.props.art.college_id}</small></CardText>
        <CardText><small>Student Adhar no : {this.props.art.student_aadhar}</small></CardText>
        <CardText><small>Certificate Id : {this.props.art.cert_id}</small></CardText>
        <CardText><small>Certificate Name : {this.props.art.cert_name}</small></CardText>
        <CardText><small>IPFS Hash : {this.props.art.ipfs_hash}</small></CardText>
    
            </CardBody>
        </Card>
        );
    }
}

class  AllCertComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            cust: [],
            manuf: [],
            clgname: '',
            isModalOpen1: false,
            title: '',
            artUrl: '',
            price: '',
            artHash: '',
            perCut: 0
        };



    }

    



    render() {
        console.log(this.props.art);
        for(let i = 0;i<this.props.art?.length;i++){
            console.log(this.props.art[i]);
        }
        const Menu = this.props.art.map((x) => {
            if(x.stu_id == this.props.matchId){
            return (
                <div key={x.cert_id} className='col-4 col-md-3'>
                    <Allpatrender
                        art={x}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                    />
                    <br />
                    <br />
                </div>
            );
            }
            else{
                return(<></>);
            }
        });

        return (
            <div className='container'>
                <h2>All College</h2>
                
               
                <br />
                <br />
                <div className='row'>{Menu}</div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default AllCertComp;
