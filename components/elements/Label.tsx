import { Dispatch, SetStateAction } from 'react'

interface ILabel {
  text: string
  type: 'active' | 'inactive'
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const Label = (props: ILabel) => {
  const { text, type, value, setValue } = props

  const labelClass =
    type === 'active'
      ? 'text-xs px-4 py-2 bg-green-400 text-white rounded-full'
      : 'text-xs px-4 py-2 text-gray-400 border border-green-400 rounded-full'

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
