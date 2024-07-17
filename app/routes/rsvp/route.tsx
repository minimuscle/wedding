import type { MetaFunction } from '@remix-run/node'
import classes from './rsvp.module.css'
import { ClientActionFunctionArgs, Link, redirect, useFetcher, useLocation } from '@remix-run/react'
import { Button, Checkbox, Container, Input, Space, Switch, Table } from '@mantine/core'
import headingImg from '~/assets/images/heading.png'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { initializeAppCheck } from '../admin/route'
import { People, User } from '../admin/types'
import { useRef } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: `RSVP | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const _intent = formData.get('_intent')

  const app = initializeAppCheck()
  const db = getFirestore(app)

  if (_intent === 'login') {
    const code = formData.get('code')
    //get code from the firestore
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('code', '==', code))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs[0].data()
    data.id = querySnapshot.docs[0].id

    console.log(data)

    //get subcollection of users
    const subCollection = await getDocs(collection(db, 'users', querySnapshot.docs[0].id, 'users'))
    const users = subCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    console.log(users)

    return { data, users }
  }

  if (_intent === 'rsvp') {
    //update the attending list.
    const id = formData.get('id')
    const rsvp = formData.get('rsvp')
    return redirect('/')
  }
}

interface RsvpProps {
  data: User
  users: People[]
}

export default function Rsvp() {
  const location = useLocation()
  const fetcher = useFetcher<RsvpProps>()
  const formRef = useRef<HTMLFormElement>(null)

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
          <fetcher.Form ref={formRef} onSubmit={(e) => submitForm(e)}>
            <h1>{fetcher.data.data.name} RSVP</h1>
            <h4>Will the group be attending?</h4>
            <Switch
              className={classes.checkbox}
              name='rsvp'
              size='xl'
              onLabel='Yes'
              offLabel='No'
              defaultChecked={fetcher.data.data.rsvp === 'true'}>
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
                {fetcher.data.users?.map((person) => (
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
          </fetcher.Form>
        ) : (
          <fetcher.Form method='POST' className={classes.codesection}>
            <input type='hidden' name='_intent' value='login' />
            <label htmlFor='code'>Code:</label>
            <p>You will have received this with your invitation</p>
            <Input className={classes.input} id='code' name='code' required />
            <Space h={10} />
            <Button fullWidth type='submit'>
              Submit
            </Button>
          </fetcher.Form>
        )}
      </Container>
    </div>
  )
}
