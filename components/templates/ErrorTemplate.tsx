import { MdError } from 'react-icons/md'

const ErrorTemplate = (props: { message: string }) => {
  return (
    <div className='h-full text-center flex flex-col gap-4 items-center justify-center'>
      <MdError className='text-red-500 text-5xl' />
      <h6 className='text-xl'>문제가 발생했습니다</h6>
      <p className='text-sm'>
        {/*현재 위치에서 주변 클라이밍 시설을 불러오지 못했습니다*/}
        {props.message}
        <br />
        잠시 후 다시 시도해 주세요
      </p>
    </div>
  )
}

export default ErrorTemplate
