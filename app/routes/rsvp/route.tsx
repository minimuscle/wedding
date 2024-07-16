import type { MetaFunction } from '@remix-run/node'
import classes from './rsvp.module.css'
import { ClientActionFunctionArgs, Link, Outlet, useActionData, useFetcher, useLocation } from '@remix-run/react'
import { Container, Input } from '@mantine/core'
import headingImg from '~/assets/images/heading.png'
import { collection, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { initializeAppCheck } from '../admin/route'

export const meta: MetaFunction = () => {
  return [{ title: `RSVP | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const code = formData.get('code')

  const app = initializeAppCheck()
  const db = getFirestore(app)
  //get code from the firestore
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('code', '==', code))
  const querySnapshot = await getDocs(q)
  console.log('querySnapshot: ', querySnapshot.docs[0].data() || null)
  const data = querySnapshot.docs[0].data()
  return data
}

export default function Rsvp() {
  const location = useLocation()
  const fetcher = useFetcher()

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
        {fetcher.data ? (
          <></>
        ) : (
          <fetcher.Form method='POST'>
            <label htmlFor='code'>Code:</label>
            <p>You will have received this with your invitation</p>
            <Input id='code' name='code' required />
          </fetcher.Form>
        )}
      </Container>
    </div>
  )
}
