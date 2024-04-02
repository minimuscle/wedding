import {
  ActionIcon,
  Button,
  Container,
  Group,
  Modal,
  NumberInput,
  Space,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  useCombobox,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { MetaFunction } from '@remix-run/node'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Form } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ClientActionFunctionArgs } from '@remix-run/react'
import NewUser from './components/NewUser'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

export const meta: MetaFunction = () => {
  return [
    { title: 'RSVP to Wedding' },
    { name: 'description', content: 'RSVP To wedding' },
  ]
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  //remix clientAction
  const formData = await request.formData()
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const address = formData.get('address')
  const guests = formData.get('guests')
  const guestNames = formData.get('guestNames')

  //Validate the form

  //submit the form to the firestore
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const docRef = addDoc(collection(db, 'users'), {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    address: address,
    rsvp: false,
    attending: false,
    guests: guests,
    guest_names: guestNames,
    expected_attending: 0,
    actual_attending: 0,
  })

  return null
}

export default function Admin() {
  const app = initializeApp(firebaseConfig)
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), 'users'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )
  const [isOpen, { toggle }] = useDisclosure()
  return (
    <Container>
      <Title order={1}>Admin Panel</Title>
      <Title order={2}>RSVPs</Title>
      <Text>List of guests and their details</Text>
      <Space h='xl' />
      <Button onClick={() => toggle()}>Add User</Button>
      <Space h='xl' />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        // value.docs.map((doc) => (
        //   <Fragment key={doc.id}>{JSON.stringify(doc.data())}, </Fragment>
        // ))}

        <>
          <Table striped withTableBorder stickyHeader highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>First Name</Table.Th>
                <Table.Th>Last Name</Table.Th>
                <Table.Th>RSVP</Table.Th>
                <Table.Th>Attending</Table.Th>
                <Table.Th>Guests</Table.Th>
                <Table.Th>Guest Names</Table.Th>
                <Table.Th>Expected Attending</Table.Th>
                <Table.Th>Actual Attending</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {value.docs.map((doc) => (
                <Table.Tr key={doc.id}>
                  <Table.Td>{doc.data().first_name}</Table.Td>
                  <Table.Td>{doc.data().last_name}</Table.Td>
                  <Table.Td>{doc.data().rsvp ? 'Yes' : 'No'}</Table.Td>
                  <Table.Td>
                    {doc.data().rsvp
                      ? doc.data().attending
                        ? 'Yes'
                        : 'No'
                      : '-'}
                  </Table.Td>
                  <Table.Td>{doc.data().guests}</Table.Td>
                  <Table.Td>
                    {doc.data().guests > 0 ? doc.data().guest_names : '-'}
                  </Table.Td>
                  <Table.Td>{doc.data().expected_attending}</Table.Td>
                  <Table.Td>{doc.data().actual_attending}</Table.Td>
                  <Table.Td>
                    <ActionIcon color='gray' variant='subtle'>
                      <BsThreeDotsVertical />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}

      <Modal opened={isOpen} onClose={toggle} size={'lg'} title='Add User'>
        <NewUser />
      </Modal>
    </Container>
  )
}
