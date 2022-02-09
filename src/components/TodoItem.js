import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri';
import { useTodoContext } from './TodoContext';
// Styled Components

const ItemHeader = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Delete = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  opacity: 0;
  ${(props) =>
    props.done
      ? css`
           {
            opacity: 1;
            color: #1864ab;
          }
        `
      : css`
           {
             {
              &:hover {
                opacity: 1;
                color: #868e96;
              }
            }
          }
        `}
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  font-size: 18px;
  color: #495057;
  span {
    width: 80%;
  }
  button {
    opacity: 0;
    margin-right: 20px;
  }
  &:hover {
    button {
      opacity: 1;
    }
  }
  ${(props) =>
    props.done &&
    css`
       {
        color: #ced4da;
        text-decoration: line-through;
      }
    `}
`;

const DetailTextContainer = styled.div`
  padding-left: 52px;
  padding-right: 30px;
  box-sizing: border-box;
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.125s ease;
`;

const DetailTextContents = styled.div`
  margin-top: 20px;
  text-align: start;
  color: #868e96;
  font-size: 15px;
`;

const DropDown = styled.button`
  border: none;
  outline: none;
  width: 25px;
  height: 25px;
  font-size: 25px;
  background-color: #fff;
  cursor: pointer;
`;

const TodoItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dotted #ced4da;

  &:hover {
    ${Delete} {
      opacity: 1;
    }
  }
`;

const TodoItem = ({ id, done, details, title, dropEvent }) => {
  const useTodo = useTodoContext();

  // Drop Down Event 에 다른 아이콘 변경을 위한 State
  const [isDrop, setIsDrop] = useState(false);
  // DropDown Event 를 위한 Ref
  const detailTextContainerRef = useRef(null);
  const detailTextContentsRef = useRef(null);
  const dropDownTag = !isDrop ? <RiArrowDropDownFill /> : <RiArrowDropUpFill />;

  const onClickDropDown = useCallback(
    (e) => {
      e.stopPropagation();
      if (detailTextContainerRef.current === null) {
        return;
      }
      if (detailTextContainerRef.current.clientHeight > 0) {
        detailTextContainerRef.current.style.height = '0';
      } else {
        detailTextContainerRef.current.style.height = '100%';
      }
      setIsDrop(!isDrop);
    },
    [isDrop]
  );

  const onAction = (type) => {
    if (type === 'Toggle') {
      useTodo.dispatch({
        type: type,
        id,
      });
    } else if (type === 'Remove') {
      useTodo.dispatch({
        type: type,
        id,
      });
    } else if (type === 'Drop') {
      useTodo.dispatch({
        type: type,
        id,
      });
    }
  };

  return (
    <>
      <TodoItemBlock>
        <ItemHeader>
          <CheckCircle done={done} onClick={() => onAction('Toggle')}>
            <MdDone />
          </CheckCircle>
          <Title done={done}>
            <span>{title ? title : ''}</span>
            <DropDown onClick={(e) => onClickDropDown(e)}>
              {dropDownTag}
            </DropDown>
          </Title>
          <Delete onClick={() => onAction('Remove')}>
            <MdDelete />
          </Delete>
        </ItemHeader>

        <DetailTextContainer ref={detailTextContainerRef}>
          <DetailTextContents ref={detailTextContentsRef}>
            {details}
          </DetailTextContents>
        </DetailTextContainer>
      </TodoItemBlock>
    </>
  );
};
// React.memo 를 사용하는것은 최적화를 위함 (불필요한 재 랜더링을 막기 위함)
export default React.memo(TodoItem);
