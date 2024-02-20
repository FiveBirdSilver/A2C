import { render } from "@testing-library/react";
import Login from "../app/login/page";

describe("로그인 테스트", () => {
  test("로그인 화면이 그려짐", () => {
    render(<Login />);
  });
});
