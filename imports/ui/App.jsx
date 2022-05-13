import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const classRenderTing = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color,
  },
  align: {
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    fontSize:'20px',
    textTransform:'uppercase',
    padding:'15px 0',
    border:'2px solid #999',
    marginBottom:'50px'
  },
  list: {
    listStyle: 'none',
    paddingLeft:'0',
    lineHeight:'140%'
  }
 
 });

const toggleChecked = ({_id, isChecked}) => {
 Meteor.call('tasks.setIsChecked', _id, !isChecked);
}

const deleteTask = ({_id}) => Meteor.call('tasks.remove', _id)

export const App = (props) => {
  const classes = classRenderTing(props);
  const user = useTracker(() => Meteor.user());
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const [hideCompleted, setHideCompleted] = useState(false);

  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

 const tasks = useTracker(() => {
      if (!user) {
        return [];
      }

      return TasksCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
    });


   const pendingTasksCount = useTracker(() => {
      if (!user) {
        return 0;
      }

      return TasksCollection.find(pendingOnlyFilter).count();
    });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;
 

  const logout = () => Meteor.logout();

  return (
     <div className="app">
      <header>
        <div className="app-bar">
          <div>
            <h1 className={classes.align}>to do list {pendingTasksTitle}</h1>

          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
          <div className="user" onClick={logout}>
          <Button variant="contained" endIcon={<ExitToAppIcon />}>{user.username || user.profile.name}  </Button>
        </div>
            <TaskForm/>

            <div className="filter">
              <Button variant="contained" color="secondary" onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </Button>
            </div>

            <ul className={classes.list}>
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )

}


