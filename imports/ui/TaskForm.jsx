import React, { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

  button: {
    margin: '0px 15px',
  },
  form: {
  	marginBottom: '25px',
  	marginTop:'15px'
  }


});

export const TaskForm = ({user}) => {

	const classRender = useStyles();
	const [text, setText] = useState('');

	 const handleSubmit = e => {
	    e.preventDefault();

	    if (!text) return;

	    Meteor.call('tasks.insert', text);

	    setText('');
	  };

	return (
		<form onSubmit={handleSubmit} className={classRender.form}>
		<TextField
	        type="text"
	        placeholder="Type to add new tasks"
	        onChange={(e) => setText(e.target.value)}
	      />

      	<Button type="submit" onClick={handleSubmit} variant="contained" color="primary" className={classRender.button}>Add Task</Button>
		</form>
	)
}

