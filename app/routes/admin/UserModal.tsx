import { Button, Checkbox, Flex, Group, Input, Modal, NumberInput, Space, Table } from '@mantine/core'
import { useFetcher } from '@remix-run/react'
import { ModalType, People, User } from './types'
import classes from './admin.module.css'

interface ModalProps {
  opened: boolean
  close: () => void
  type: ModalType
  user?: User
}

export default function UserModal({ opened, close, type, user }: ModalProps) {
  const fetcher = useFetcher()

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
            <Input name='phone' disabled={type === 'view'} type='tel' />
          </Input.Wrapper>
        </Group>
        <Input.Wrapper label='Postal Address' error=''>
          <Input name='address' disabled={type === 'view'} />
        </Input.Wrapper>
        <Group grow>
          <Input.Wrapper label='Expected Attending'>
            <NumberInput required min={0} disabled={type === 'view'} name='expected' />
          </Input.Wrapper>
          <Input.Wrapper label='Actual Attending'>
            <NumberInput required min={0} disabled={type === 'view'} name='actual' />
          </Input.Wrapper>
          <Input.Wrapper label='Guests Allowed'>
            <NumberInput required min={0} disabled={type === 'view'} name='guests' defaultValue={0} />
          </Input.Wrapper>
        </Group>
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
                    <Checkbox disabled={type === 'view'} name='attending' defaultChecked={person.attending} />
                  </Table.Td>
                </Table.Tr>
              )
            })}
          </Table.Tbody>
        </Table>
        <input type='hidden' name='_intent' value='save' />
        <input type='hidden' name='code' value={user?.code} />
        {!user && (
          <Button onClick={() => console.log('Add Person')} color={'green'}>
            Add Person
          </Button>
        )}
        <Button disabled={type === 'view'} type='submit'>
          Save
        </Button>
      </fetcher.Form>
    </Modal>
  )
}
