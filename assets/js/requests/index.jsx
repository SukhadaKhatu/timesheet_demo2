import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import _ from 'lodash';
import store from '../store';

import { list_requests } from '../ajax';
import RequestCard from './card';


let RequestList = connect(({requests}) => ({requests}))(({requests}) => {
  if (requests.size == 0) {
    list_requests();
  }

  let state = store.getState();
  let user_id = state.session.user_id;
  let manager_id = state.session.manager_id;

  let cards = []
  let request = []
  _.map([...requests], ([_, request]) => {
    for(let i = 0; i < request.length; i++) {
      cards.push(<RequestCard key={request[i].id} request={request[i]} manager_id={manager_id}/>);
    }  
    // return request.length;
  });
  
  console.log(cards)
  // let reqs =

  console.log("cards", cards);
  
  let new_request = null;
  if(manager_id != null) {
    new_request = <a href="/requests/new">
    New Request
  </a> 
  }

  return (
    <div>
      <h1>Requests</h1>
      
      {new_request}
      <div className="row">
        {cards}
      </div>
    </div>
  );
});

export default RequestList;
