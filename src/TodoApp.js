import React from 'react';
import './TodoApp.css';

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputAdd: "",
      list: [{
        row: "",
        inputEdit: "",
        value: "",
        isEditing: false,
        isDone: false
      }]
    };
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleAddButton(event){
    event.preventDefault();
    let list = this.state.list;
    const inputAdd = this.state.inputAdd;
    const currentRow = list.length;
    if(inputAdd !== "" && inputAdd !== null){
      let data = {
        row: currentRow,
        inputEdit: inputAdd,
        value: inputAdd,
        isEditing: false,
        isDone: false
      }
      list.push(data);
      this.setState({list: list,inputAdd:''});
    }else{
      alert('Please type something');
    }
  }
  handleEditButton(event,row,action) {
    event.preventDefault();
    let list = this.state.list;
    if(action === "edit"){
      list[row].isEditing = true;
      this.setState({list: list});
      return;
    }
    if(action === "cancel"){
      list[row].inputEdit = list[row].value;
      list[row].isEditing = false;
      this.setState({list: list});
      return;
    }
    if(action === "save"){
      if(list[row].inputEdit === ""){
        alert("Fill input!!!");
      }else{
        list[row].value = list[row].inputEdit;
        list[row].isEditing = false;
        this.setState({list: list});
        return;
      }
    }
  }
  handleRemoveButton(event,row){
    event.preventDefault();
    let list = this.state.list;
    let listCount = 0;
    let filters = list.filter(filter => filter.row !== row);
    filters.forEach(function re_index(filter){
      filter.row = listCount;
      listCount++;
    });
    this.setState({list: filters,listCount: listCount});
  }
  handleInput(event,row){
    if(event.target.type === "text") {
      if(row === ""){
        const inputAdd =  event.target.value;
        this.setState({inputAdd: inputAdd});
        return;
      }else{
        const list = this.state.list;
        const inputEdit = event.target.value;
        list[row].inputEdit = inputEdit;
        this.setState({list: list});
        return;
      }
    }
    if(event.target.type === "checkbox"){
      let list = this.state.list;
      const value = event.target.checked;
      list[row].isDone = value;
      this.setState({list: list});
      return;
    }
  }
  
  renderRow(){
    const listCount = this.state.list.length;
    if(listCount > 0){ 
      const list = this.state.list;
      let returnArray = [];
      for(let i=0; i < list.length; i++){
        if(list[i].row !== "" && list[i].value !== ""){
          if (list[i].isEditing === false){
            returnArray.push(
              <tr key={list[i].row}>
                <td><input checked={list[i].isDone ? true : false} type="checkbox" id={list[i].row} onChange={(event) => this.handleInput(event,list[i].row)}></input></td>
                <td><label htmlFor={list[i].row}>{list[i].value}</label></td>
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
                <td><input type="text" value={this.state.list[i].inputEdit} onChange={(event) => this.handleInput(event,list[i].row)}></input></td>
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
          <input type="text" value={this.state.inputAdd} placeholder="Do something?" onChange={(event) => this.handleInput(event,"")}></input>
          <button onClick={(event) => this.handleAddButton(event)}>Add</button>
        </form>
        <table className="todo-list">
          <tbody>
            <tr>
              <th>Done ?</th>
              <th>Task</th>
              <th>Action</th>
            </tr>
            {this.renderRow()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TodoApp;

