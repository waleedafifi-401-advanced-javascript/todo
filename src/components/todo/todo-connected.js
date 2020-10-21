import React, { useEffect, useState, useCallback } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Auth from '../auth/auth';
import useAjax from '../../hooks/useAjax';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './todo.scss';

const todoAPI = 'https://amman-api-server.herokuapp.com/todo';
// const todoAPI = 'http://localhost:3001/todo';

const ToDo = () => {

  const updateList = (newList) => setList(newList);

  const [list, setList] = useState([]);
  const [apiCall] = useAjax(updateList);

  const _toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      apiCall(`${todoAPI}/${id}`, 'PUT', item);
    }
  };

  const getList = useCallback(() => {
    if (!list.length) {

      apiCall(todoAPI,'GET')
    }
  }, [list, apiCall]);

  useEffect(() => {
    getList()
  }, [getList]);


  // const [list, setList] = useState([]);

  // const _addItem = (item) => {
  //   item.due = new Date();
  //   axios({
  //     url: todoAPI,
  //     method: 'post',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     headers: { 'Content-Type': 'application/json' },
  //     data: item
  //   })
  //     .then(({ data: savedItem }) => {
  //       setList([...list, savedItem])
  //     })
  //     .catch(console.error);
  // };

  // const _toggleComplete = id => {

  //   let item = list.filter(i => i._id === id)[0] || {};

  //   if (item._id) {

  //     item.complete = !item.complete;

  //     let url = `${todoAPI}/${id}`;

  //     axios({
  //       url,
  //       method: 'put',
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: item
  //     })
  //       .then(() => {
  //         setList(list.map(listItem => listItem._id === item._id ? item : listItem));
  //       })
  //       .catch(console.error);
  //   }
  // };

  // const _getTodoItems = () => {
  //   axios({
  //     url: todoAPI,
  //     method: 'get',
  //     mode: 'cors',
  //   })
  //     .then(({ data }) => setList(data.results))
  //     .catch(console.error);
  // };

  // useEffect(_getTodoItems, []);


  // const _delete = id => {

  //   let item = list.filter(i => i._id === id)[0] || {};

  //   if (item._id) {
  //     let url = `${todoAPI}/${id}`;

  //     axios({
  //       url,
  //       method: 'delete',
  //       mode: 'cors',
  //       cache: 'no-cache',
  //     })
  //       .then(() => {
  //         setList(list.filter(listItem => listItem._id !== item._id));
  //       })
  //       .catch(console.error);
  //   }
  // };

  return (
    <>
      <Container fluid="true" style={{ margin: "20px 100px" }}>
        <Auth capability="read">
          <Row style={{marginBottom:"20px"}}>
            <Col className="text-light bg-dark h2" style={{ padding: '20px' }}>
              To Do List Manager ({list.filter(item => !item.complete).length})
            </Col>
          </Row >
        </Auth>
        <Row>
          <Auth capability="create">
            <Col md={3}>
              <TodoForm handleSubmit={value => apiCall(todoAPI, 'POST', value)} />
            </Col>
          </Auth>
          <Auth capability = "read">
            <Col>
              <TodoList
                list={list}
                handleComplete={_toggleComplete}
                handleDelete={id => apiCall(`${todoAPI}/${id}`, 'DELETE', id)}
              />
            </Col>
          </Auth>
        </Row>
      </Container>
    </>
  );
};

export default ToDo;
