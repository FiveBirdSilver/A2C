'use client'

const Card = () => {
  return (
    <div className='text-gray-900 p-4 rounded-lg w-full space-y-4 '>
      <div className='flex justify-between'>
        <div className='bg-green-500 text-xs px-2 py-1 rounded-full inline-block text-white font-bold'>
          구해요
        </div>
        <p className='text-gray-400 text-sm'>2024-11-20T09:16:52.993Z</p>
      </div>
      <h2 className='text-xl font-bold'>
        더클 강남점 오후 8시 운동 알려드립니다!
      </h2>
      <p className='text-gray-400 text-sm'>커피 한잔으로 같이 운동해요.</p>
      <div className='flex items-center space-x-2'>
        <div className='bg-pink-600 w-6 h-6 flex items-center justify-center rounded-full'>
          <span className='text-white text-xs'>🧩</span>
        </div>
        <span className='text-gray-400'>fivebirdsilver</span>
      </div>

      <div className='flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg'>
        <span className='text-green-400 text-sm font-bold'>Seoul - 강남</span>
        <span className='text-green-400 text-sm font-bold'>5000원</span>
      </div>
    </div>
  )
}
export default Card
