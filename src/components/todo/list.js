import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

export default (props) => (
  <ListGroup>
    {props.list.map(item => (
      <ListGroup.Item
        variant={`${item.complete ? 'danger' : 'success'}`}
        key={item._id}
        onClick={() => props.handleComplete(item._id)}>
          {item.text}
      </ListGroup.Item>
    ))}
  </ListGroup>
);