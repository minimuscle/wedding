import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import classes from './_index.module.css'
import { Space } from '@mantine/core'

export const meta: MetaFunction = () => {
  return [{ title: `Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Index() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.overlay}>
          <h2>Welcome to Josh and Nathan&apos;s</h2>
          <h1>High -Fantasy Wedding</h1>
          <Link to='/rsvp'>RSVP Here</Link>
        </div>
      </div>
      <div className={classes.content}>
        <h1>Quick Links</h1>
        <div className={classes.buttonGroup}>
          <Link to='/about' prefetch='intent'>
            About
          </Link>
          <Link to='/menu' prefetch='intent'>
            Menu
          </Link>
          <Link to='/location' prefetch='intent'>
            Location
          </Link>
          <Link to='/dress-code' prefetch='intent'>
            Dress Code
          </Link>
        </div>
        <Space h={100} />
        <h1>Part of THE Party?</h1>
        <p>This part is just for those in the wedding party</p>
        <div className={classes.buttonGroup}>
          <Link to='/about' prefetch='intent'>
            Party Members
          </Link>
          <Link to='/admin' prefetch='intent'>
            Admin Centre
          </Link>
        </div>
      </div>
    </div>
  )
}
