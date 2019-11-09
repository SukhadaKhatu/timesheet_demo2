import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_request } from '../ajax';
import store from '../store';

function state2props(state) {
  return state.forms.new_request;
}

class RequestsNew extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
    this.preload();
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  preload() {
    let state = store.getState();
    let current_user =state.session.user_id;
    let manager = state.session.manager_id;
    let data = {user_id: current_user, manager_id: manager}
    this.props.dispatch({
      type: 'CHANGE_NEW_REQUEST',
      data: data,
    });
  } 

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_REQUEST',
      data: data,
    });
  }

  render() {
    let {name, date, user_id, manager_id, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <h1>New Request</h1>
        { error_msg }
        <form>
          <div className="form-group row" >
            <label className="col-sm-2 col-form-label">Name</label>
            <input type="text" onChange={(ev) => this.changed({name: ev.target.value})} />
          </div>

          <div className="form-group row" >
            <label className="col-sm-2 col-form-label">Date</label>
            <input type="date" onChange={(ev) => this.changed({date: ev.target.value})} />
          </div>

          <div className="form-group row" >
            <Button variant="primary" onClick={() => submit_new_request(this)} >Create Request</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state2props)(RequestsNew);
