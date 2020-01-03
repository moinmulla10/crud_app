import React, { Component } from 'react';
import '../App.css';


class UpdateComponent extends Component {
  render() {
    return (
      <div className="App">
        <p>Id:<input type='text' name='name' value={this.props.idValue} onChange={this.props.onChangeId}></input></p>
        <p>Name:<input type='text' name='name' value={this.props.nameValue} onChange={this.props.onChangeName}></input></p>
        <p>Email:<input type='text' name='email' value={this.props.emailValue} onChange={this.props.onChangeEmail}></input></p>
        <button type='button' onClick={this.props.updateHandler}>Update</button>
      </div>
    );
  }
}

export default UpdateComponent;
