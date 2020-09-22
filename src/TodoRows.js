import React from 'react';

class TodoRows extends React.Component{
    render(){
      const {list,handleInput,handleEditButton, handleRemoveButton} = this.props;
      if(list.length > 0){ 
        let returnArray = [];
        for(let i=0; i < list.length; i++){
          if(list[i].row !== "" && list[i].value !== ""){
            if (list[i].isEditing === false){
              returnArray.push(
                <tr key={list[i].row}>
                  <td><input checked={list[i].isDone ? true : false} type="checkbox" id={list[i].row} onClick={(event) => handleInput(event, list[i].row)}  /></td>
                  <td><label htmlFor={list[i].row}>{list[i].value}</label></td>
                  <td>
                    <button onClick={(event) => this.props.handleEditButton(event, list[i].row,"edit")}>Edit</button>
                    <button onClick={(event) => handleRemoveButton(event, list[i].row)}>Del</button>
                  </td>
                </tr>
              );
            }else{
              returnArray.push(
                <tr key={list[i].row}>
                  <td>{list[i].isDone ? "Done" : "Not Done"} </td>
                  <td><input type="text" value={list[i].inputEdit} onChange={(event) => handleInput(event,list[i].row)}></input></td>
                  <td>
                  <button onClick={(event) => handleEditButton(event, list[i].row, "save")}>Save</button>
                  <button onClick={(event) => handleEditButton(event, list[i].row, "cancel")}>Cancel</button>
                  </td>
                </tr>
              );
            }
          }
        }
        return returnArray;
      }
    };
  }

  export default TodoRows;