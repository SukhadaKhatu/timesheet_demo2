import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_task } from '../ajax';
import store from '../store';

function state2props(state, props) {
  let id = parseInt(props.id);
  return {id: id, forms: state.forms.new_task};
}

class TasksNew extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: null,
    }
    this.request_id = parseInt(props.request_id);
    this.preload();
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_TASK',
      data: data,
    });
  }

  preload() {
    let state = store.getState();
    let current_user =state.session.user_id;
    let data = {request_id: this.request_id, user_id: current_user, job_code: "JOB1"}
    this.props.dispatch({
      type: 'CHANGE_NEW_TASK',
      data: data,
    });
  }

  render() {
    let {name, date, user_id, manager_id, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    console.log("state", store.getState());

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <h1>New Task</h1>
        { error_msg }
        <form>
          <div className="form-group row" >
            <label className="col-sm-2 col-form-label">Job Code</label>
            <select onChange={(ev) => this.changed({job_code: ev.target.value})}>
                <option value="JOB1">JOB1</option>
                <option value="JOB2">JOB2</option>
                <option value="JOB3">JOB3</option>
                <option value="JOB4">JOB4</option>
                <option value="JOB5">JOB5</option>
            </select>
          </div>

          <div className="form-group row" >
            <label className="col-sm-2 col-form-label">Time</label>
            <input type="number" onChange={(ev) => this.changed({time: ev.target.value})} />
          </div>

          <div className="form-group row" >
          <label className="col-sm-2 col-form-label">Description</label>
            <input type="text" onChange={(ev) => this.changed({desc: ev.target.value})}/>
          </div>


          <div className="form-group row" >
            <Button variant="primary" onClick={() => submit_new_task(this)} >Create Task</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state2props)(TasksNew);


