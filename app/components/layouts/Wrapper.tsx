import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-3xl mx-auto h-full'>
      <Header />
      <div className='h-full px-6 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
      <Footer />
    </div>
  )
}
