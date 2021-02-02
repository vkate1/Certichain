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
            sellPrice: 0
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {
        return (
                <Card >
                <i></i>
                <CardBody>
                <CardTitle><small>College ID : {this.props.dish.clg_id}</small></CardTitle>
                <CardText><small>College Address : {this.props.dish.clg_address}</small></CardText>
                <CardText><small>College Name : {this.props.dish.clg_name}</small></CardText>
                <CardText><small>GST : {this.props.dish.isregistered}</small></CardText>
                </CardBody>
            </Card>
        );
    }
}

class  AllCllgComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docCount: 0,
            art: [],
            cust: [],
            manuf: [],
            isModalOpen1: false,
            title: '',
            artUrl: '',
            price: '',
            artHash: '',
            perCut: 0
        };
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);


    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    // creatingItems = async (x) => {
    //     let tokenHash = this.state.artHash.toString();
    //     let tokenTitle = this.state.title;
    //     let tokenPrice = (this.state.price * ETHER).toString();
    //     let imgUrl = x;
    //     let perCut = this.state.perCut;
    //     console.log(tokenHash, tokenTitle, tokenPrice, imgUrl, perCut);
    //     const res = await this.props.contract.methods
    //         .create(
    //             tokenHash,
    //             tokenTitle,
    //             (this.state.price * ETHER).toString(),
    //             imgUrl,
    //             perCut
    //         )
    //         .send({ from: this.props.accounts, gas: 1000000 });
    //     console.log(res);

    //     this.toggleModal1();
    // };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
        var res = await this.props.contract?.methods.collegecnt().call();
               
        var response= [];
        for(var i=1;i<=res;i++){
            var rex = await this.props.contract?.methods.colId(i).call();
            response.push(rex);
        }
        
        allcoll = [];
        for(var j=0;j<response.length;j++){
            var xt = await this.props.contract.methods.colleges(response[j]).call();
            alldocs.push(xt);
         
        }
        console.log(allcoll);
        this.setState({ dish : allcoll});
    }

    fileSelectHandler = (event) => {
        console.log(event.target.files);
        this.setState({
            selectedFile: event.target.files[0]
        });
    };





    render() {
        const Menu = this.state.art.map((x) => {
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
                <h2>My Items</h2>
                <Button
                    color='success'
                    className={ch}
                    onClick={this.toggleModal1}>
                    Add Art
                </Button>

                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                        <h3>Add Artwork</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                            Token Title
                                        </Label>
                                        <Input
                                            type='text'
                                            id='title'
                                            name='title'
                                            // onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='price' className='ml-3'>
                                            Item Price
                                        </Label>
                                        <Input
                                            type='text'
                                            id='price'
                                            name='price'
                                            // onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label
                                            htmlFor='perCut'
                                            className='ml-3'>
                                            Royalty Percentage
                                        </Label>
                                        <Input
                                            type='number'
                                            id='perCut'
                                            name='perCut'
                                            // onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label
                                            htmlFor='artHash'
                                            className='ml-3'>
                                            Art
                                        </Label>
                                        <Input
                                            type='file'
                                            // onChange={this.fileSelectHandler}
                                        />
                                        
                                    </FormGroup>
                                </div>
                            </div>
                            <br />
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        // 
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
                <br />
                <br />
            </div>
        );
    }
}

export default AllCllgComponent;
