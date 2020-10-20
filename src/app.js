import React from 'react';

import ToDo from './components/todo/todo-connected.js';
import Header from './components/todo/header';
import SortProvider from './context/sort';
import CompleteProvider from './context/completed';
import PagenationProvider from './context/pagenation';

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => (
  <>
    <Header />
    <SortProvider>
      <CompleteProvider>
        <PagenationProvider>
          <ToDo />
        </PagenationProvider>
      </CompleteProvider>
    </SortProvider>
  </>
);
