import { Button, Card, Checkbox, Table } from "@mantine/core"
import { Form, useLoaderData } from "@remix-run/react"
import classes from "../rsvp.module.css"
import { User } from "~/utils/types"
import { People } from "~/utils/types"

export default function RsvpForm() {
  const { data: user } = useLoaderData<{ data: User }>()
  return (
    <Form method="POST" className={classes.RsvpForm}>
      <h1>RSVP for {user.name}</h1>
      <p>Who will be attending?</p>
      <Card shadow="xd" padding="md" radius="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Td>First Name</Table.Td>
              <Table.Td>Last Name</Table.Td>
              <Table.Td>Attending</Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {user?.users?.map((person: People) => (
              <Table.Tr key={person.id}>
                <Table.Td>{person.firstName}</Table.Td>
                <Table.Td>{person.lastName}</Table.Td>
                <Table.Td>
                  <Checkbox
                    color="green"
                    name={`${person.id}`}
                    defaultChecked={person.attending === "true"}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
      <input type="hidden" name="_intent" value="save" />
      <input type="hidden" name="id" value={user.id} />
      <Button type="submit">Save</Button>
    </Form>
  )
}
