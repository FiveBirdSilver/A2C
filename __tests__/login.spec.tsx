import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "../app/(route)/login/page";
import { useLogin } from "app/hooks/useLogin";
const queryClient = new QueryClient({});
const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe("로그인 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  // given - 로그인 화면이 그려진다.
  test("로그인 실패 시 에러 메시지 표시", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    // when - 로그인 화면이 실패한다.
    // React Hook 함수를 호출하는 코드를 인자로 넘기면 result 속성을 담고 있는 객체를 반환
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    const loginButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });

    // then - 에러메시지가 나타난다.
    await waitFor(() => expect(result.current.isError));
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
});
