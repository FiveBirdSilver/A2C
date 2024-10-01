"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "@/app/components/elements/Button";
import Input from "@/app/components/elements/Input";

interface RegisterType {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export default function Page() {
  // 회원가입 정보 유효성 검사 및 에러 메시지 출력
  const formSchema = yup.object({
    email: yup.string().required("이메일은 필수 입력 정보입니다 입력해주세요").email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자, 특수문자 포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(16, "최대 20자 까지만 가능합니다")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[,./;'<>?:"~!@#$%^&*()])[a-zA-Z0-9,./;'<>?:"~!@#$%^&*()]{8,20}$/,
        "영문, 숫자, 특수문자 포함 8자리를 입력해주세요."
      ),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
    nickname: yup.string().required("닉네임은 필수 입력 정보입니다"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterType>({ mode: "onChange", resolver: yupResolver(formSchema) });

  const registerUser = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-4 mb-8 min-w-80">
        <form className={"w-full flex flex-col gap-6"} onSubmit={handleSubmit(registerUser)}>
          <div className="flex flex-col gap-1">
            <Input label="이메일" id="email" placeholder="이메일을 입력해주세요" {...register("email")} />
            {errors.email && <p className="text-xs text-red-500">{errors.email?.message}</p>}
            <Button
              onClick={() => console.log("resgister")}
              variant={watch("email") ? "outline" : "disabled"}
              disabled={watch("email") !== ""}
              text="이메일 인증하기"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Input
              label="비밀번호"
              type="password"
              id="password"
              {...register("password")}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.password?.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              label="비밀번호"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.confirmPassword?.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <Input label="닉네임" id="nickname" {...register("nickname")} placeholder="닉네임을 입력해주세요" />
            {errors.email && <p className="text-xs text-red-500">{errors.nickname?.message}</p>}
          </div>
          <Button
            variant="fill"
            onClick={() => console.log("test")}
            // disabled={!(email !== "" && password !== "")}
            text="회원가입"
          />
        </form>
      </div>
    </div>
  );
}
