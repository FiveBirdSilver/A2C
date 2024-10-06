import cn from 'classnames'
import React from 'react'

interface ButtonType {
  text: string
  variant: 'fill' | 'outline' | 'disabled'
  disabled?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button(data: ButtonType) {
  const { variant, text, disabled, onClick } = data

  const colorVariants = {
    default: '',
    fill: 'bg-green-400 text-white',
    outline: 'bg-transparent text-green-400 border-green-400 border',
    disabled: 'bg-gray-50 text-gray-400 border-gray-200 border',
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        colorVariants[variant],
        'w-full h-10 rounded cursor-pointer text-sm'
      )}
    >
      {text}
    </button>
  )
}
