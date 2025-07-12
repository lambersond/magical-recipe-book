export async function Masonry({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid gap-4 justify-items-start grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))]'>
      {children}
    </div>
  )
}
