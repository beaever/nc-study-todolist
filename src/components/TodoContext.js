import React, { createContext, useContext, useReducer } from 'react';

const initalTodos = [
  {
    id: 1,
    title: '프로젝트 생성하기',
    dropEvent: false,
    done: true,
    detail:
      '프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. 프로젝트 생성하기 상세 입니다. ',
  },
  {
    id: 2,
    title: 'TodoList 작성하기',
    dropEvent: false,
    done: false,
    detail:
      'TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. TodoList 작성하기 상세 입니다. ',
  },
  {
    id: 3,
    title: '과제 작업하기',
    dropEvent: false,
    done: true,
    detail: '과제 작업하기 상세 입니다.',
  },
  {
    id: 4,
    title: 'GraphQL 공부 하기',
    dropEvent: false,
    done: false,
    detail: 'GraphQL 공부하기 상세',
  },
  {
    id: 5,
    title: '오늘 하루에 작업 완료 하기',
    dropEvent: false,
    done: true,
    detail: '작업 완료하기.',
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

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initalTodos);
  const nextId = () =>
    initalTodos.length === 0 ? 1 : initalTodos[initalTodos.length - 1].id; //다음 아이디 가져오기

  //프로바이더 벨류 합치기
  return (
    <TodoContext.Provider value={{ state, dispatch, nextId }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hooks
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('Can not Find Provider');
  }
  return context;
};
