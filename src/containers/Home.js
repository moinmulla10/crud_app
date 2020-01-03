import React, { Component } from 'react';
import '../App.css';


class Home extends Component {
  render() {
    return (
      <div className="App">
        <p>Name:<input type='text' name='name' value={this.props.nameValue} onChange={this.props.onChangeName}></input></p>
        <p>Email:<input type='text' name='email' value={this.props.emailValue} onChange={this.props.onChangeEmail}></input></p>
        <button type='button' onClick={this.props.insertHandler}>Insert</button>
        <button type='button' onClick={this.props.deleteHandler}>Delete All</button>
        <button type='button' onClick={this.props.deleteSelected}>Delete Selected</button>
      </div>
    );
  }
}

export default Home;
