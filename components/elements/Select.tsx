import { useState } from 'react'
import dynamic from 'next/dynamic'
import { StylesConfig } from 'react-select'
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'

import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'

const ReactSelect = dynamic(() => import('react-select'), { ssr: false })

interface Props {
  options: {
    value: string
    label: string
  }[]
  placeholder: string
  onChange: (value: unknown) => void
}

// 셀렉트 박스 스타일 커스텀
const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0.375rem',
    borderColor: '#dcdcdc',
    fontSize: '0.875rem',
    boxShadow: 'none !important',
    '&:hover': {
      boxShadow: 'none !important',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    fontSize: '0.875rem',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? '#bae0c2'
        : isFocused
          ? '#f0f9f2'
          : undefined,
    color: '#525252',
    cursor: isDisabled ? 'not-allowed' : 'default',

    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? '#bae0c2'
          : '#f0f9f2'
        : undefined,
    },
  }),
}

const Select = ({ options, placeholder, onChange }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // 모바일 환경에서의 모달 오픈
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className='flex flex-col md:space-y-2 bg-white text-gray-800'>
      {/* 모바일에서는 모달 방식 */}
      {isMobile ? (
        <>
          <button
            className='border p-2 rounded text-gray-600 text-sm flex px-3 justify-between items-center'
            onClick={(e) => handleOpenModal(e)}
          >
            <span>장소를 선택해주세요</span>
            <IoIosArrowDown />
          </button>

          {isModalOpen && (
            <div
              className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-end z-50'
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className='bg-white w-full h-3/4 overflow-y-auto rounded-t-xl'
                onClick={(e) => e.stopPropagation()}
              >
                {/*제목 및 닫기 버튼*/}
                <div
                  className={
                    'absolute w-full flex items-center p-4 bg-white rounded-t-xl'
                  }
                >
                  <p className={'w-full text-base'}>장소 추가</p>
                  <button
                    className='text-gray-500 text-3xl min-w-6'
                    onClick={() => setIsModalOpen(false)}
                  >
                    <IoIosClose />
                  </button>
                </div>

                {/*리스트 아이템*/}
                <div className={'mt-4 mx-2 flex flex-col space-y-2'}>
                  {options.map((opt, index) => (
                    <button
                      key={`${opt.value}-${index}`}
                      className='block w-full text-left p-2 text-sm'
                      onClick={() => {
                        onChange?.(opt.value)
                        setIsModalOpen(false)
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <ReactSelect
          options={options}
          placeholder={placeholder}
          onChange={onChange}
          styles={customStyles}
        />
      )}
    </div>
  )
}

export default Select
