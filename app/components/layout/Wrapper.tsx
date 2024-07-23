export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full pt-24 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl ">
      {children}
    </div>
  );
}
