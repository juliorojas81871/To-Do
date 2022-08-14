import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function ToDoItem(props) {
  return (
    <div>
      <li>
        {props.text}
        <div className="icons">
          <EditIcon onClick={props.update}/>
          <DeleteIcon onClick={props.remove}/>
        </div>       
      </li>

    </div>
  );
}

export default ToDoItem;
