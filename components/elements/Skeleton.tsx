import { SkeletonText } from '@/components/ui/skeleton'

export const Skeleton = () => {
  return (
    <div className='p-4'>
      <SkeletonText noOfLines={4} gap='5' />
    </div>
  )
}
