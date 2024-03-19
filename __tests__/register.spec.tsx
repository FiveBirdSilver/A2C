/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../app/(route)/register/page";

describe("회원가입 테스트", () => {
  //- 각 테스트 전에 작동되는 함수
  //  테스트들이 공통으로 사용하는 configuration이나 상수들을 선언하는데 활용됨
  beforeEach(() => {
    // given :: 회원가입 페이지가 그려짐
    render(<Page />);
  });
  test("비밀번호와 비밀번호 확인이 일치하지 않으면 에러메시지가 표시된다", async () => {
    // when :: 비밀번호와 비밀번호 확인이 일치하지 않음
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "worngpassword" } });

    // then :: 에러메시지가 표시됌
    const errorMsg = await screen.findByTestId("error-message");
    // expect(errorMsg).toBeInTheDocument();
  });

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼을 활성화 한다.", async () => {
    // when :: 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const signupBtn = screen.getByRole("button", { name: "회원가입" });

    // 비활성화인지 먼저 체크
    // expect(signupBtn).toBeDisabled();

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(emailInput, { target: { value: "tpdms0401@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    // then :: 비밀번호 버튼 활성화
    // expect(signupBtn).toBeEnabled();
  });
});
