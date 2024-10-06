interface InputMessage {
  msg: string | undefined
}
const InputMessage = (props: InputMessage) => {
  const { msg } = props
  return <p className='text-xs text-red-500'>{msg}</p>
}
export default InputMessage
