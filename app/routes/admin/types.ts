export interface User {
  name: string
  rsvp: "true" | "false" | "awaiting"
  expected_attending: number
  actual_attending: number
  guests: number
  code: string
  id: string
  users?: People[]
}

export interface People {
  firstName: string
  lastName: string
  attending: boolean
  id: string
}

export type ModalType = 'add' | 'edit' | 'view'