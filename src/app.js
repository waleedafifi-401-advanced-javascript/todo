import React from 'react';

import ToDo from './components/todo/todo-connected.js';
import Header from './components/todo/header';
import SortProvider from './context/sort';
import CompleteProvider from './context/completed';
import PagenationProvider from './context/pagenation';
import LoginProvider from './components/auth/context';
import Signup from './components/auth/signup';

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => (
  <>
    <LoginProvider>
      <Header />
      <SortProvider>
        <CompleteProvider>
          <PagenationProvider>
            <ToDo />
            <Signup />
          </PagenationProvider>
        </CompleteProvider>
      </SortProvider>
    </LoginProvider>
  </>
);
