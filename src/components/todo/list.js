import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';

export default (props) => (
  <ListGroup>
    {props.list.map(item => (
      // <ListGroup.Item
      //   variant={`${item.complete ? 'danger' : 'success'}`}
      //   key={item._id}
      //   onClick={() => props.handleComplete(item._id)}>
      //     {item.text}
      // </ListGroup.Item>

            <Toast key={item._id} onClose={() => props.handleDelete(item._id)} style={{position: 'relative'}}>
        <Toast.Header>
              <Badge
                pill
                style={{marginRight: '15px', cursor: 'pointer'}}
                onClick={() => props.handleComplete(item._id)}
                variant={item.complete ? 'danger' : 'success'}>
                {item.complete ? 'Complete' : 'Pending'}
              </Badge>
              <strong className="mr-auto">{item.assignee}</strong>
        </Toast.Header>
        <Toast.Body>
          {item.text}
        </Toast.Body>
        <small style={{position: 'absolute', bottom: 5, right: 5}}>Difficulty: {item.difficulty}</small>
      </Toast>

    ))}
  </ListGroup>
);