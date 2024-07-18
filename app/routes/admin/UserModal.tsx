import { Button, Checkbox, Flex, Group, Input, Modal, NumberInput, Space, Table } from '@mantine/core'
import { useFetcher } from '@remix-run/react'
import { ModalType, People, User } from './types'
import classes from './admin.module.css'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

interface ModalProps {
  opened: boolean
  close: () => void
  type: ModalType
  user?: User
}

interface NewUserProps {
  firstName?: string
  lastName?: string
  _intent?: string
  id?: string
}

export default function UserModal({ opened, close, type, user }: ModalProps) {
  const fetcher = useFetcher()
  const addPersonFetcher = useFetcher()
  const [newUserAdding, setNewUserAdding] = useState(false)
  const [newUser, setNewUser] = useState<NewUserProps | null>(null)
  let id = user?.id || uuid()

  return (
    <Modal
      size={'xl'}
      opened={opened}
      onClose={close}
      title={type === 'add' ? 'Add New Group' : type === 'edit' ? `Edit ${user?.name}` : user?.name}>
      <h3>Information</h3>
      <fetcher.Form method='POST' className={classes.form} onSubmit={close}>
        <Group grow>
          <Input.Wrapper label='Group Name' error=''>
            <Input required name='name' disabled={type === 'view'} defaultValue={user?.name} />
          </Input.Wrapper>
          <Input.Wrapper label='Phone' error=''>
            <Input name='phone' disabled={type === 'view'} type='tel' defaultValue={user?.phone} />
          </Input.Wrapper>
        </Group>
        <Input.Wrapper label='Postal Address' error=''>
          <Input name='address' disabled={type === 'view'} defaultValue={user?.address} />
        </Input.Wrapper>
        <Group grow>
          <Input.Wrapper label='Expected Attending'>
            <NumberInput required min={0} disabled={type === 'view'} name='expected' defaultValue={user?.expected} />
          </Input.Wrapper>
          <Input.Wrapper label='Actual Attending'>
            <NumberInput required min={0} disabled name='actual' defaultValue={user?.actual} />
          </Input.Wrapper>
          <Input.Wrapper label='Guests Allowed'>
            <NumberInput required min={0} disabled={type === 'view'} name='guests' defaultValue={user?.guests || 0} />
          </Input.Wrapper>
        </Group>
        {type !== 'add' && (
          <>
            <h3>People</h3>
            <Table striped withTableBorder stickyHeader highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>First Name</Table.Th>
                  <Table.Th>Last Name</Table.Th>
                  <Table.Th>Attending</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {user?.users?.map((person: People) => {
                  return (
                    <Table.Tr key={person.id}>
                      <Table.Td>{person.firstName}</Table.Td>
                      <Table.Td>{person.lastName}</Table.Td>
                      <Table.Td>
                        <Checkbox
                          disabled={type === 'view'}
                          name='attending'
                          defaultChecked={String(person.attending) === 'true'}
                        />
                      </Table.Td>
                    </Table.Tr>
                  )
                })}
                {newUserAdding && (
                  <Table.Tr>
                    <Table.Td>
                      <Input
                        name='firstName'
                        onChange={(e) => setNewUser({ firstName: e.target.value, lastName: newUser?.lastName || '' })}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Input
                        name='lastName'
                        onChange={(e) => setNewUser({ firstName: newUser?.firstName || '', lastName: e.target.value })}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Button
                        type='submit'
                        onClick={() => {
                          const submitUser = {
                            ...newUser,
                            attending: false,
                            _intent: 'addPerson',
                            id: id,
                          }
                          setNewUserAdding(false)
                          addPersonFetcher.submit(submitUser, { method: 'POST' })
                          id = uuid()
                          user?.users?.push(submitUser)
                        }}>
                        Save
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>

            <Button
              lightHidden={type === 'view'}
              onClick={() => {
                setNewUserAdding(true)
              }}
              color={'green'}>
              Add Person
            </Button>
          </>
        )}
        <input type='hidden' name='_intent' value='save' />
        <input type='hidden' name='id' value={id} />
        <input type='hidden' name='code' value={user?.code} />
        <Button disabled={type === 'view'} type='submit'>
          Save
        </Button>
      </fetcher.Form>
    </Modal>
  )
}
