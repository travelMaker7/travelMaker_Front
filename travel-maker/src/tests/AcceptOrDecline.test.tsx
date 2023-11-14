// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import MockAdapter from "axios-mock-adapter";
// import axios from "axios";
// import AcceptOrDecline from "@/components/detailmapping/AcceptOrDecline";
// global.alert = jest.fn();

// const mock = new MockAdapter(axios);

// describe("<AcceptOrDecline />", () => {
//   beforeEach(() => {
//     mock.reset();
//     mock.onPost("/api/v1/accompany/host").reply(201, { message: "성공" });
//   });

//   it("should render accept and decline buttons", () => {
//     render(<AcceptOrDecline joinId={1} />);
//     expect(screen.getByText("수락")).toBeInTheDocument();
//     expect(screen.getByText("거절")).toBeInTheDocument();
//   });

//   it("should send post request with status on button click", async () => {
//     render(<AcceptOrDecline joinId={1} />);

//     fireEvent.click(screen.getByText("수락"));
//     await waitFor(() => expect(mock.history.post.length).toBe(1));
//     expect(mock.history.post[0].data).toEqual(
//       JSON.stringify({
//         joinId: 1,
//         joinStatus: "신청수락",
//       })
//     );

//     mock.resetHistory();

//     fireEvent.click(screen.getByText("거절"));
//     await waitFor(() => expect(mock.history.post.length).toBe(1));
//     expect(mock.history.post[0].data).toEqual(
//       JSON.stringify({
//         joinId: 1,
//         joinStatus: "신청거절",
//       })
//     );
//   });
// });
