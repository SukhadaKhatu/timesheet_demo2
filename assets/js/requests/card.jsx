import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Button } from 'react-bootstrap';
import { submit_view_tasks } from '../ajax';

export default function RequestCard({request, manager_id}) {
  console.log("request", request)
  console.log(request.id)
  let approval = "No"
  if(request.approval) {
    approval = "Yes"
  }
  // console.log(request.approval)
  let path = "/tasks/" + request.id
  let approve = []
  if(manager_id == null) {
    let path_new = "./update/" + request.id;
    console.log("new",path_new);
    approve.push(<a href={path_new}> Approve Timesheet</a>);
  }
  return (
    <Card className="col-4">
      <Card.Body>
          <Card.Title>
              {request.name}
          </Card.Title>
          <Card.Header>
          Approved: {approval}
          </Card.Header>
          <a href={path}>View Timesheet</a>
          {approve}
      </Card.Body>
    </Card>
  );
}
