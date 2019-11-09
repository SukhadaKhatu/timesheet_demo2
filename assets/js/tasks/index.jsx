import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert, Table } from 'react-bootstrap';
import _ from 'lodash';
import store from '../store';

import { list_tasks } from '../ajax';

function TaskList(props) {
  // let {products, counts, dispatch} = props;
  let {request_id, tasks, dispatch} = props;
  if (!tasks) {
    list_tasks(request_id);
  }
  let count = 0;
  let prods = _.map(tasks, (pp) =>  
    <Task key={pp.id} dispatch={dispatch}
             task={pp} request_id={request_id} />
  );

  _.map(tasks, (pp) => count += pp.time);
  console.log(count);

  let state = store.getState();
  let user_id = state.session.user_id;
  let manager_id = state.session.manager_id;

  let path = "../tasks/new/" + request_id;
  let link = <a href={path}>New Task</a>;
  if(count > 8) {
    link = null; 
  }

  let alert = null;
  if(manager_id == null && count > 8) {
    link = null;
    alert = <Alert type="danger" headline="Error!">
    Time exceeded
    </Alert>;
  }
  return <div className="row">
    <div>
      <h1>Tasks</h1>
      {link}
      {alert}

      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Job Code</th>
          <th>Time</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
          {prods}
        </tbody>
        </Table>
    </div>
  </div>;
}

function Task(props) {
  let {task, root, request_id,dispatch} = props;
  return (
    
          <tr>
            <td>
              {task.job_code}
            </td>
            <td>
              {task.time}
            </td>
            <td>
              {task.desc}
            </td>
          </tr>
  );
}

function state2props(state, props) { // <=
  console.log("rerender", state);
    let request_id = parseInt(props.request_id);
    console.log(props);
    console.log(request_id);
  return {request_id: request_id, tasks: state.tasks.data};
  // };
}

// Export result of curried function call.
export default connect(state2props)(TaskList); // <=
