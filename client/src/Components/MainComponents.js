import React, { Component } from "react";
import BNContract from "../contracts/Certificates.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
// import SignUp from "./SignUpComponent";
 import  AllCllgComponent  from "./AllCollegeComponent";
// import Shipment from "./ShipmentComponent";
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './FooterComponent';
// import RegisterComp from './RegisterComponent';
import CardDetail from './CardDetailComponent';
import AllCertComp from './CardDetail';

import AllStuComponent from './AllStudentComponent';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null,balance:0, contract: null ,res : null,dish : null,stu:null,allce : null,singlecoll:null};
    
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BNContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BNContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(instance)
      this.setState({ web3, accounts : accounts[0] , contract: instance,balance,current : null});
      var res = await this.state.contract?.methods.collegecnt().call();
      console.log(res);
             
      var response= [];
      for(var i=1;i<=res;i++){
          var rex = await this.state.contract?.methods.colId(i).call();
          response.push(rex);
      }
      console.log(response);
      let allcoll = [];
      for(var j=0;j<response.length;j++){
          var xt = await this.state.contract.methods.colleges(response[j]).call();
          allcoll.push(xt);
       
      }

      console.log(allcoll);
      this.setState({ dish : allcoll});
      
    
      allcoll.map((x) => {
        if(x.clg_address == this.state.accounts){
            this.setState({current : x.clg_id});
        } 
    })
    
      var res = await this.state.contract?.methods.studentcnt().call();
      console.log(res);
             
      var response= [];
      for(var i=1;i<=res;i++){
          var rex = await this.state.contract?.methods.stuId(i).call();
          response.push(rex);
      }
      console.log(response);
      allcoll = [];
      for(var j=0;j<response.length;j++){
          var xt = await this.state.contract.methods.students(response[j]).call();
          allcoll.push(xt);
       
      }

      console.log(this.state.current);
      var res = await this.state.contract?.methods.certificatecnt().call();
      console.log(res);
             
      var response= [];
      for(var i=1;i<=res;i++){
          var rex = await this.state.contract?.methods.certy(i).call();
          response.push(rex);
      }
      this.setState({ stu : allcoll,allce : response});
      let singleclg = await this.state.dish.filter(x => x.clg_id == this.state.current);
      
      this.setState({singlecoll : singleclg[0].isregistered})
      console.log(this.state.singlecoll);

      
    } catch (error) {
      // Catch any errors for any of the above operations.
      
      console.error(error);
    }
  };




  render() {
    const CardWithId = ({ match }) => {
      let allcerts = [];
      
    //   let func = async() => {
    //   let all = await this.state.stu?.filter((singleart) => singleart.stu_id === match.params.id)[0];
    //   let aadharstu = all.stu_aadhar_no;
    //    var certids = await this.state.contract?.methods.getStuCert(aadharstu).call();
    //    console.log(certids);
    //       let eachcert = async(ele) => {    
    //     var rex4 = await this.state.contract?.methods.certy(ele).call();
    //      allcerts.push(rex4);
    //  }
    //    certids.forEach(ele => {eachcert(ele);});
      
    // console.log(allcerts);
    //   return (
    //     <AllCertComp
    //       art={allcerts}
          
    //       contract={this.state.contract} accounts={this.state.accounts} matchId={match.params.id}
    //     />
    //   );
    //   }
    //   func();
      return (
        <AllCertComp
          art={this.state.allce}
          allcert = {this.state.allce}
          contract={this.state.contract} accounts={this.state.accounts} matchId={match.params.id}
        />
      );
    };
    return (
      <div className="App">
        <Header contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered} balance={this.state.balance} web3={this.state.web3}/>
        <Switch>
            <Route exact path="/home" component={() => <Home contract={this.state.contract} accounts={this.state.accounts}/>}/>
            <Route exact path='/allclg' component={() => (< AllCllgComponent art = {this.state.dish} contract={this.state.contract} accounts={this.state.accounts}/>)}/>
            <Route exact path='/mystu' component={() => (< AllStuComponent art = {this.state.stu} ipfs = {ipfs} current = {this.state.current} singlecoll={this.state.singlecoll} contract={this.state.contract} accounts={this.state.accounts}/>)}/>
            <Route path='/card/:id' component={CardWithId} />
            <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    )
  }
}
export default Main;