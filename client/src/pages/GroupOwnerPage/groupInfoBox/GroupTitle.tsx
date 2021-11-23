import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const MAX_TITLE_LENGTH = 20;
function GroupTitle(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false   );
  const [title, setTitle] = useState<string>('');
  const textInput = useRef<HTMLTextAreaElement>(null);

  const handleEditButtonClick = () => {
    const text = textInput.current?.value;
    if (isEdit && text) {
      setTitle(text);
    }
    setIsEdit(!isEdit);
  };
  return (
    <Container>
      <Header>
        <BoxTitle>제목</BoxTitle>
        <EditButton onClick={handleEditButtonClick}>{isEdit ? '저장' : '편집'}</EditButton>
      </Header>
      {isEdit ? (
        <EditText ref={textInput} defaultValue={title} maxLength={MAX_TITLE_LENGTH} />
      ) : (
        <Text>{title}</Text>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
`;

const BoxTitle = styled.p`
  padding: 0;
  margin-bottom: 0;
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
  box-shadow: 0px 3px 5px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

const Text = styled.pre`
  width: 520px;
  margin: 10px 10px;
  line-height: 30px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
  font-size: 14px;
  font-family: 'Segoe UI';
`;

const EditText = styled.textarea`
  width: 520px;
  margin: 10px;
  max-height: 30px;
  font-size: 14px;
  resize: none;
  border: 1px ${(props) => props.theme.Primary} solid;
  border-radius: 5px;
  &:focus {
    outline: 2px ${(props) => props.theme.Primary} solid;
  }
`;

export default GroupTitle;
