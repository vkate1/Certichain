import React, { Component } from 'react';
//import moment from 'moment';
import { Link } from 'react-router-dom';
import {Button,Form,FormGroup,Label,Input,Col,Card,CardImg,CardTitle,CardBody,CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';

import Web3 from 'web3';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

let allcoll = [];
let alldocs = [];
const ETHER = 1000000000000000000;
let show = 0;
let x;
class Allpatrender extends Component {
    // let day = moment.unix(art.dateofComp);
    // let xy = art.dateofComp;
    // let date = new Date(xy*1000);
    // let time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    // let yz = xy != 0?"bg-success text-white":"";
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            isModalOpen: false,
            sellPrice: 0,
            clgid:0,
            stuid : 0,
            certname : '',
            stuadd : 0,
            certhash : '',
            loading : '',
            buffer : null,
            singlecol:0,
            clid : 0

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.togglereg = this.togglereg.bind(this);
        this.uploadImage = this.uploadImage.bind(this)
        this.captureFile = this.captureFile.bind(this)
    }

    async componentDidMount() {
        let sincol = await this.props.singlecolId;
        let clID = await this.props.art.cllg_id ;
        this.setState({singlecol : sincol,clid : clID});
        
       }

    togglereg = async () => {
        if(this.props.art.isregistered){
            const res = await this.props.contract.methods
            .registerCollege(
                this.props.art.clg_id,
                false
            )
            .send({ from: this.props.accounts, gas: 1000000 });
        }
        else{
            const res = await this.props.contract.methods
            .registerCollege(
                this.props.art.clg_id,
                true
            )
            .send({ from: this.props.accounts, gas: 1000000 });
     
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    creatingcert = async () => {

        const res = await this.props.contract.methods
            .addCertificate(
                this.props.current,
                this.props.art.stu_id,
                this.props.art.stu_aadhar_no,
                this.state.certhash,
                this.state.certname
            )
            .send({ from: this.props.accounts, gas: 1000000 });

        this.toggleModal();
    };
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    captureFile = event => {

        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
      }
    
      uploadImage = () => {
        console.log("Submitting file to ipfs...")
    
        //adding file to the IPFS
        //console.log(this.state.buffer);
        ipfs.add(this.state.buffer, (error, result) => {
          console.log('Ipfs result', result)
          if(error) {
            console.error(error)
            return
          }
    
          this.setState({ loading: true });


          //this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
            //this.setState({ loading: false })
         // })
         const res = this.props.contract.methods
            .addCertificate(
                this.props.current,
                this.props.art.stu_id,
                this.props.art.stu_aadhar_no,
                result[0].hash,
                this.state.certname
            )
            .send({ from: this.props.accounts, gas: 1000000 }).on('transactionHash', (hash) => {
                this.setState({ loading: false })
                this.toggleModal();
            })
            
        
        })
      }
    
      
    render() {
                let but = (this.props.show == this.props.art.stu_aadhar_no ? 'visible':'invisible')
                let bux;
                let xyz = ((this.props.show == this.props.art.stu_aadhar_no) && (this.props.singlecolID != this.state.clid) ? 'invisible':'visible');
                // if(this.props.clgaddr){
                //     console.log("if")
                //  bux = 'visible';
                // }
                // else
                {
                    console.log("single col",this.props.singlecolID);
                    console.log("clg id",this.state.clid);
                bux = this.props.show != 0? (this.props.show == this.props.art.stu_aadhar_no ? 'visible':'invisible') : 'visible';
                x = this.props.show != 0? (this.props.show == this.props.art.stu_aadhar_no ? '':'none') : '';
                 //xyz = (this.props?.singlecolId == this.props.art.cllg_id ? 'visible':'invisible');
                }
                let butname = 'Add Certficate';
        return (
                <Card className={bux} style={{display : `${x}`}}>
                 <Link to={`/card/${this.props.art.stu_id}`}>
                                  <i className="fa fa-user-circle-o fa-4x"></i>
                                </Link>
                <CardBody>
                <CardTitle><small>Student ID : {this.props.art.stu_id}</small></CardTitle>
                <CardText><small>Student Adhar no : {this.props.art.stu_aadhar_no}</small></CardText>
                <CardText><small>Student Name : {this.props.art.stu_name}</small></CardText>
                <CardText><small>College Id : {this.props.art.cllg_id}</small></CardText>
                <CardText><small>Certificate Count : {this.props.art.certcount}</small></CardText>
                <Button className={xyz} type="submit" color="primary" onClick={this.toggleModal}>
                    {butname}
                </Button>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal}>
                        <h3>Add Certificate</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             Certificate Name
                                        </Label>
                                        <Input
                                            type='text'
                                            id='certname'
                                            name='certname'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                    <Label htmlFor='fileupload' className='ml-3'>
                                             Certificate Upload
                                        </Label>
                                    <Input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" name = "fileupload" onChange={this.captureFile} />
                                    </FormGroup>
                                </div>
                            </div>
                           
                            <br />
                           
                            <br/>
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        onClick={this.uploadImage}
                                        >
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <br />
                        </Form>
                    </ModalBody>
                </Modal>
                </CardBody>
            </Card>
        );
    }
}

class  AllStuComponent extends Component {
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
            clgid : 0,
            stuname : '',
            stuadd : '',
            artUrl: '',
            price: '',
            artHash: '',
            perCut: 0,
            current: 0 ,
            reg: null,
            show:0,
            clgaddr : null,
            bul : 0  ,
            singlecol:0,
            clid : 0      };
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.creatingItems = this.creatingItems.bind(this);


    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    creatingItems = async () => {
       
        
        const res = await this.props.contract.methods
            .addStudent(
                this.state.current,
                this.state.stuadd,
                this.state.stuname
            )
            .send({ from: this.props.accounts, gas: 10000000 });

        this.toggleModal1();
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
     let x = this.props.singlecoll;
     console.log(x);
     this.setState({current : this.props.current, art : this.props.art, reg : x});
     var c = this.props.current == null ? 0:this.props.current;
     var rex = await this.props.contract?.methods.colId(c).call();
     console.log(rex);
     if(rex == this.props.accounts){ 
     this.setState({clgaddr : true})
     let sincol = await this.props?.singlecolId;
        //let clID = await this.props?.art.cllg_id 
        this.setState({singlecol : sincol});

     }
     console.log(this.state.singlecol)
    }

    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            selectedFile: event.target.files[0]
        });
    };





    render() {
        
       
        const Menu = this.state.art?.map((x) => {
            console.log(x);
          
            if(x.cllg_id == this.state.current){
            return (
                <div key={x} className='col-4 col-md-3'>
                    <Allpatrender
                        art={x}
                        current={this.state.current}
                        ipfs = {this.props.ipfs}
                        show = {this.state.show}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                        clgaddr = {this.state.clgaddr}
                        singlecolID = {this.state.singlecol}
                    />
                    <br />
                    <br />
                </div>
            );
            }
            else if(this.state.bul == 1){
                return (
                    <div key={x} className='col-4 col-md-3'>
                        <Allpatrender
                            art={x}
                            current={this.state.current}
                            dish={this.props.dish}
                            ipfs = {this.props.ipfs}
                            show = {this.state.show}
                            contract={this.props.contract}
                            accounts={this.props.accounts}
                            clgaddr = {this.state.clgaddr}
                            singlecolID = {this.state.singlecol}
                        />
                        <br />
                        <br />
                    </div>
                );
            }
        });
        //let ch = 'visible';
        console.log(this.state.reg);
        let ch = this.state.reg? 'visible':'invisible';
        return (
            <div className='container'>
                <h2>My Students</h2>
                <Button
                    color='success'
                    className={ch}
                    onClick={this.toggleModal1}>
                    Add Student
                </Button>
                <Form onSubmit={(event) => {
                event.preventDefault()
                const aadharno = this.imageDescription.value
                console.log(aadharno);
                this.setState({show : aadharno,bul : 1});
                //this.props.uploadImage(description)
              }} >
                  <div className="form-group mr-sm-2">
                    <br></br>
                    <h4>Search By Aadhar</h4>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Aadhar No."
                        required />
                  </div>
                <Button type="submit" className="btn btn-primary btn-block btn-lg">Search</Button>
              </Form>
                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                        <h3>Add Student</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-3'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             Student Aadhar
                                        </Label>
                                        <Input
                                            type='number'
                                            id='stuadd'
                                            name='stuadd'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             Student Name
                                        </Label>
                                        <Input
                                            type='text'
                                            id='stuname'
                                            name='stuname'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                           
                            <br />
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        onClick={this.creatingItems}
                                        >
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <br />
                        </Form>
                    </ModalBody>
                </Modal>
                <br />
                <br />
                <div className='row'>{Menu}</div>
                <br />
                <br />
                <br />

            </div>
        );
    }
}

export default AllStuComponent;
