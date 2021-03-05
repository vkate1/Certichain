
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Card,CardBody,CardSubtitle,CardText,CardTitle,CardImg,CardHeader,Table,Input,Modal,ModalHeader,ModalBody,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';




const CardDetail = ({ art, accounts, contract, cre, matchId }) => {
    let allcerty = [];
    console.log(art);
    let xyz = async() => {
        let aadharstu = art?.stu_aadhar_no;
        var certids = await contract?.methods.getStuCert(aadharstu).call();
        console.log(certids);
           let eachcert = async(ele) => {    
         var rex4 = await contract?.methods.certy(ele).call();
          allcerty.push(rex4);
      }
        certids.forEach(ele => {eachcert(ele);});
       
     console.log(allcerty);
    }
    useEffect(() => {
          xyz();
    })
    
    // const Certificate = ({cert}) => {
    //     console.log(cert);
    //     return(
    //         <div>
    //         <CardTitle><small>Student ID : {cert.stu_id}</small></CardTitle>
    //             <CardText><small>Student Adhar no : {cert.stu_aadhar_no}</small></CardText>
    //             <CardText><small>College Id : {cert.college_id}</small></CardText>
    //             <CardText><small>Certificate Id : {cert.cert_id}</small></CardText>
    //             <CardText><small>Certificate Name : {cert.cert_name}</small></CardText>
    //             <CardText><small>IPFS Hash : {cert.ipfs_hash}</small></CardText>
    //         </div>
    //     );
    // }
    

    // const Menu = art.map((cert) => {
    //     return (
    //         <div key={cert.cert_id} className='col-4 col-md-3'>
    //             <CardTitle><small>Student ID : {cert.stu_id}</small></CardTitle>
    //             <CardText><small>Student Adhar no : {cert.stu_aadhar_no}</small></CardText>
    //             <CardText><small>College Id : {cert.college_id}</small></CardText>
    //             <CardText><small>Certificate Id : {cert.cert_id}</small></CardText>
    //             <CardText><small>Certificate Name : {cert.cert_name}</small></CardText>
    //             <CardText><small>IPFS Hash : {cert.ipfs_hash}</small></CardText>
    //             <br />
    //             <br />
    //         </div>
    //     );
    // });

    return (
        <>
            <div>
                
                    <h2>Welcome to Certichain</h2>
                  
            </div>
        </>
    );

};

export default CardDetail;