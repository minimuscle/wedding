import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Josh and Nathan&apos;s Fantasy Wedding</h1>
      <Link to='/rsvp'>RSVP Here</Link>
      <Link to='/admin'>Admin Click Here</Link>
    </div>
  )
}
