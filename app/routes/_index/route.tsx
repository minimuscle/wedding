import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import classes from './_index.module.css'
import background from '~/assets/images/background.jpg'

export const meta: MetaFunction = () => {
  return [{ title: `Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Index() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.background} src={background} alt='background' />
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
        <Link to='/admin' prefetch='intent' className={classes.admin}>
          Admin? Click Here
        </Link>
      </div>
    </div>
  )
}
