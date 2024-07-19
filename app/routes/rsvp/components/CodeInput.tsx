import { Button, Input } from '@mantine/core'
import { Form, useLoaderData } from '@remix-run/react'
import classes from '../rsvp.module.css'
import { useState } from 'react'

export default function CodeInput() {
  const loaderData = useLoaderData()
  const [editing, setEditing] = useState(false)
  return (
    <Form className={classes.codeInputForm} onSubmit={() => setEditing(false)}>
      <Input.Wrapper>
        <Input.Label>Enter your RSVP Code</Input.Label>
        <Input.Description>You would have this above the QR Code</Input.Description>
        <Input
          onChange={() => setEditing(true)}
          name='code'
          placeholder='Example: EXPL'
          error={loaderData?.message && !editing}
        />
        <Input.Error>{editing ? '' : loaderData?.message}</Input.Error>
      </Input.Wrapper>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
