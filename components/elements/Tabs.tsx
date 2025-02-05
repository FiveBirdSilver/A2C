'use client'

import { useRouter } from 'next/navigation'

interface ITabs {
  items: { label: string; value: string }[]
  checkedItem?: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Tabs = (props: ITabs) => {
  const { items, checkedItem } = props
  const router = useRouter()

  return (
    <div className={'flex gap-2 px-6 py-4 md:px-0 md:py-6'}>
      {items.map(({ label, value }) => (
        <button
          key={label}
          value={value}
          onClick={() => router.replace(`/board?type=${value}`)}
          className={classNames(
            checkedItem === value
              ? 'bg-green-400 text-white border-none'
              : 'text-gray-500 hover:text-gray-700',
            'bg-gray-50 text-[0.785rem] text-gray-700 rounded-md border border-gray-200 px-2 py-1'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
