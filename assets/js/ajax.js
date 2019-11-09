
import store from './store';

export function post(path, body) {
  let state = store.getState();
  console.log("state");
  console.log(state);
  let token = "";
  if(state.session != null) {
    token = state.session.token;
  }
  // let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  console.log("state");
  console.log(state);
  let token = "";
  if(state.session != null) {
    token = state.session.token;
  }

  console.log("token");
  console.log(token);
  // let token = state.session.token;
  
  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function list_requests() {
  get('/requests/')
    .then((resp) => {
      console.log("list_requests", resp);
      store.dispatch({
        type: 'ADD_REQUESTS',
        data: [resp.data],
      });
    });
}

export function list_tasks(request_id) {
  get('/tasks/' + request_id)
    .then((resp) => {
      console.log("list_tasks", resp);
      store.dispatch({
        type: 'ADD_TASKS',
        data: resp.data,
      });
    });
}


export function submit_new_task(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_task;

  console.log("data");
  console.log(data);
  let time = parseInt(data.time);
  post('/tasks', {
    task: {
      job_code: data.job_code,
      time: time,
      user_id: data.user_id,
      request_id: data.request_id,
      desc: data.desc,
    }
  }).
      then((resp) => {
        console.log("response");
        console.log(resp);
        if(resp.data) {
          store.dispatch({
            type: 'ADD_TASKS',
            data: [resp.data],
          });
          // form.redirect('../../tasks/index');
        }
        else {
          store.dispatch({
            type: 'CHANGE_NEW_TASK',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
  }


export function submit_view_task(request_id) {
  get('/tasks'+ request_id).then((resp) => {
        console.log("response");
        console.log(resp);
        if(resp.data) {
          store.dispatch({
            type: 'ADD_REQUESTS',
            data: [resp.data],
          });
          form.redirect('/tasks/index');
        }
        else {
          store.dispatch({
            type: 'ADD_CURRENT_REQUESTS',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
}

export function submit_update_request(id, form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_request;
  console.log("data", data);
  let update = {approval: false}
  if(data.approval == "on") {
    update = {approval: true}
  }
  console.log(update)
  console.log(id.request_id)
  post('/requests/update/'+ id.request_id, {
    id: id.request_id,
    request: update
  }).
      then((resp) => {
        console.log("response");
        console.log(resp);
        if(resp.data) {
          store.dispatch({
            type: 'ADD_REQUESTS',
            data: [resp.data],
          });
          form.redirect('../requests/index');
        }
        else {
          store.dispatch({
            type: 'CHANGE_NEW_REQUEST',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
}

export function submit_new_request(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_request;
  console.log("data", data);

  console.log("data");
  console.log(data);
  post('/requests', {
    request: {
      name: data.name,
      date: data.date,
      user_id: data.user_id,
      manager_id: data.manager_id,
    }
  }).
      then((resp) => {
        console.log("response");
        console.log(resp);
        if(resp.data) {
          store.dispatch({
            type: 'ADD_REQUESTS',
            data: [resp.data],
          });
          form.redirect('../requests/index');
        }
        else {
          store.dispatch({
            type: 'CHANGE_NEW_REQUEST',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
}


export function submit_login(form) {
  console.log("here")
  let state = store.getState();
  console.log(state);
  let data = state.forms.login;
  console.log(data);

  post('/sessions', data)
    .then((resp) => {
      console.log("response");
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/requests/index'); 
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}
