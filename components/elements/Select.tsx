import { MouseEvent, Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import { StylesConfig } from 'react-select'
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'
import { motion } from 'framer-motion'

import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'

const ReactSelect = dynamic(() => import('react-select'), { ssr: false })

interface IOptions {
  value: string
  label: string
}

interface ISelect {
  options: IOptions[]
  placeholder: string
  setState: Dispatch<SetStateAction<IOptions | undefined>>
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

const Select = ({ options, placeholder, setState }: ISelect) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [mobileSelectItem, setMobileSelectItem] = useState<string>('')

  // 모바일 환경에서의 모달 오픈
  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
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
            <span>
              {mobileSelectItem ? mobileSelectItem : '장소를 선택해주세요'}
            </span>
            <IoIosArrowDown />
          </button>

          {/*모달 열렸을 때*/}
          {isModalOpen && (
            <div
              className='fixed inset-0 bg-gray-900 z-[9999] bg-opacity-50 flex justify-center items-end'
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className='bg-white w-full h-3/4 rounded-t-2xl flex flex-col'
                initial={{ y: '100%' }} // 시작 위치 (화면 아래에서 시작)
                animate={{ y: 0 }} // 최종 위치 (화면 아래에서 올라옴)
                exit={{ y: '100%' }} // 닫힐 때 다시 아래로 내려감
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 200,
                  duration: 0.3,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 제목 및 닫기 버튼 */}
                <div className='w-full flex items-center p-4 bg-white rounded-t-2xl'>
                  <p className='w-full text-base'>장소 추가</p>
                  <button
                    className='text-gray-500 text-3xl min-w-6'
                    onClick={() => setIsModalOpen(false)}
                  >
                    <IoIosClose />
                  </button>
                </div>

                {/* 리스트 아이템 */}
                <div className='mt-4 mx-2 flex-1 overflow-y-auto scrollbar-hide space-y-2'>
                  {options.map((opt, index) => (
                    <button
                      key={`${opt.value}-${index}`}
                      className='block w-full text-left p-2 text-sm'
                      onClick={(e) => {
                        e.preventDefault()
                        setState(opt)
                        setMobileSelectItem(opt.label)
                        setIsModalOpen(false)
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </>
      ) : (
        // 데스크톱일 때
        <ReactSelect
          options={options}
          placeholder={placeholder}
          onChange={(newValue) => {
            if (!newValue) return
            setState(newValue as IOptions)
          }}
          styles={customStyles}
        />
      )}
    </div>
  )
}

export default Select
