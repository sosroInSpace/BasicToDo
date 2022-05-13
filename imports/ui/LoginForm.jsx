import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { LoginWithGithub } from './LoginWithGithub';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color,
  },
  login: {
    textAlign: 'center',
    maxWidth:'300px',
    margin:'auto',
    border:'2px solid #999',
    padding:'50px 15px'
  },
  button: {
    margin: '15px 0'
  },


});

const ButtonOpt = (props) => {
  return (
     <Button type="submit" className={props.className} variant="contained" color="primary">Log In</Button>
  )
}

export const LoginForm = (props) => {

  const classRender = useStyles(props);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (

    <form onSubmit={submit} className={classRender.login}>
      <LoginWithGithub className={classRender.button}/>
    <div>
      <TextField
       label="Username" 
       name="username"
       required
       onChange={(e) => setUsername(e.target.value)}
       />
    </div>

    <div>
       <TextField
       label="Password" 
       name="password"
       type="password"
       autoComplete="current-password"
       required
       onChange={(e) => setUsername(e.target.value)}
       className={classRender.button}
       />
     
    </div>

    <div>
     
      <ButtonOpt className={classRender.button} />
    </div>
  </form>
  );
};