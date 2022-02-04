import React, { createContext, useContext, useReducer, useRef } from 'react';

const initalTodos = [
  {
    id: 1,
    title: '프로젝트 생성하기??',
    dropEvent: false,
    done: true,
    detail:
      '디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.디테일입니다.',
  },
  {
    id: 2,
    title: 'TodoList 작성하기',
    dropEvent: false,
    done: false,
    detail: '디테일입니다.',
  },
  {
    id: 3,
    title: '프로젝트 생성하기',
    dropEvent: false,
    done: true,
    detail: '디테일입니다.',
  },
  {
    id: 4,
    title: '프로젝트 생성하기',
    dropEvent: false,
    done: false,
    detail: '디테일입니다.',
  },
  {
    id: 5,
    title: '프로젝트 생성하기',
    dropEvent: false,
    done: true,
    detail: '디테일입니다.',
  },
];
// Creact, Toggle, Remove 의 Event를 감지 합니다.
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'Create':
      return state.concat(action.todo);
    case 'Toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'Drop':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, dropEvent: !todo.dropEvent } : todo
      );
    case 'Remove':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error('Action type is not matching');
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initalTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

// Custom Hooks
// 컴포넌트 최적화를 위해 따로따로 만들었음.
export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Can not Find Provider');
  }
  return context;
};
export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Can not Find Provider');
  }
  return context;
};
export const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Can not Find Provider');
  }
  return context;
};
