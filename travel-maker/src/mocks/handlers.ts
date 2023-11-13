// // src/mocks/handlers.ts
// import { rest } from "msw";

// export const handlers = [
//   rest.post("/api/v1/accompany/guest", (req, res, ctx) => {
//     // 여기에서 요청 본문을 검사하고 필요한 조건을 기반으로 응답을 조정할 수 있습니다.
//     return res(ctx.json({ message: "동행 신청이 완료되었습니다." }));
//   }),
//   // 여기에 더 많은 핸들러를 추가할 수 있습니다.
// ];