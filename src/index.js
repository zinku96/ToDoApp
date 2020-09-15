import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

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
        isEditing: false
      }]
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
  }
  
  handleEditButton(event,row,ea) {
    const list = this.state.list;
    for(let i=0; i < list.length; i++){
      if(list[i].row === row){
        switch(ea){
          case "edit":
            list[i].isEditing = true;break;
          case "cancel":
            list[i].isEditing = false;break;
          case "save":
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
    let value = event.target.value;
    this.setState({value: value});
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
              <li>
                {list[i].value}
                <button onClick={(event) => this.handleEditButton(event,list[i].row,"edit")}>Edit</button>
                <button onClick={(event) => this.handleRemoveButton(event,list[i].row)}>Del</button>
              </li>
            );
          }else{
            returnArray.push(
              <li>
                <input value={list[i].editValue} onChange={(event) => this.handleEditInput(event,list[i].row)}></input>
                <button onClick={(event) => this.handleEditButton(event,list[i].row,"save")}>Save</button>
                <button onClick={(event) => this.handleEditButton(event,list[i].row,"cancel")}>Cancel</button>
              </li>
            );
          }
          
        }
      }
      return returnArray;
    }
  }
  render(){
    return (
      <div className="main-int">
        <form className="input-int">
          <input type="text" placeholder="Do something?" value={this.state.value} onChange={(event) => this.handleChangeInput(event)}></input>
          <button onClick={(event) => this.handleClickButton(event)}>Add</button>
        </form>
        <ul className="list-int">
          {this.renderRow()}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <TodoApp/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
