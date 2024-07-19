import type { MetaFunction } from '@remix-run/node'
import classes from './rsvp.module.css'
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  json,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { Button, Checkbox, Container, Input, Space, Switch, Table } from '@mantine/core'
import headingImg from '~/assets/images/heading.png'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { initializeAppCheck } from '../admin/route'
import { People, User } from '../admin/types'
import { useEffect, useRef, useState } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: `RSVP | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const _intent = formData.get('_intent')
  console.log('intent:', _intent)

  const app = initializeAppCheck()
  const db = getFirestore(app)

  if (_intent === 'rsvp') {
    //update the attending list.
    const id = formData.get('id')
    const rsvp = formData.get('rsvp')

    return json({ success: true })
  }
}

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  console.log('CODE:', code)

  const app = initializeAppCheck()
  const db = getFirestore(app)

  if (code) {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('code', '==', code))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs[0].data()
    data.id = querySnapshot.docs[0].id

    //get subcollection of users
    const subCollection = await getDocs(collection(db, 'users', querySnapshot.docs[0].id, 'users'))
    const users = subCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    return { data, users }
  }

  const success = url.searchParams.get('success')
  if (success) return { success: true }

  return null
}

interface RsvpProps {
  data: User
  users: People[]
}

type RsvpFetcher = RsvpProps | { success: boolean }

export default function Rsvp() {
  const location = useLocation()
  const data = useLoaderData<RsvpProps>()
  const fetcher = useFetcher<RsvpFetcher>()
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState('code')

  //make the pathname the heading by capitalzing the first letter of each word and replacing the hyphen with a space
  const heading = location.pathname
    .replace(/\//g, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  function submitForm(e: any) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const rsvp = formData.get('rsvp')

    //count number of 'on's' in the users form for the actual
    let actual = 0
    const users = []

    for (const pair of formData.entries()) {
      if (pair[0].includes('_checked') && pair[1] === 'on') {
        actual++
        users.push({ id: pair[0].replace('_checked', ''), attending: pair[1] === 'on' ? 'true' : 'false' })
      }
    }
    const form = {
      _intent: 'rsvp',
      id: fetcher.data!.data.id,
      rsvp: rsvp === 'on' ? 'true' : 'false',
      actual,
      users,
    }
    fetcher.submit(form, { method: 'POST' })
  }

  useEffect(() => {
    //If no loader data, show only the code form
    if (!data?.data) setForm('code')
    else if (data?.data && !fetcher?.data) setForm('form')
    else if (fetcher?.data?.success) setForm('success')
  }, [data.data, fetcher.data])

  function showForm() {
    console.log('FORM:', form)
    switch (form) {
      case 'success':
        return (
          <>
            <h1>Thank you for RSVPing</h1>
            <p>We appreciate it greatly!</p>
          </>
        )
      case 'form':
        return (
          <Form method='POST' ref={formRef} onSubmit={(e) => submitForm(e)}>
            <h1>{data?.data.name} RSVP</h1>
            <h4>Will the group be attending?</h4>
            <Switch
              className={classes.checkbox}
              name='rsvp'
              size='xl'
              onLabel='Yes'
              offLabel='No'
              defaultChecked={data.data.rsvp === 'true'}>
              Attending
            </Switch>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>First Name</Table.Th>
                  <Table.Th>Last Name</Table.Th>
                  <Table.Th>Attending</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.users?.map((person) => (
                  <Table.Tr key={person.id}>
                    <Table.Td>{person.firstName}</Table.Td>
                    <Table.Td>{person.lastName}</Table.Td>
                    <Table.Td>
                      <Checkbox name={`${person.id}_checked`} defaultChecked={String(person.attending) === 'true'} />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <input type='hidden' name='_intent' value='rsvp' />
            <Space h={20} />
            <Button fullWidth type='submit'>
              Save
            </Button>
          </Form>
        )
      case 'code':
      default:
        return (
          <Form className={classes.codesection}>
            <label htmlFor='code'>Code:</label>
            <p>You will have received this with your invitation</p>
            <Input className={classes.input} id='code' name='code' required />
            <Space h={10} />
            <Button fullWidth type='submit'>
              Submit
            </Button>
          </Form>
        )
    }
  }

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
        {showForm()}
      </Container>
    </div>
  )
}
