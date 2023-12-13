// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ProfileModal from "./ProfileModal";

const mock = new MockAdapter(axios);

describe("ProfileModal Tests", () => {
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

  test("renders profile modal with mock data", async () => {
    render(
      <ProfileModal
        isOpen={true}
        onClose={() => {}}
        profileData={{
          imageUrl: "https://example.com/profile.jpg",
          nickname: "John Doe",
          userGender: "Male",
          userAgeRange: "20-30",
          userDescription: "Hello, I am John Doe.",
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Male")).toBeInTheDocument();
      expect(screen.getByText("20-30")).toBeInTheDocument();
      expect(screen.getByText("Hello, I am John Doe.")).toBeInTheDocument();
    });
  });
});
