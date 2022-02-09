import React from 'react';
import styled from 'styled-components';
import { useTodoContext } from './TodoContext';

const TodoHeaderBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e6ecef;
  display: flex;
  flex-direction: column;

  .task-left {
    text-align: end;
    color: #1864ab;
    font-size: 15px;
    margin-top: 40px;
    span {
      font-weight: bold;
    }
  }
`;

const TodoHeaderWeekBlock = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  h1 {
    margin: 0;
    font-size: 32px;
    color: #343a40;
  }
  .day {
    text-align: end;
    margin-left: 10px;
    color: #868e96;
    font-size: 21px;
  }
`;

const TodoHeader = () => {
  // 날짜 구하기
  const today = new Date();
  // 년 월 일 String 값으로 구하기
  const todayDateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const todayWeekdayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  const useTodo = useTodoContext();
  const undoneTasks = useTodo.state.filter((todo) => !todo.done);

  return (
    <TodoHeaderBlock>
      <TodoHeaderWeekBlock>
        <h1>{todayDateString}</h1>
        <div className='day'>{todayWeekdayName}</div>
      </TodoHeaderWeekBlock>

      <div className='task-left'>
        남은 할 일 <span>{undoneTasks.length}</span> 개
      </div>
    </TodoHeaderBlock>
  );
};

export default TodoHeader;
