import { doc, updateDoc, type Firestore } from "firebase/firestore"

export async function save(formData: FormData, db: Firestore) {
  const fields: Record<string, string> = {}
  for (const pair of formData.entries()) {
    fields[pair[0]] = pair[1] as string
  }
  //if there is more fields than just id, then update rsvp to yes
  let rsvp = "false"
  if (Object.keys(fields).length > 1) rsvp = "true"

  

  const groupRef = doc(db, "users", fields.id)
  await updateDoc(groupRef, {
    rsvp: rsvp,
    actual: Object.keys(fields).length - 1,
  })

  //for each item thats not 'id', update the user subcollection
  for (const key in fields) {
    if (key !== "id") {
      const userRef = doc(db, "users", fields.id, "users", key)
      await updateDoc(userRef, {
        attending: "true",
      })
    }
  }

  return null
}

export async function addGuest(formData: FormData, db: Firestore) {
  const guestNames = formData.getAll("guest")
  const id = formData.get("id") as string
  const selectedAddGuest = formData.get("selectedAddGuest") as string
 
  //add the selected guest to the guestNames array
  guestNames.push(selectedAddGuest)
  await updateDoc(doc(db, "users", id), {
    guestNames: guestNames,
  })

  return null
}

export async function removeGuest(formData: FormData, db: Firestore) {
  const guestNames = formData.getAll("guest")
  const id = formData.get("id") as string
  const selectedGuest = formData.get("selectedGuest") as string
  console.log(guestNames)
  console.info(id)
  console.info(selectedGuest)
  //set the guest names to remove the selected guest
  const newGuestNames = guestNames.filter((guest) => guest !== selectedGuest)
  console.log(newGuestNames)

  await updateDoc(doc(db, "users", id), {
    guestNames: newGuestNames,
  })

  return null
}