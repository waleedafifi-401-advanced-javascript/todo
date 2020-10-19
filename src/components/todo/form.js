import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import useForm from '../../hooks/useForm';

export default (props) => {

  // const [item, setItem] = useState({});

  // const handleInputChange = e => {
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   e.target.reset();
  //   props.handleSubmit(item);
  //   const newItem = {};
  //   setItem({newItem});
  // };

  const [handleInputChange, handleSubmit] = useForm(fromCallback);

  function fromCallback(value) {
    props.handleSubmit(value);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Body>
            <Card.Title as="h5">Add To Do Item</Card.Title>
            <Form.Group controlId="formToDoItem">
              <Form.Label>
                To Do Item
            </Form.Label>
              <Form.Control
                name="text"
                type="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAssignee">
              <Form.Label>
                Assigned To
                </Form.Label>
              <Form.Control name="assignee" type="text" placeholder="Assignee Name" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDifficultyRating">
              <Form.Control defaultValue="3" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Item</Button>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}