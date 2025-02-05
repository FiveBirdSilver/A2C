import React, { forwardRef } from 'react'
import cn from 'classnames'

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  message?: string
  direction: 'row' | 'column'
  variant?: 'default' | 'primary' | 'warning'
  disabled?: boolean
  children?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputType>(
  (
    {
      label,
      id,
      type,
      direction,
      children,
      message,
      disabled,
      variant = 'default',
      placeholder,
      ...rest
    },
    ref
  ) => {
    const borderVariants = {
      default: '',
      primary: '',
      warning: 'border-red-300',
    }

    const directionVariants = {
      column: 'flex-col items-start',
      row: 'flex-row items-center',
    }

    return (
      <div
        className={cn(
          directionVariants[direction],
          'flex justify-between text-sm gap-1 relative w-full'
        )}
      >
        {label && (
          <label htmlFor={id} className='min-w-16 pl-[2px]'>
            {label}
          </label>
        )}
        <input
          id={id}
          data-cy={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete='off'
          className={cn(
            borderVariants[variant],
            'h-10 pl-3 border rounded-md outline-none min-w-64 focus-visible:outline-none placeholder:text-sm w-full'
          )}
          ref={ref}
          {...rest}
        />
        {children}
        <p className='text-xs text-red-500 pl-1'>{message}</p>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
