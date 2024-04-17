import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export interface UserFormProps {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  guests?: 0 | 1 | 2 | 3 | 4 | 5
  guestNames?: string
  intent?: 'add' | 'edit'
}

const UserForm = ({
  id = uuidv4(),
  firstName,
  lastName,
  email,
  phone,
  address,
  guests,
  guestNames,
  intent = 'add',
}: UserFormProps) => {
  const [guestsNum, setGuests] = useState(guests || 0)
  return (
    <Form method='POST'>
      <Stack>
        <Group w={'100%'} justify='space-between' grow>
          <TextInput name='firstName' label='First Name' placeholder='John' defaultValue={firstName} required />
          <TextInput name='lastName' label='Last Name' placeholder='Doe' defaultValue={lastName} required />
        </Group>
        <Group w={'100%'} justify='space-between' grow>
          <TextInput name='email' label='Email' placeholder='example@test.com' defaultValue={email} required />
          <TextInput name='phone' label='Phone Number' placeholder='0455 555 555' defaultValue={phone} required />
        </Group>
        <TextInput
          name='address'
          label='Postal Address'
          placeholder='7 Macleod Way, Lynbrook, VIC 3975'
          defaultValue={address}
          required
        />

        <NumberInput
          name='guests'
          label='Guests / Plus Ones'
          description='Number of guests this person can bring'
          required
          defaultValue={guestsNum}
          onChange={(value) => setGuests(parseInt(value.toString()))}
          min={0}
          max={5}
        />
        <TextInput
          name='guestNames'
          label='Guest Names'
          placeholder='Jane, Fred, Frank'
          defaultValue={guestNames}
          required={guestsNum > 0}
        />
        <input type='hidden' name='_intent' value={intent} />
        <input type='hidden' name='id' value={id} />
        <Button type='submit'>Submit</Button>
      </Stack>
    </Form>
  )
}

export default UserForm
