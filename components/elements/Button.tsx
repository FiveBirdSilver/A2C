import cn from 'classnames'
import React from 'react'

interface IButton {
  text: string
  variant: 'primary' | 'outline' | 'disabled'
  disabled?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: IButton) {
  const { variant, text, disabled, onClick } = props

  const colorVariants = {
    primary: 'bg-green-400 text-white hover:bg-green-500',
    outline:
      'bg-transparent text-green-400 border-gray-200 border hover:bg-gray-50',
    disabled: 'bg-gray-50 text-gray-400 border-gray-200 border',
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(colorVariants[variant], 'h-full rounded-md px-2 py-1')}
    >
      {text}
    </button>
  )
}
