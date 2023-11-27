import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ProfileTestPage from "./ProfileTestPage";
import { act } from "react-dom/test-utils";

const mock = new MockAdapter(axios);

describe("ProfileTestPage Tests", () => {
  beforeAll(() => {
    mock.onGet("/api/v1/mypage/profile/123").reply(200, {
      imageUrl: "https://example.com/profile.jpg",
      nickname: "John Doe",
      userGender: "Male",
      userAgeRange: "20-30",
      userDescription: "Hello, I am John Doe.",
    });
  });

  afterEach(() => {
    mock.reset();
  });

  test("opens modal on button click and renders profile data", async () => {
    await act(async () => {
      render(<ProfileTestPage userId="123" />);
    });
    const openModalButton = screen.getByText("프로필 모달 열기");
    fireEvent.click(openModalButton);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
