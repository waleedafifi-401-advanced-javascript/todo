import React from 'react';

import ToDo from './components/todo/todo-connected.js';
import Header from './components/todo/header';

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
    return (
      <>
        <Header />
        <ToDo />
      </>
    );
}
