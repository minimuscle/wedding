export interface User {
  name: string
  rsvp: "true" | "false" | "awaiting"
  expected: number
  actual: number
  guests: number
  code: string
  id: string
  phone?: string
  address?: string
  users?: People[]
  guestNames?: string[]
}

export interface People {
  firstName: string
  lastName: string
  attending: string
  id: string
}

export type ModalType = 'add' | 'edit' | 'view'