
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Card,CardBody,CardSubtitle,CardText,CardTitle,CardImg,CardHeader,Table,Input,Modal,ModalHeader,ModalBody,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';


    
class Certificate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    
  
    render(){
        console.log(this.props.art);
        let cert = this.props.art;
    return(
        <div>
            <Card >
                <i className="fa fa-institution fa-4x"></i>
                <CardBody>
                <CardTitle><small>Student ID : {cert.stu_id}</small></CardTitle>
            <CardText><small>Student Adhar no : {cert.stu_aadhar_no}</small></CardText>
            <CardText><small>College Id : {cert.college_id}</small></CardText>
            <CardText><small>Certificate Id : {cert.cert_id}</small></CardText>
            <CardText><small>Certificate Name : {cert.cert_name}</small></CardText>
            <CardText><small>IPFS Hash : {cert.ipfs_hash}</small></CardText>
        
                </CardBody>
            </Card>
        </div>
    );
    }
};

class CardDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,ac : []
        };
    }
    
    
    async componentDidMount() {
      
    this.render();
    }
          

    
    


  
    render(){
        console.log(this.props.allce);
        const Menu = this.props.allce?.map((x) => {
            console.log(x);
            return (
                <div key={x} className='col-4 col-md-3'>
                    <Certificate
                        art={x}

                    />
                    <br />
                    <br />
                </div>
            );
        });
    return (
            <>
            <div>
                
                    <h2>Welcome to Certichain</h2>
                    <div className='row'>{Menu}</div>
            </div>
        </>
        
    )
    }
}
export default CardDetail;