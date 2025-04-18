import React, { Dispatch, SetStateAction, ButtonHTMLAttributes } from 'react'

/**
 * 라벨 버튼 컴포넌트 Props
 * @param children - 버튼 내용
 * @param variant - 버튼의 스타일 타입 (active | inactive)
 * @param value - 현재 라벨의 값
 * @param setValue - 클릭 시 선택된 값을 갱신할 함수 (상위 상태 변경용)
 */

interface LabelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  variant: 'active' | 'inactive'
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export const Label = React.forwardRef<HTMLButtonElement, LabelProps>(
  ({ children, variant, value, setValue, className, ...props }, ref) => {
    // 타입에 따라 스타일 결정
    const baseLabelClass =
      variant === 'active'
        ? 'text-xs px-2 py-1 bg-green-400 text-white rounded-md'
        : 'text-xs px-2 py-1 bg-gray-50 text-gray-400 border border-gray-200 rounded-md'

    const finalClassName = `${baseLabelClass} ${className || ''}`.trim()

    // 클릭 시 현재 value를 상위 컴포넌트에 전달
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setValue(event.currentTarget.value)
    }

    return (
      <button
        ref={ref}
        value={value}
        className={finalClassName}
        onClick={handleOnClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Label.displayName = 'Label'

export default Label
