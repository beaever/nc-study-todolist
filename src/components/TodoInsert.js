import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoContext } from './TodoContext';
import _ from 'lodash';

const CircleButton = styled.button`
  background: #1864ab;
  &:hover {
    background: #1c7ed6;
  }
  &:active {
    background: #20c997;
  }
  z-index: 1000;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  font-size: 60px;
  color: #fff;
  border-radius: 40px;
  border: none;
  outline: none;
  transition: all 0.125s ease-in;

  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPosition = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  height: 500px;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const InputTitle = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  ::placeholder {
    color: #e9ecef;
  }
`;

const InputDetail = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  height: 450px;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;
  margin-top: 20px;
  ::placeholder {
    color: #e9ecef;
  }
`;

const InputSubmitButtonHidden = styled.input`
  display: none;
`;

const TodoInsert = () => {
  // Context API
  const useTodo = useTodoContext();
  const nextId = useTodo.nextId(); // 다음에 생성될 객체의 ID

  // useState 상태값 변환
  const [on, setOn] = useState(false);
  const [todoInsertTitleValue, setTodoInsertTitleValue] = useState('');
  const [todoInsertDetailValue, setTodoInsertDetailValue] = useState('');

  // Circle Button State 변경
  const onToggle = () => setOn(!on);

  // onSubmit Event
  const onClickSubmit = (e) => {
    e.preventDefault();
    if (!_.isEmpty(todoInsertTitleValue) && !_.isEmpty(todoInsertDetailValue)) {
      useTodo.dispatch({
        type: 'Create',
        todo: {
          id: nextId.current + 1,
          title: todoInsertTitleValue,
          detail: todoInsertDetailValue,
          done: false,
        },
      });
      setTodoInsertTitleValue('');
      setTodoInsertDetailValue('');
      setOn(false);
      nextId.current += 1;
      alert('오늘 할일이 생성되었습니다.');
    } else {
      if (_.isEmpty(todoInsertTitleValue)) {
        alert('제목을 입력해주세요!');
      } else if (_.isEmpty(todoInsertDetailValue)) {
        alert('상세 설명을 입력해주세요!');
      }
    }
  };

  return (
    <>
      {on && (
        <InsertFormPosition>
          <InsertForm onSubmit={(e) => onClickSubmit(e)}>
            <InputTitle
              type='text'
              placeholder='할일의 제목을 입력 해주세요!'
              autoFocus
              value={todoInsertTitleValue}
              onChange={(e) => setTodoInsertTitleValue(e.currentTarget.value)}
            />
            <InputDetail
              type='text'
              placeholder='할일의 상세 설명을 입력 해주세요!'
              autoFocus
              value={todoInsertDetailValue}
              onChange={(e) => setTodoInsertDetailValue(e.currentTarget.value)}
            />
            <InputSubmitButtonHidden type='submit' />
          </InsertForm>
        </InsertFormPosition>
      )}
      <CircleButton onClick={onToggle} open={on}>
        <MdAdd />
      </CircleButton>
    </>
  );
};

export default TodoInsert;
