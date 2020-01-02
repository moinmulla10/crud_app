import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const selected = [];

class App extends Component {
  state = {
    name: '',
    email: '',
    persons: [],
  };

  flag = false;

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  insertHandler = () => {
    console.log(`Name:` + this.state.name);
    console.log(`Email:` + this.state.email);
    const post = {
      name: this.state.name,
      email: this.state.email
    }
    axios.post('http://localhost:3000/insert', post)
      .then(response => {
        console.log(response);
      })
      .then(window.location.reload());
  }

  deleteHandler = () => {
    axios.get('http://localhost:3000/delete')
      .then(response => console.log('Delete successful'))
      .then(window.location.reload());
  }

  handleChange(e) {
   let isChecked = e.target.checked;

   if(isChecked){
    selected.push(e.target.value);
   }else if(selected.includes(e.target.value)){
     selected.splice(selected.indexOf(e.target.value),1);
   }

   console.log(selected);

  }

  deleteSelected = () => {
    axios.post('http://localhost:3000/deleteSelected',selected)
      .then(response => console.log('Delete successful'))
      .then(window.location.reload());
  }

  render() {
    if (!this.flag) {
      this.flag = true;
      axios.get('http://localhost:3000/users').then(response => {
        console.log(response.data.rows);
        this.setState({ persons: response.data.rows });
      });

    }


    const tableHeader = (<tr><th>Id</th><th>Name</th><th>Email</th><th></th></tr>);
    const people = this.state.persons.map((p, index) => <tr key={index}><td>{p.id}</td><td>{p.name}</td><td>{p.email}</td><td><input type='checkbox' value={p.id} onChange={this.handleChange}></input></td></tr>);
    return (
      <div className="App">
        <p>Name:<input type='text' name='name' value={this.state.name} onChange={this.onChangeName}></input></p>
        <p>Email:<input type='text' name='email' value={this.state.email} onChange={this.onChangeEmail}></input></p>
        <button type='button' onClick={this.insertHandler}>Insert</button>
        <button type='button' onClick={this.deleteHandler}>Delete All</button>
        <button type='button' onClick={this.deleteSelected}>Delete Selected</button>
        <table>
          <tbody>
            {tableHeader}
            {people}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
