import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  label: {
    margin: '15px 0px',
    display: 'inline-block',
    minWidth:'200px',
    textAlign:'left'
  },


});

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const classRender = useStyles();

  return <li>
  <Checkbox
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
  <label className={classRender.label}>{task.text}</label>
  <Button onClick={ () => onDeleteClick(task) } variant="outlined" size="small" color="primary">&times;</Button>
  </li>
};