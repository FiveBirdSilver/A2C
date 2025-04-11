import { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react'

interface ILabel {
  text: string
  type: 'active' | 'inactive'
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export interface LabelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  value: string
  setValue: Dispatch<SetStateAction<string>>
  variant?: 'active' | 'inactive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const Label = (props: ILabel) => {
  const { text, type, value, setValue } = props

  const labelClass =
    type === 'active'
      ? 'text-xs px-2 py-1 bg-green-400 text-white rounded-md'
      : 'text-xs px-2 py-1 bg-gray-50 text-gray-400 border border-gray-200 rounded-md'

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setValue(event.currentTarget.value)
  }

  return (
    <button className={labelClass} value={value} onClick={handleOnClick}>
      {text}
    </button>
  )
}

export default Label
