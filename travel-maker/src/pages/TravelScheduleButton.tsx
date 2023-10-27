import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  margin: 20px auto;
  padding: 2% 6%;
  background-color: #3359DE;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
`;

const TravelScheduleButton: React.FC = () => {
  return (
    <Button>
      여행 일정 등록
    </Button>
  );
};

export default TravelScheduleButton;
