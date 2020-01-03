import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import UpdateComponent from './containers/Update';

const selected = [];

class App extends Component {
  state = {
    name: '',
    email: '',
    persons: [],
    id: ''
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

  onChangeId = (e) => {
    this.setState({
      id: e.target.value
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

  updateHandler = () => {
    const post = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    }
    axios.post('http://localhost:3000/update', post)
      .then(response => console.log('Update successful'))
      .then(window.location.reload());
  }

  deleteHandler = () => {
    axios.get('http://localhost:3000/delete')
      .then(response => console.log('Delete successful'))
      .then(window.location.reload());
  }

  handleChange(e) {
    let isChecked = e.target.checked;

    if (isChecked) {
      selected.push(e.target.value);
    } else if (selected.includes(e.target.value)) {
      selected.splice(selected.indexOf(e.target.value), 1);
    }

    console.log(selected);

  }

  deleteSelected = () => {
    axios.post('http://localhost:3000/deleteSelected', selected)
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
      <BrowserRouter>
        <div className="App">
          <nav>
            <ul>
              <li><Link to='/update'>Update Data</Link></li>
              <li><Link to='/'>Home</Link></li>
            </ul>
          </nav>
          <Route path='/' exact render={() => <Home nameValue={this.state.name} emailValue={this.state.email} onChangeName={this.onChangeName} onChangeEmail={this.onChangeEmail}
            insertHandler={this.insertHandler} deleteHandler={this.deleteHandler} deleteSelected={this.deleteSelected}></Home>}>
          </Route>
          <Route path='/update' exact render={() => <UpdateComponent idValue={this.state.id} nameValue={this.state.name} emailValue={this.state.email} onChangeId={this.onChangeId} onChangeName={this.onChangeName} onChangeEmail={this.onChangeEmail}
            updateHandler={this.updateHandler}></UpdateComponent>}>
          </Route>
          <table>
            <tbody>
              {tableHeader}
              {people}
            </tbody>
          </table>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
