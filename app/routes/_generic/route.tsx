import type { MetaFunction } from '@remix-run/node'
import classes from './generic.module.css'
import { Link, Outlet, useLocation } from '@remix-run/react'
import { Container } from '@mantine/core'
import headingImg from '~/assets/images/heading.png'

export const meta: MetaFunction = () => {
  return [{ title: `Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Generic() {
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
        <Outlet />
      </Container>
    </div>
  )
}
