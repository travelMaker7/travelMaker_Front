// import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ScheduleTabs from "@/components/mypage/ScheduleTabs";

// Axios Mock Adapter 인스턴스 생성
const mock = new AxiosMockAdapter(axios);

// Mock 데이터
const mockRegisteredSchedulesData = {
  data: {
    schedules: [
      {
        scheduleId: "1",
        scheduleName: "제주도 여행",
        startDate: "2023-10-01",
        finishDate: "2023-10-05",
      },
      {
        scheduleId: "2",
        scheduleName: "부산 여행",
        startDate: "2023-11-01",
        finishDate: "2023-11-03",
      },
      // 더 많은 등록된 일정 객체를 여기에 추가할 수 있습니다.
    ],
  },
};

// 참여 일정에 대한 목 데이터
const mockParticipatingSchedulesData = {
  data: {
    schedules: [
      {
        scheduleId: "3",
        scheduleName: "경주 역사 탐방",
        destinationName: "경주",
        scheduleDate: "2023-10-10",
      },
      {
        scheduleId: "4",
        scheduleName: "강릉 커피 여행",
        destinationName: "강릉",
        scheduleDate: "2023-10-15",
      },
      // 더 많은 참여 일정 객체를 여기에 추가할 수 있습니다.
    ],
  },
};
describe("ScheduleTabs Component", () => {
  afterEach(() => {
    mock.reset();
  });

  it("loads registered schedules on mount", async () => {
    mock
      .onGet("/api/v1/mypage/schedules/registerd")
      .reply(200, mockRegisteredSchedulesData);

    const { findByText } = render(<ScheduleTabs />);
    const scheduleItem = await findByText(
      mockRegisteredSchedulesData.data.schedules[0].scheduleName
    );

    expect(scheduleItem).toBeInTheDocument();
  });

  it("loads participating schedules when tab changes to 승인대기", async () => {
    // 초기에 등록된 일정 로드를 위한 모의 응답
    mock
      .onGet("/api/v1/mypage/schedules/registerd")
      .reply(200, mockRegisteredSchedulesData);

    // 참여 일정 로드를 위한 모의 응답
    mock
      .onGet("/api/v1/mypage/schedules/participating?status=승인대기")
      .reply(200, mockParticipatingSchedulesData);

    const { findByText, getByText } = render(<ScheduleTabs />);

    // '참여 대기중' 탭을 클릭
    fireEvent.click(getByText("참여 대기중"));

    const participatingScheduleItem = await findByText(
      mockParticipatingSchedulesData.data.schedules[0].scheduleName
    );

    expect(participatingScheduleItem).toBeInTheDocument();
  });
});
