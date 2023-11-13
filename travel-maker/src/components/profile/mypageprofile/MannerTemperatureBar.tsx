import React from 'react';
import styled from 'styled-components';

interface MannerTemperatureBarProps {
  width: string;
}

const MannerTemperatureBar: React.FC<MannerTemperatureBarProps> = ({ width }) => {
  return (
    <MannerBarContainer>
      <TemperatureIndicator width={width} />
    </MannerBarContainer>
  );
};

const MannerBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 20px 0;
  position: relative;
  flex-shrink: 0;
`;

const TemperatureIndicator = styled.div<MannerTemperatureBarProps>`
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(to right, #007bff 0%, #ff6f00 50%, #dc3545 100%);
  width: ${props => props.width || "50%"};
`;

export default MannerTemperatureBar;
