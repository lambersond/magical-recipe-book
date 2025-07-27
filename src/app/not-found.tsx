import Link from 'next/link'
import { pageMain } from '@/utils/styles'

export default function NotFound() {
  return (
    <main className={`${pageMain} flex-1`}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href='/'
        className='py-2 px-4 bg-primary text-black rounded-xl mb-auto'
      >
        Return Home
      </Link>
    </main>
  )
}
