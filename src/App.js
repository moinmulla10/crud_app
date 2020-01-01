import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
   name:'',
   email:'',
  };

  onChangeEmail = (e) =>{
    this.setState({
      email: e.target.value
    });
  }

  onChangeName = (e) =>{
    this.setState({
      name: e.target.value
    });
  }

  insertHandler = () =>{
    console.log(`Name:`+this.state.name);
    console.log(`Email:`+this.state.email);
    const post = {
      name: this.state.name,
      email: this.state.email
    }
    axios.post('http://localhost:3000/insert',post)
    .then(response => {
      console.log(response);
    });
  }

  deleteHandler = () => {
    axios.get('http://localhost:3000/delete')
    .then(response => console.log('Delete successful'));
  }
  render() {
    axios.get('http://localhost:3000/users').then(response => {
      console.log(response.data);
    });
    return (
      <div className="App">
        <p>Name:<input type='text' name='name' value={this.state.name} onChange={this.onChangeName}></input></p>
        <p>Email:<input type='text' name='email' value={this.state.email} onChange={this.onChangeEmail}></input></p>
        <button type='button' onClick={this.insertHandler}>Insert</button>
        <button type='button' onClick>Delete</button>
      </div>
    );
  }
}

export default App;
