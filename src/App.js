import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { TodoProvider } from './components/TodoContext';
import TodoHeader from './components/TodoHeader';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const App = () => {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHeader />
        <TodoList />
        <TodoInsert />
      </TodoTemplate>
    </TodoProvider>
  );
};

export default App;
