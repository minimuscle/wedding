import { Button, Card, Input, Space, Table } from "@mantine/core"
import { useFetcher, useLoaderData } from "@remix-run/react"
import classes from "../rsvp.module.css"
import { User } from "~/utils/types"
import { useState } from "react"

export default function GuestForm() {
  const { data: user } = useLoaderData<{ data: User }>()
  const [editing, setEditing] = useState(false)
  const [intent, setIntent] = useState("addGuest")
  const [selectedGuest, setSelectedGuest] = useState("")
  const fetcher = useFetcher()

  function listGuests() {
    for (let index = 0; index < user?.guests; index++) {
      return (
        <Table.Tr>
          <Table.Td>
            <Input name="selectedAddGuest" />
          </Table.Td>
          <Table.Td>
            <Button type="submit">Save</Button>
          </Table.Td>
        </Table.Tr>
      )
    }
  }
  return (
    <fetcher.Form
      method="POST"
      className={classes.GuestForm}
      onSubmit={() => setEditing(false)}
    >
      <Space h={20} />
      <h1>Guests</h1>
      <p>
        You are allowed to bring {user.guests} guest{user.guests != 1 && "s"}
      </p>
      <Card shadow="xd" padding="md" radius="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Td>Guest Full Name</Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {user?.guestNames &&
              user?.guestNames.map((guest: string) => (
                <Table.Tr key={guest}>
                  <Table.Td>
                    {guest}
                    <input type="hidden" name="guest" value={guest} />
                    <input
                      type="hidden"
                      name="selectedGuest"
                      value={selectedGuest}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Button
                      color="red"
                      type="submit"
                      className={classes.remove}
                      onClick={() => {
                        setIntent("removeGuest")
                        setSelectedGuest(guest)
                      }}
                    >
                      Remove
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            {editing && listGuests()}
          </Table.Tbody>
        </Table>
        {!editing && (
          <Button
            color="green"
            className={
              (user.guestNames?.length || 0) >= user.guests
                ? classes.hidden
                : ""
            }
            onClick={() => setEditing(true)}
          >
            Add Guest
          </Button>
        )}
      </Card>
      <input type="hidden" name="_intent" value={intent} />
      <input type="hidden" name="id" value={user.id} />
    </fetcher.Form>
  )
}
