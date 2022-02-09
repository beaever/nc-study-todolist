import React from 'react';
import styled from 'styled-components';
import { useTodoContext } from './TodoContext';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
`;

const TodoList = () => {
  const useTodo = useTodoContext(); // TodoContext 안에 만들어 두었던 Custom Hooks를 사용
  return (
    <TodoListBlock>
      {useTodo.state.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            details={item.detail}
            dropEvent={item.dropEvent}
            done={item.done}
          />
        );
      })}
    </TodoListBlock>
  );
};

export default TodoList;
