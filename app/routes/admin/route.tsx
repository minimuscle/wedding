import { getFirestore, collection, doc, getDocs, deleteDoc, setDoc, getDoc } from 'firebase/firestore'
import { ActionIcon, Card, Container, Group, Input, Menu, Space, Stack, Table } from '@mantine/core'
import classes from './admin.module.css'
import {
  ClientActionFunctionArgs,
  json,
  MetaFunction,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react'
import Button from '~/components/Button'
import { Button as MantineButton } from '@mantine/core'
import back_image from '~/assets/images/buttons/BACK.webp'
import back_image_hover from '~/assets/images/buttons/BACK_hover.webp'
import back_image_active from '~/assets/images/buttons/BACK_active.webp'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import UserModal from './UserModal'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { ModalType, People, User } from './types'
import { v4 as uuid } from 'uuid'
import { saveUser } from './action'

const firebaseConfig = {
  apiKey: 'AIzaSyCd3ZaWnhr70icnECDRw6CbMkP4V9yiGTU',
  authDomain: 'wedding-38b49.firebaseapp.com',
  databaseURL: 'https://wedding-38b49-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'wedding-38b49',
  storageBucket: 'wedding-38b49.appspot.com',
  messagingSenderId: '323230816869',
  appId: '1:323230816869:web:ef61a8d27b227512f8448c',
  measurementId: 'G-WC0LHCBKTM',
}

export function initializeAppCheck() {
  //check if firebase is already initialized and if it is, return it.
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  return app
}

export const meta: MetaFunction = () => {
  return [{ title: 'Admin Centre' }, { name: 'description', content: 'Admin Centre' }]
}

export async function clientLoader() {
  console.log('LOAD HAS BEEN CALLED')
  //setup the firebase app first
  const app = initializeAppCheck()
  const db = getFirestore(app)
  //get the collection of users
  const userSnapshot = await getDocs(collection(db, 'users'))

  //map the data to get the user data includeing the id
  const users = userSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  }) as User[]

  users.forEach(async (user) => {
    const subCollection = await getDocs(collection(db, 'users', user.id, 'users'))
    const users = subCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as People[]
    user.users = users
  })

  console.log(users)
  return users
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData()
  const _intent = formData.get('_intent') as string
  const app = initializeAppCheck()
  const db = getFirestore(app)

  if (_intent === 'delete') {
    const id = formData.get('id') as string
    //check if firebase is already initialized and if it is, use it
    const userRef = doc(db, 'users', id)
    await deleteDoc(userRef)
  }

  console.log('intent:', _intent)

  if (_intent === 'save') {
    await saveUser(formData, db)
  }

  if (_intent === 'addPerson') {
    const id = formData.get('id') as string
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const attending = formData.get('attending')

    await setDoc(doc(db, 'users', id, 'users', uuid()), {
      firstName,
      lastName,
      attending,
    })

    //return the user to the client
    const userRef = await getDoc(doc(db, 'users', id))
    console.log('userRef:', userRef.data())
    return json(userRef.data())
  }

  return null
}

export default function Admin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users = useLoaderData() as any[]
  const fetcher = useFetcher()
  const data = useActionData()
  //useDisclosure
  const [opened, { open, close }] = useDisclosure(false)
  const [type, setType] = useState<ModalType>('edit')
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [access, setAccess] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  return (
    <div className={classes.container}>
      <UserModal opened={opened} type={type} close={close} user={selectedUser} />
      <Button href='/' image={back_image} hover={back_image_hover} active={back_image_active} width='150px' />
      <Container size={'lg'} className={classes.content}>
        <h1>Admin Centre</h1>
        <Card shadow='xs' padding='xl'>
          {access ? (
            <>
              <Table striped withTableBorder stickyHeader highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>RSVP</Table.Th>
                    <Table.Th>Expected</Table.Th>
                    <Table.Th>Actual</Table.Th>
                    <Table.Th>Guests</Table.Th>
                    <Table.Th>Code</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {users.map((user) => {
                    return (
                      <Table.Tr key={user.id}>
                        <Table.Td
                          className={classes.name}
                          onClick={() => {
                            setType('view')
                            setSelectedUser(user)
                            open()
                          }}>
                          {user.name}
                        </Table.Td>
                        <Table.Td>
                          <div
                            className={`${classes.pill} ${
                              user.rsvp === 'true'
                                ? classes.positive
                                : user.rsvp === 'false'
                                ? classes.negative
                                : classes.awaiting
                            }`}>
                            {user.rsvp === 'true' ? 'Yes' : user.rsvp === 'false' ? 'No' : 'Awaiting'}
                          </div>
                        </Table.Td>
                        <Table.Td>{user.expected}</Table.Td>
                        <Table.Td>{user.actual}</Table.Td>
                        <Table.Td>{user.guests}</Table.Td>
                        <Table.Td>
                          <div className={`${classes.pill}`}>{user.code}</div>
                        </Table.Td>
                        <Table.Td className={classes.actions}>
                          <Menu shadow='md' position='top' withArrow>
                            <Menu.Target>
                              <ActionIcon color='gray' variant='subtle'>
                                <BsThreeDotsVertical />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<BsPencil />}
                                onClick={() => {
                                  setType('edit')
                                  setSelectedUser(user)
                                  open()
                                }}>
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                color='red'
                                leftSection={<BsTrash />}
                                onClick={() => fetcher.submit({ _intent: 'delete', id: user.id }, { method: 'POST' })}>
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Table.Td>
                      </Table.Tr>
                    )
                  })}
                </Table.Tbody>
              </Table>
              <Space h='lg' />
              <MantineButton
                w={200}
                size='compact-sm'
                onClick={() => {
                  setType('add')
                  setSelectedUser(undefined)
                  open()
                }}>
                Add User
              </MantineButton>
            </>
          ) : (
            <Stack>
              <Input.Wrapper label='Enter Password to access'>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  name='password'
                  type='password'
                  placeholder='Password'
                  onKeyDown={(e) => e.key === 'Enter' && password === 'beanjuice' && setAccess(true)}
                />
              </Input.Wrapper>
              <MantineButton type='submit' onClick={() => password === 'beanjuice' && setAccess(true)}>
                Submit
              </MantineButton>
            </Stack>
          )}
        </Card>
      </Container>
    </div>
  )
}
