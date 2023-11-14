// import { render, screen, act, waitFor } from "@testing-library/react";
// import MockAdapter from "axios-mock-adapter";
// import axios from "axios";
// import Notification from "@/components/detailmapping/Notification";

// const mock = new MockAdapter(axios);

// describe("<Notification />", () => {
//   jest.useFakeTimers();

//   afterEach(() => {
//     mock.reset();
//   });

//   it("should not display notification initially", () => {
//     render(<Notification />);
//     expect(screen.queryByText(/동행신청/)).toBeNull();
//   });

//   it("should display notification after successful API call", async () => {
//     mock.onGet("/api/v1/accompany").reply(200, {
//       status: 200,
//       message: "알림 성공",
//       data: {
//         notifications: [
//           {
//             joinId: 10,
//             scheduleName: "서울 맛집 탐방",
//             destinationName: "경복궁",
//             userName: "김소싹",
//           },
//         ],
//       },
//     });

//     render(<Notification />);
//     await act(async () => {
//       jest.runOnlyPendingTimers();
//     });

//     await waitFor(() =>
//       expect(
//         screen.getByText("김소싹 서울 맛집 탐방 - 경복궁 동행신청")
//       ).toBeInTheDocument()
//     );
//   });
// });
