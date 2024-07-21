import {
  collection,
  doc,
  getDocs,
  updateDoc,
  type Firestore,
} from "firebase/firestore"

export async function save(formData: FormData, db: Firestore) {
  const fields: Record<string, string> = {}
  for (const pair of formData.entries()) {
    fields[pair[0]] = pair[1] as string
  }
  //if there is more fields than just id, then update rsvp to yes
  let rsvp = "false"
  if (Object.keys(fields).length > 2) rsvp = "true"

  const groupRef = doc(db, "users", fields.id)
  await updateDoc(groupRef, {
    rsvp: rsvp,
    actual: Object.keys(fields).length - 2,
  })

  const subCollection = await getDocs(
    collection(db, "users", fields.id, "users")
  )
  const users = subCollection.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  users.forEach(async (user) => {
    //set each user to attending if they are in the form data or false if not
    const attending = fields[user.id] === "on" ? "true" : "false"
    const userRef = doc(db, "users", fields.id, "users", user.id)
    await updateDoc(userRef, {
      attending: attending,
    })
  })

  return null
}

export async function addGuest(formData: FormData, db: Firestore) {
  const guestNames = formData.getAll("guest")
  const id = formData.get("id") as string
  const selectedAddGuest = formData.get("selectedAddGuest") as string
  const actual = formData.get("actual") as string

  //add the selected guest to the guestNames array
  guestNames.push(selectedAddGuest)
  await updateDoc(doc(db, "users", id), {
    guestNames: guestNames,
    actual: parseInt(actual) + 1,
  })

  return null
}

export async function removeGuest(formData: FormData, db: Firestore) {
  const guestNames = formData.getAll("guest")
  const id = formData.get("id") as string
  const selectedGuest = formData.get("selectedGuest") as string
  //set the guest names to remove the selected guest
  const newGuestNames = guestNames.filter((guest) => guest !== selectedGuest)
  const actual = formData.get("actual") as string

  await updateDoc(doc(db, "users", id), {
    guestNames: newGuestNames,
    actual: parseInt(actual) - 1,
  })

  return null
}
