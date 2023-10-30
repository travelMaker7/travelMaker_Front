import { DetailMappingInfo } from "@/components/detailmapping/DetailMappingInfo";
import { render, act, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { SetStateAction } from "react";

describe("<DetailMappingInfo />", () => {
  it("should render the fetched schedule details and set markers", async () => {
    const mockSetMarkers = jest.fn();
    const mock = new MockAdapter(axios);

    const mockResponseData = {
      status: 201,
      message: "일정 상세보기 조회 성공",
      data: {
        scheduleId: 1,
        markers: [
          { destinationY: "37.5797", destinationX: "126.977" },
          { destinationY: "37.3797", destinationX: "126.577" },
        ],
        scheduleName: "서울 맛집 탐방",
        startDate: "2023-11-21",
        finishDate: "2023-11-22",
        tripPlans: [
          {
            scheduledDate: "10월 20일",
            details: [
              {
                tripPlanId: 1,
                destinationName: "경복궁",
                wishCnt: 6,
                wishJoin: false,
                address: "서울특별시 종로구 사직로 161",
                arriveTime: "16:00",
                leaveTime: "18:00",
              },
              {
                tripPlanId: 2,
                destinationName: "경화루",
                wishCnt: 6,
                wishJoin: false,
                address: "서울특별시 종로구 사직로 200",
                arriveTime: "19:00",
                leaveTime: "20:00",
              },
            ],
          },
        ],
        chatUrl: "https://open.kakao.com/o/s5E3AYof",
      },
    };

    mock.onGet("/api/v1/schedule/detail/1").reply(200, mockResponseData);

    await act(async () => {
      render(
        <DetailMappingInfo
          setMarkers={mockSetMarkers}
          activeTripPlanId={null}
          setActiveTripPlanId={function (
            value: SetStateAction<number | null>
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      );
    });

    await waitFor(() => {
      expect(mockSetMarkers).toHaveBeenCalledWith([
        { destinationX: "126.977", destinationY: "37.5797" },
        { destinationX: "126.577", destinationY: "37.3797" },
      ]);
    });
  });
});
