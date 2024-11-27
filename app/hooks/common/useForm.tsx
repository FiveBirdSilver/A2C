// import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const useField = () => {
  const formSchema = yup.object({
    email: yup
      .string()
      .required('이메일은 필수 입력 정보입니다 입력해주세요')
      .email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('영문, 숫자, 특수문자 포함 8자리를 입력해주세요.')
      .min(8, '최소 8자 이상 가능합니다')
      .max(16, '최대 20자 까지만 가능합니다')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[,./;'<>?:"~!@#$%^&*()])[a-zA-Z0-9,./;'<>?:"~!@#$%^&*()]{8,20}$/,
        '영문, 숫자, 특수문자 포함 8자리를 입력해주세요.'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
    nickname: yup.string().required('닉네임은 필수 입력 정보입니다'),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  })

  return { register, handleSubmit, watch, errors }
}

export default useField
