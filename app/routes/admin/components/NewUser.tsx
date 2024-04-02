import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { Form } from 'react-router-dom'

const NewUser = () => {
  return (
    <Form method='POST'>
      <Stack>
        <Group w={'100%'} justify='space-between' grow>
          <TextInput
            name='firstName'
            label='First Name'
            placeholder='John'
            required
          />
          <TextInput
            name='lastName'
            label='Last Name'
            placeholder='Doe'
            required
          />
        </Group>
        <Group w={'100%'} justify='space-between' grow>
          <TextInput
            name='email'
            label='Email'
            placeholder='example@test.com'
            required
          />
          <TextInput
            name='phone'
            label='Phone Number'
            placeholder='0455 555 555'
            required
          />
        </Group>
        <TextInput
          name='address'
          label='Postal Address'
          placeholder='7 Macleod Way, Lynbrook, VIC 3975'
          required
        />

        <NumberInput
          name='guests'
          label='Guests / Plus Ones'
          description='Number of guests this person can bring'
          required
          placeholder='0'
          min={1}
          max={5}
        />
        <TextInput
          name='guestNames'
          label='Guest Names'
          placeholder='Jane, Fred, Frank'
          required
        />
        <Button type='submit'>Submit</Button>
      </Stack>
    </Form>
  )
}

export default NewUser
