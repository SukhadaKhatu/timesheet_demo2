import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_update_request } from '../ajax';
import store from '../store';

function state2props(state, props) {
  let id = parseInt(props.id);
  return {id: id, forms: state.forms.new_request};
}

class RequestsUpdate extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
    this.request_id = parseInt(props.request_id);
    //this.preload();
  }

  redirect(path) {
    this.setState({redirect: path});
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
        <h1>Change status</h1>
        { error_msg }
        <form>
          <div className="form-group row" >
            <label className="col-sm-2 col-form-label">Approval</label>
            <input type="checkbox" onChange={(ev) => this.changed({approval: ev.target.value})} />
          </div>

          <div className="form-group row" >
            <Button variant="primary" onClick={() => submit_update_request(this)} >Update Request</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state2props)(RequestsUpdate);
