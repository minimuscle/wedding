import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import classes from './_index.module.css'
import background from '~/assets/images/background.jpg'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.background} src={background} alt='background' />
        <div className={classes.overlay}>
          <h2>Welcome to Josh and Nathan&apos;s</h2>
          <h1>High- Fantasy Wedding</h1>
          <Link to='/rsvp'>RSVP Here</Link>
          <Link to='/admin'>Admin Click Here</Link>
        </div>
      </div>

      <div className={classes.content}>
        <h1>Buttons</h1>
      </div>
    </div>
  )
}
