import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

/* Structure of store data:
 * {
 *   forms: {
 *     new_photo: {...},
 *     edit_photo: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   photos: Map.new(
 *     1 => {id: 1, data: "...", desc: "...", tags: [...]},
 *     ...
 *   ),
 * }
 */

function new_request(st0 = {name: "", date: null, user_id: null, manager_id: null, errors: null}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_REQUEST':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function new_task(st0 = {job_code: "", time: null, user_id: null, request_id: null, desc: "", errors: null}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_TASK':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    new_request,
    new_task,
    login,
  });
  return reducer(st0, action);
}

function users(st0 = new Map(), action) {
  return st0;
}

function requests(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_REQUESTS':
      let st1 = new Map(st0);
      for (let request of action.data) {
        st1.set(request.id, request);
      }
      return st1;
    default:
      return st0;
  }
}

function tasks(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_TASKS':
      // let st1 = new Map(st0);
      // console.log("heree in add task");
      // console.log(action);
      // for(let task of action.data) {
      //   console.log(task)
      //   st1.set(task.id, task);
      // }
      // // console.log(st1);
      // return st1;
      console.log(action.data);
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}
// try
function current_request(st0 = null, action) {
  switch(action.type) {
    case 'ADD_REQUESTS':
      return action.data;
    case 'ADD_CURRENT_REQUESTS':
      return action.data;
    default:
      return st0;
  }
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    users,
    requests,
    tasks,
    current_request,
    session,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
