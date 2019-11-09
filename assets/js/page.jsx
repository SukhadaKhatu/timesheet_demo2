import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col, NavItem } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import Login from './login';
import RequestList from './requests/index';
import RequestsNew from "./requests/new";
import TaskList from './tasks/index';
import TasksNew from './tasks/new';
import RequestsUpdate from './requests/update';
import { Alert } from "react-bs-notifier";

import store from './store';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="8">
        <Nav>
        <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
        </NavLink>
        </Nav>
        </Col>
        <Col md="4">
        <Session />
        </Col>
      </Navbar>
      
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/requests/index">
          <RequestList />
        </Route>

        <Route exact path="/requests/new">
          <RequestsNew />
        </Route>

        <Route exact path="/requests/update/:request_id" render={
          (props) =>
          <RequestsUpdate request_id={props.match.params.request_id} />
        } />

        <Route exact path="/tasks/new/:request_id" render={
          (props) =>
          <TasksNew request_id={props.match.params.request_id} />
        } /> 
        <Route exact path="/tasks/:request_id" render={
          (props) =>
            <TaskList request_id={props.match.params.request_id} />
        } />

      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
      </Nav>
    );
  }
});
