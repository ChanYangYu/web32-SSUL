import React from 'react';
import styled from '@emotion/styled';
import { formatDateToString } from '@utils/Date';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectGroupAdminData, setGroupAdminData } from '@store/group/adminSlice';
import { ParticipationRequest } from '@types';
import { groupHttpClient } from '@api';

function ParticipationRequestBox(): JSX.Element {
  const { groupId, requestList } = useAppSelector(selectGroupAdminData);
  const dispatch = useAppDispatch();

  const fetchApplyList = async () => {
    const requestList = await groupHttpClient.getApplyGroupList(groupId);
    dispatch(setGroupAdminData({ requestList }));
  };

  const handleAcceptButtonClick = (applyId: number) => async () => {
    await groupHttpClient.acceptApplyList(applyId);
    fetchApplyList();
  };

  const handleRejectButtonClick = (applyId: number) => async () => {
    await groupHttpClient.acceptDeclineList(applyId);
    fetchApplyList();
  };

  const makeRequestBox = (data: ParticipationRequest, idx: number): JSX.Element => {
    return (
      <BoxContainer key={idx}>
        <ProfileImage src={data.avatarUrl} />
        <ProfileInfo>
          <ProfileText>{data.name}</ProfileText>
          <ProfileFeverStack>
            <FeverNum>{data.feverStack}</FeverNum>
          </ProfileFeverStack>
        </ProfileInfo>
        <RequestDate>{formatDateToString(data.createdAt)}</RequestDate>
        <ButtonWrapper>
          <Reject onClick={handleRejectButtonClick(data.id)}>거절</Reject>
          <Accept onClick={handleAcceptButtonClick(data.id)}>수락</Accept>
        </ButtonWrapper>
      </BoxContainer>
    );
  };
  return (
    <Container>
      <Title>📃그룹참가 요청 리스트</Title>
      {requestList.length > 0 ? (
        <ScrollContainer>
          {requestList.map((data, idx) => makeRequestBox(data, idx))}
        </ScrollContainer>
      ) : (
        <>
          <EmptyMessage>아직 그룹 요청이 없어요...</EmptyMessage>
          <SubMessage>그룹 소개를 업데이트 해보는건 어떨까요?</SubMessage>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  min-width: 470px;
  height: 600px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  border-radius: 5px;
`;

const ScrollContainer = styled.div`
  overflow-y: scroll;
  height: 530px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.p`
  margin: 10px 0 20px 20px;
  font-size: 17px;
  font-weight: bold;
`;

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 420px;
  height: 80px;
  border-radius: 5px;
  margin: 0 auto 30px auto;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 50%;
  object-fit: fill;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileText = styled.p`
  width: 200px;
  margin: 0 5px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ProfileFeverStack = styled.div`
  height: 20px;
  width: 80px;
  align-self: center;
  background-color: ${(props) => props.theme?.Fever};
  border-radius: 10px;
  cursor: pointer;
  margin-top: 5px;
  &:hover > span {
    display: flex;
    color: ${(props) => props.theme?.White};
  }
`;

const FeverNum = styled.span`
  display: flex;
  line-height: 20px;
  font-weight: 500;
  font-size: 13px;
  color: ${(props) => props.theme?.White};
  justify-content: center;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 150px;
`;
const SubMessage = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.theme.Gray3};
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  width: 120px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 12px;
  width: 50px;
  height: 30px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0px 3px 5px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

const Reject = styled(Button)`
  color: ${(props) => props.theme.Primary};
  background-color: ${(props) => props.theme.White};
`;

const Accept = styled(Button)`
  color: ${(props) => props.theme.White};
  background-color: ${(props) => props.theme.Primary};
`;

const RequestDate = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 13px;
  margin-top: 5px;
  margin-right: 20px;
`;

export default ParticipationRequestBox;
