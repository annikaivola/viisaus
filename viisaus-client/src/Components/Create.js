import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {getUsers, addNewUser} from '../ServiceDesk';
import './Create.css';

class Create extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
    }
    
    state = { name: '', password: '', activeUser: null }
    nameChanged = (e) => {

        this.setState({ name: e.target.value });
    }
    passwordChanged = (e) => {
        this.setState({ password: e.target.value })

    }
    checkLength() {
        let pituus = this.state.password.length;
        if (pituus < 6) {
            console.log(this.state.Message);
        }
    }
    getUserAndUpdate=()=>{
        getUsers(function (user){
          this.setState({udata: user});
        }.bind(this));
      } 
       
      addUser= (msg)=>{
        addNewUser(msg, function (){
          this.getUserAndUpdate();
        }.bind(this));
      }
    CreateUser = (e) => {
        e.preventDefault();
        this.checkLength();       
        this.addUser(this.state); 
        this.setState({ name: '', password: '', activeUser: 'loggedIn' });
    }
    render() {
        return (
            <div>
                <h5>
                    Create account:
                </h5>

                <form onSubmit={this.CreateUser}>
                    Nickname: <input value={this.state.name} onChange={this.nameChanged} /> <br />
                    Password: <input value={this.state.password} onChange={this.passwordChanged} />
                    {this.validator.message('password',this.state.password,'required|min:6|max:30', 'text-danger')}

                    <input className="nappi" type="submit" onClick={this.handleClick}/>
                </form>
            </div>

        );
    }

}
export default Create;


