import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node'
import classes from './rsvp.module.css'
import { Link, Outlet, useLocation } from '@remix-run/react'
import { Container, Input } from '@mantine/core'
import headingImg from '~/assets/images/heading.png'

export const meta: MetaFunction = () => {
  return [{ title: `RSVP | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export const clientAction = async ({ request }: ActionFunctionArgs) => {
  return null
}

export default function Rsvp() {
  const location = useLocation()

  //make the pathname the heading by capitalzing the first letter of each word and replacing the hyphen with a space
  const heading = location.pathname
    .replace(/\//g, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.overlay}>
          <Link to='/'>Home</Link>
          <img src={headingImg} alt='Heading' />
          <h1>{heading}</h1>
        </div>
      </div>
      <Container size={'lg'} className={classes.content}>
        <form method='POST'>
          <label htmlFor='code'>Code:</label>
          <p>You will have received this with your invitation</p>
          <Input id='code' name='code' required />
        </form>
      </Container>
    </div>
  )
}
