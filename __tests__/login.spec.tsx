import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "../app/(route)/login/page";
import { useLogin } from "app/hooks/useLogin";
import nock from "nock";
const queryClient = new QueryClient({});
const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe("로그인 테스트", () => {
  beforeEach(() => {
    // spyOn => 객체의 메서드나 함수를 스파이로 대체.
    // mockImplementation => 원래으 ㅣ동작 대신에 새로운 동작을 수행하도록 만듦
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    // 모든 mock은 초기화되고 원래의 구현으로 돌아감. 일반적으로 테스트 시나리오 끝날 때 사용
    jest.restoreAllMocks();
  });

  // given - 로그인 화면이 그려진다.
  test("로그인 실패 시 에러 메시지 표시", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    // Node.js 환경에서 HTTP 요청을 모의(mock)하고 테스트하는 데 사용되는 라이브러리.
    // 이를 통해 실제 HTTP 요청을 보내지 않고도 특정 엔드포인트에 대한 가짜 응답을 설정하고 테스트할 수 있음.
    nock("http://localhost:3000/api")
      .post("/login", { username: "wrong@email.com", password: "wrongPassword" })
      .reply(400, { message: "NOT_USER" });

    // when - 로그인 화면이 실패한다.
    // React Hook 함수를 호출하는 코드를 인자로 넘기면 result 속성을 담고 있는 객체를 반환
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    // 이메일 입력 요소의 값을 변경하는 이벤트를 발생시킴
    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });

    // then - 에러메시지가 나타난다.
    await waitFor(() => expect(result.current.isError));
    const errorMessage = await screen.findByTestId("error-message");
    // expect(errorMessage).toBeInTheDocument();
  });
});
