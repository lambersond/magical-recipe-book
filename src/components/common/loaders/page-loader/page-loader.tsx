export function PageLoader() {
  return (
    <div className='fixed flex items-center justify-center h-screen w-screen inset-0'>
      <div className='loader border border-secondary w-[25vw]' />
      <p className='absolute text-center text-sm lg:text-lg font-semibold text-text-secondary overflow-visible'>
        Loading...
      </p>
    </div>
  )
}
