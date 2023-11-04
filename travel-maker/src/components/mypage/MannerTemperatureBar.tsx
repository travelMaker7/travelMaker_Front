import React from "react";
import styled from "styled-components";

interface MannerTemperatureBarProps {
  width: string;
}

// 매너온도 바 컨테이너를 위한 스타일드 컴포넌트
const MannerBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 20px 0; // 프로필 컴포넌트로부터의 여백
  position: relative;
  flex-shrink: 0;
`;

// 실제 온도 지시자를 위한 스타일드 컴포넌트
const TemperatureIndicator = styled.div<MannerTemperatureBarProps>`
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(to right, #007bff 0%, #ff6f00 50%, #dc3545 100%);
  width: ${(props) =>
    props.width || "50%"}; // 너비는 사용자의 매너 레벨을 나타냅니다
`;

const MannerTemperatureBar: React.FC<MannerTemperatureBarProps> = ({
  width,
}) => {
  return (
    <MannerBarContainer>
      <TemperatureIndicator width={width} />
    </MannerBarContainer>
  );
};

export default MannerTemperatureBar;
