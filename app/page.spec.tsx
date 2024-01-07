/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "./page";

describe("회원가입 테스트", () => {
  it("비밀번호와 비밀번호 확인이 일치하지 않으면 에러메시지가 표시된다", async () => {
    render(<Page />);

    // when :: 비밀번호와 비밀번호 확인이 일치하지 않음
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "worngpassword" } });

    // const email = screen.getByLabelText("이메일");
    // fireEvent.change(email, { target: { value: "a" } });
    // const input = screen.getByDisplayValue("a");
    // expect(input).toEqual("a");

    // then :: 에러메시지가 표시됌
    const errorMsg = await screen.findByTestId("error-message");
    expect(errorMsg).toBeInTheDocument();
  });
});
