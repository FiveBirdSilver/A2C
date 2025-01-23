import Image from 'next/image'

export default function Header() {
  return (
    <div className='fixed top-0 w-full border-b border-gray-100 left-0 z-10'>
      <div className='flex items-center bg-white gap-3 px-4 mx-auto my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg font-PretendardM'>
        <Image src={'/logo.jpeg'} width={30} height={30} alt='logo' priority />
        <Image
          src={'/logo_text.jpeg'}
          width={50}
          height={15}
          alt='logo'
          priority
        />
      </div>
    </div>
  )
}
