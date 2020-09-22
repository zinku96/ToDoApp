import React from 'react';
import './TodoApp.css';
import TodoRows from './TodoRows';


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
  
  render(){
    return (
      <div className="todo-app">
        <table className="todo-list">
          <tbody>
            <tr>
              <th colSpan="3">
                <input type="text" value={this.state.inputAdd} placeholder="Do something?" onChange={(event) => this.handleInput(event,"")}></input>
                <button onClick={(event) => this.handleAddButton(event)}>Add</button>
              </th>
            </tr>
            <tr>
              <th>Done?</th>
              <th>Task</th>
              <th>Action</th>
            </tr>
            {/* {this.renderRow()} */}
            <TodoRows list={this.state.list} handleInput={this.handleInput} handleEditButton={this.handleEditButton} handleRemoveButton={this.handleRemoveButton}/>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TodoApp;

