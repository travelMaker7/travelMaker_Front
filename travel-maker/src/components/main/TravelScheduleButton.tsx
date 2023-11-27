import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #3359DE;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  width: 200px;
  height: 60px;
  margin-bottom: 40px;
`;

const TravelScheduleButton: React.FC = () => {
  return (
    <Button>
      여행 일정 등록
    </Button>
  );
};

export default TravelScheduleButton;
