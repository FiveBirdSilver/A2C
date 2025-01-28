import { useCallback } from 'react'

interface ITabs {
  items: string[]
  value: string
  setState: (state: string) => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Tabs = (props: ITabs) => {
  const { items, value, setState } = props

  const handleOnClick = useCallback(
    (name: string) => {
      setState(name)
    },
    [setState]
  )

  return (
    <div className={'flex gap-3 py-4 px-6'}>
      {items.map((name) => (
        <button
          key={name}
          onClick={() => handleOnClick(name)}
          className={classNames(
            value === name
              ? 'bg-green-400 text-white border-none'
              : 'text-gray-500 hover:text-gray-700',
            'bg-gray-50 text-[0.785rem] text-gray-700 rounded-md border border-gray-200 px-2 py-1'
          )}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Tabs
