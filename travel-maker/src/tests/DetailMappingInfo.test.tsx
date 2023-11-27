// import React from "react";
import { DetailMappingInfo } from "@/components/detailmapping/DetailMappingInfo";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const SCHEDULE_DETAIL_MOCK = {
  status: 201,
  message: "일정 상세보기 조회 성공",
  data: {
    scheduleId: 1,
    markers: [
      { destinationY: "37.5797", destinationX: "126.977" },
      { destinationY: "37.582441", destinationX: "126.977060" },
      { destinationY: "37.579772", destinationX: "126.975890" },
    ],
    scheduleName: "서울 맛집 탐방",
    startDate: "2023-11-21",
    finishDate: "2023-11-22",
    tripPlans: [
      {
        dateNum: "10월 20일",
        details: [
          {
            tripPlanId: 1,
            destinationName: "멋지고",
            wishCnt: 2,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "16:00",
            leaveTime: "18:00",
            overWish: true,
          },
          {
            tripPlanId: 2,
            destinationName: "잘생긴",
            wishCnt: 3,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "18:00",
            leaveTime: "19:00",
            overWish: false,
          },
        ],
      },
      {
        dateNum: "10월 21일",
        details: [
          {
            tripPlanId: 3,
            destinationName: "수민이",
            wishCnt: 2,
            wishJoin: false,
            address: "서울특별시 종로구 사직로 161",
            arriveTime: "16:00",
            leaveTime: "18:00",
            overWish: true,
          },
        ],
      },
    ],
    chatUrl: "https://open.kakao.com/o/s5E3AYof",
  },
};

// axios 요청을 모의하기 위해 axios-mock-adapter 초기화
const mock = new MockAdapter(axios);

// 기본 인스턴스에 mock adapter 설정
const scheduleId = 1; // 테스트할 때 사용할 예정인 ID
const apiUrl = `/api/v1/schedule/detail/${scheduleId}`;

// `/api/v1/schedule/detail/1`에 대한 모든 GET 요청을 모의함
// reply의 인자는 (status, data, headers)
mock.onGet(apiUrl).reply(200, SCHEDULE_DETAIL_MOCK);

describe("DetailMappingInfo", () => {
  it("API에서 일정 상세정보를 렌더링합니다", async () => {
    // 준비
    const setMarkers = jest.fn();
    const setActiveTripPlanId = jest.fn();

    // 실행
    const { getByText } = render(
      <DetailMappingInfo
        setMarkers={setMarkers}
        activeTripPlanId={null}
        setActiveTripPlanId={setActiveTripPlanId}
      />
    );

    // axios가 해결될 때까지 기다림
    await waitFor(() => {
      // 확인
      expect(
        getByText(SCHEDULE_DETAIL_MOCK.data.scheduleName)
      ).toBeInTheDocument();

      // 여기에 더 많은 기대를 추가하여 확인해야 합니다:
      // - setMarkers가 올바른 데이터로 호출되었는지
      // - 각 여행 계획과 세부 항목이 렌더링되었는지 등
      expect(setMarkers).toHaveBeenCalledWith(expect.any(Array));
    });
  });

  // 필요한 만큼 더 많은 테스트 케이스를 추가합니다...
});
