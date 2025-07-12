import { MagicalBookLoader } from '@/components/magical-book-loader'

export default function HomePage() {
  return (
    <main className='pt-8 pb-20 sm:p-20 flex flex-col items-center gap-4'>
      <MagicalBookLoader loadingText='Coming Soon...' />
    </main>
  )
}
