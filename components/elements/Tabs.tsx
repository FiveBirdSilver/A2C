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
    <div className='bg-gray-50 rounded-md border border-gray-200 px-3 py-2 mb-4'>
      <nav aria-label='Tabs' className='flex space-x-2'>
        {items.map((name) => (
          <button
            key={name}
            onClick={() => handleOnClick(name)}
            className={classNames(
              value === name
                ? 'bg-green-400 text-white'
                : 'text-gray-500 hover:text-gray-700',
              'rounded text-xs px-2 py-1 font-medium'
            )}
          >
            {name}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Tabs
