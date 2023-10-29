import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import JoinRequestButton from "@/components/detailmapping/JoinRequestButton";
global.alert = jest.fn();

const mock = new MockAdapter(axios);

describe("<JoinRequestButton />", () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should render button with text "동행신청"', () => {
    render(<JoinRequestButton tripPlanId={1} isVisible={true} />);
    const button = screen.getByText("동행신청");
    expect(button).toBeInTheDocument();
  });

  it('should change button text to "신청완료" after click', async () => {
    mock.onPost("/api/v1/accompany/guest").reply(200, {
      message: "동행 신청이 완료되었습니다.",
    });

    render(<JoinRequestButton tripPlanId={1} isVisible={true} />);
    const button = screen.getByText("동행신청");
    fireEvent.click(button);

    await waitFor(
      () => expect(screen.getByText("신청완료")).toBeInTheDocument(),
      { timeout: 5000 }
    );
  });
});
