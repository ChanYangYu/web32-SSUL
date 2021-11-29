import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  name: string;
  url: string;
}
export default function CategoryItem({ id, name, url }: Props): JSX.Element {
  return (
    <LinkButton
      to={{
        pathname: `/recruit/group`,
        state: {
          id,
        },
      }}
    >
      <CategoryIcon src={url} alt={name} />
      <CategoryName>{name}</CategoryName>
    </LinkButton>
  );
}

const LinkButton = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const CategoryIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
`;

const CategoryName = styled.span`
  font-size: 0.8rem;
`;
