const Skeleton = () => {
  const renderSkeleton = () => {
    return (
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-6 py-1'>
          <div className='h-4 bg-gray-100 rounded'></div>
          <div className='space-y-3'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-4 bg-gray-100 rounded col-span-2'></div>
              <div className='h-4 bg-gray-100 rounded col-span-1'></div>
            </div>
            <div className='h-4 bg-gray-100 rounded'></div>
          </div>
        </div>
      </div>
    )
  }

  return <div className='px-4 py-4 w-full mx-auto'>{renderSkeleton()}</div>
}

export default Skeleton
