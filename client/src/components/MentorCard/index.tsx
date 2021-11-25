import React from 'react';
import styled from '@emotion/styled';
import MentorContents from './MentorContents';
import MentorFooter from './MentorFooter';
import { Mentor } from '@types';

interface CardProps {
  contents: Mentor;
}

function MentorCard({ contents }: CardProps): JSX.Element {
  return (
    <Card>
      <MentorContents {...{ contents }} />
      <MentorFooter mentorUserId={contents.user.id} />
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  margin: 10px;
  padding: 10px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 10px 10px;
`;

export default MentorCard;
