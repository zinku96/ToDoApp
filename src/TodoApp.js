import React from 'react';
import './TodoApp.css';

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      listCount: 0,
      list: [{
        row: "",
        value: "",
        editValue: "",
        isEditing: false,
        isDone: false
      }]
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
  }
  
  handleEditButton(event,row,action) {
    const list = this.state.list;
    for(let i=0; i < list.length; i++){
      if(list[i].row === row){
        if(action === "edit"){
          list[i].isEditing = true;break;
        }
        if(action === "cancel"){
          list[i].editValue = list[i].value;
          list[i].isEditing = false;break;
        }
        if(action === "save"){
          list[i].value = list[i].editValue;
          list[i].isEditing = false;break;
        }
      }
    }
    this.setState({list: list});
  }

  handleEditInput(event,row){
    const list = this.state.list;
    let editValue = event.target.value;
    for(let i=0; i < list.length; i++){
      if(list[i].row === row){
        list[i].editValue = editValue;
      }
    }
    this.setState({list: list});
  }
  handleChangeInput(event) {
    const value =  event.target.value;
    this.setState({value: value});
  }
  handleCheckbox(event,row){
    const list = this.state.list;
    const value = event.target.checked;
    for(let i=0; i < list.length; i++){
      if(list[i].row === row){
        list[i].isDone = value;
      }
    }
    this.setState({list: list});
  }
  handleClickButton(event){
    event.preventDefault();
    const list = this.state.list;
    const value = this.state.value;
    const currentRow = this.state.listCount;
    if(value !== "" && value !== null){
      let addToList = {
        row: currentRow,
        value: value,
        editValue: value,
        isEditing: false
      }
      list.push(addToList);
      this.setState({list: list,value:'',listCount: currentRow+1});
    }else{
      alert('Please type something');
    }
  }
  handleRemoveButton(event,row){
    event.preventDefault();
    const list = this.state.list;
    let filters = list.filter(filter => filter.row !== row);
    this.setState({list: filters});
  }
  
  renderRow(){
    const listCount = this.state.listCount;
    if(listCount > 0){ 
      const list = this.state.list;
      let returnArray = [];
      for(let i=0; i < list.length; i++){
        if(list[i].row !== "" && list[i].value !== ""){
          if (list[i].isEditing === false){
            returnArray.push(
              <tr key={list[i].row}>
                <td><input type="checkbox" id={list[i].row} onChange={(event) => this.handleCheckbox(event,list[i].row)}></input></td>
                <td><label for={list[i].row}>{list[i].value}</label></td>
                <td>
                  <button onClick={(event) => this.handleEditButton(event,list[i].row,"edit")}>Edit</button>
                  <button onClick={(event) => this.handleRemoveButton(event,list[i].row)}>Del</button>
                </td>
              </tr>
            );
          }else{
            returnArray.push(
              <tr key={list[i].row}>
                <td>{list[i].isDone ? "Done" : "Not Done"} </td>
                <td><input value={list[i].editValue} onChange={() => this.handleEditInput(list[i].row)}></input></td>
                <td>
                <button onClick={(event) => this.handleEditButton(event,list[i].row,"save")}>Save</button>
                <button onClick={(event) => this.handleEditButton(event,list[i].row,"cancel")}>Cancel</button>
                </td>
              </tr>
            );
          }
          
        }
      }
      return returnArray;
    }
  }
  render(){
    return (
      <div className="todo-app">
        <form className="todo-input">
          <input type="text" placeholder="Do something?" value={this.state.value} onChange={(event) => this.handleChangeInput(event)}></input>
          <button onClick={(event) => this.handleClickButton(event)}>Add</button>
        </form>
        <table className="todo-list">
          <tr>
            <th>Done ?</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
          {this.renderRow()}
        </table>
      </div>
    )
  }
}

export default TodoApp;
