import React, { Component } from 'react';
//import moment from 'moment';
import {Button,Form,FormGroup,Label,Input,Col,Card,CardImg,CardTitle,CardBody,CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';

import Web3 from 'web3';


let allcoll = [];
let alldocs = [];
const ETHER = 1000000000000000000;

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
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.togglereg = this.togglereg.bind(this);
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
                this.state.clgid,
                this.state.stuid,
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


    render() {
                let but = 'visible';
                let butname = 'Add Certficate';
        return (
                <Card >
                <i className="fa fa-user-circle-o fa-4x"></i>
                <CardBody>
                <CardTitle><small>Student ID : {this.props.art.stu_id}</small></CardTitle>
                <CardText><small>Student Adhar no : {this.props.art.stu_aadhar_no}</small></CardText>
                <CardText><small>Student Name : {this.props.art.stu_name}</small></CardText>
                <CardText><small>College Id : {this.props.art.cllg_id}</small></CardText>
                <CardText><small>Certificate Count : {this.props.art.certcount}</small></CardText>
                <Button className={but} type="submit" color="primary" onClick={this.toggleModal}>
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
                                <div className='col-3'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             College ID
                                        </Label>
                                        <Input
                                            type='number'
                                            id='clgid'
                                            name='clgid'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-3'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             Student ID
                                        </Label>
                                        <Input
                                            type='number'
                                            id='stuid'
                                            name='stuid'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
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
                            </div>
                           
                            <br />
                            <div className='row pl-5 pr-5'>
                               
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                            Hash
                                        </Label>
                                        <Input
                                            type='text'
                                            id='certhash'
                                            name='certhash'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <br/>
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        onClick={this.creatingcert}
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
            perCut: 0
        };
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
                this.state.clgid,
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
        
    }

    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            selectedFile: event.target.files[0]
        });
    };





    render() {
        const Menu = this.props.art?.map((x) => {
            return (
                <div key={x} className='col-4 col-md-3'>
                    <Allpatrender
                        art={x}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                    />
                    <br />
                    <br />
                </div>
            );
        });

        let ch = 'visible';
        return (
            <div className='container'>
                <h2>My Students</h2>
                <Button
                    color='success'
                    className={ch}
                    onClick={this.toggleModal1}>
                    Add Student
                </Button>

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
                                             College ID
                                        </Label>
                                        <Input
                                            type='number'
                                            id='clgid'
                                            name='clgid'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
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
