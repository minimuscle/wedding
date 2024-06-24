// import { ActionIcon, Button, Container, Menu, Modal, Space, Table, Text, Title, rem } from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'
// import type { MetaFunction } from '@remix-run/node'
// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
// import { useCollection } from 'react-firebase-hooks/firestore'
// import { BsPencil, BsThreeDotsVertical } from 'react-icons/bs'
// import { PiTrash } from 'react-icons/pi'
// import { ClientActionFunctionArgs, Link } from '@remix-run/react'
// import UserForm, { UserFormProps } from './components/UserForm'
// import { useState } from 'react'
// import classes from './admin.module.css'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCd3ZaWnhr70icnECDRw6CbMkP4V9yiGTU',
//   authDomain: 'wedding-38b49.firebaseapp.com',
//   databaseURL: 'https://wedding-38b49-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'wedding-38b49',
//   storageBucket: 'wedding-38b49.appspot.com',
//   messagingSenderId: '323230816869',
//   appId: '1:323230816869:web:ef61a8d27b227512f8448c',
//   measurementId: 'G-WC0LHCBKTM',
// }

// export const meta: MetaFunction = () => {
//   return [{ title: 'RSVP to Wedding' }, { name: 'description', content: 'RSVP To wedding' }]
// }

// export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
//   //remix clientAction
//   const formData = await request.formData()
//   const id = formData.get('id')
//   const firstName = formData.get('firstName')
//   const lastName = formData.get('lastName')
//   const email = formData.get('email')
//   const phone = formData.get('phone')
//   const address = formData.get('address')
//   const guests = formData.get('guests')
//   const guestNames = formData.get('guestNames')

//   //Get intention
//   const _intent = formData.get('_intent')
//   //Validate the form

//   //submit the form to the firestore
//   const app = initializeApp(firebaseConfig)
//   const db = getFirestore(app)
//   if (_intent === 'add') {
//     await setDoc(doc(db, 'users', id!.toString()), {
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       phone: phone,
//       address: address,
//       rsvp: false,
//       attending: false,
//       guests: guests,
//       guest_names: guestNames,
//       expected_attending: 0,
//       actual_attending: 0,
//     })
//   } else {
//     await setDoc(doc(db, 'users', id!.toString()), {
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       phone: phone,
//       address: address,
//       guests: guests,
//       guest_names: guestNames,
//     })
//   }
//   return null
// }

// export default function Admin() {
//   const app = initializeApp(firebaseConfig)
//   const [value, loading, error] = useCollection(collection(getFirestore(app), 'users'), {
//     snapshotListenOptions: { includeMetadataChanges: true },
//   })
//   const [isNewUserOpen, { toggle: toggleNewUser }] = useDisclosure()
//   const [isEditOpen, { toggle: toggleEditUser }] = useDisclosure()
//   const [user, setUser] = useState<UserFormProps | null>(null)

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const editUser = (id: string, userData: any) => {
//     setUser({
//       id: id,
//       firstName: userData.first_name,
//       lastName: userData.last_name,
//       email: userData.email,
//       phone: userData.phone,
//       address: userData.address,
//       guests: userData.guests,
//       guestNames: userData.guest_names,
//     })
//     toggleEditUser()
//   }

//   return (
//     <div className={classes.adminContainer}>
//       <Container>
//         <Link to='/'>Home</Link>
//         <h1>Admin Panel</h1>
//         <Title order={2}>RSVPs</Title>
//         <Text>List of guests and their details</Text>
//         <Space h='xl' />
//         <Button onClick={() => toggleNewUser()}>Add User</Button>
//         <Space h='xl' />
//         {error && <strong>Error: {JSON.stringify(error)}</strong>}
//         {loading && <span>Collection: Loading...</span>}
//         {value && (
//           // value.docs.map((doc) => (
//           //   <Fragment key={doc.id}>{JSON.stringify(doc.data())}, </Fragment>
//           // ))}

//           <>
//             <Table striped withTableBorder stickyHeader highlightOnHover>
//               <Table.Thead>
//                 <Table.Tr>
//                   <Table.Th>First Name</Table.Th>
//                   <Table.Th>Last Name</Table.Th>
//                   <Table.Th>RSVP</Table.Th>
//                   <Table.Th>Attending</Table.Th>
//                   <Table.Th>Guests</Table.Th>
//                   <Table.Th>Guest Names</Table.Th>
//                   <Table.Th>Expected Attending</Table.Th>
//                   <Table.Th>Actual Attending</Table.Th>
//                 </Table.Tr>
//               </Table.Thead>
//               <Table.Tbody>
//                 {value.docs.map((doc) => (
//                   <Table.Tr key={doc.id}>
//                     <Table.Td>{doc.data().first_name}</Table.Td>
//                     <Table.Td>{doc.data().last_name}</Table.Td>
//                     <Table.Td>{doc.data().rsvp ? 'Yes' : 'No'}</Table.Td>
//                     <Table.Td>{doc.data().rsvp ? (doc.data().attending ? 'Yes' : 'No') : '-'}</Table.Td>
//                     <Table.Td>{doc.data().guests}</Table.Td>
//                     <Table.Td>{doc.data().guests > 0 ? doc.data().guest_names : '-'}</Table.Td>
//                     <Table.Td>{doc.data().expected_attending}</Table.Td>
//                     <Table.Td>{doc.data().actual_attending}</Table.Td>
//                     <Table.Td>
//                       <Menu shadow='md' position='top' withArrow>
//                         <Menu.Target>
//                           <ActionIcon color='gray' variant='subtle'>
//                             <BsThreeDotsVertical />
//                           </ActionIcon>
//                         </Menu.Target>
//                         <Menu.Dropdown>
//                           <Menu.Item onClick={() => editUser(doc.id, doc.data())} leftSection={<BsPencil />}>
//                             Edit
//                           </Menu.Item>
//                           <Menu.Item color='red' leftSection={<PiTrash style={{ width: rem(16), height: rem(16) }} />}>
//                             Delete User
//                           </Menu.Item>
//                         </Menu.Dropdown>
//                       </Menu>
//                     </Table.Td>
//                   </Table.Tr>
//                 ))}
//               </Table.Tbody>
//             </Table>
//           </>
//         )}
//         <Modal opened={isEditOpen} onClose={toggleEditUser} size={'lg'} title='Add User'>
//           <UserForm
//             id={user?.id}
//             firstName={user?.firstName}
//             lastName={user?.lastName}
//             phone={user?.phone}
//             email={user?.email}
//             address={user?.address}
//             guests={user?.guests}
//             guestNames={user?.guestNames}
//             intent='edit'
//           />
//         </Modal>
//         <Modal opened={isNewUserOpen} onClose={toggleNewUser} size={'lg'} title='Add User'>
//           <UserForm />
//         </Modal>
//       </Container>
//     </div>
//   )
// }
