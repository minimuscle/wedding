import { collection, doc, Firestore, getDocs, setDoc } from "firebase/firestore"

export async function saveUser(formData: FormData, db: Firestore) {
  //save the user data - if ID is present, update, else create
    const id = formData.get('id') as string
    const name = formData.get('name')
    const phone = formData.get('phone')
    const address = formData.get('address')
    const expected = formData.get('expected')
    const actual = formData.get('actual')
    const guests = formData.get('guests')
    let code = formData.get('code')

    if (!code) {
      const userSnapshot = await getDocs(collection(db, 'users'))
      const codes = userSnapshot.docs.map((doc) => doc.data().code) as string[]
      code = generateCode(codes) as string
    }

    await setDoc(doc(db, 'users', id), {
      name,
      phone,
      address,
      expected,
      actual,
      guests,
      code,
      rsvp: 'awaiting',
    })
}

function generateCode(codes: string[]) {
  const code = Math.random().toString(36).substring(2, 6).toUpperCase()
  if (codes.includes(code)) {
    generateCode(codes)
  } else {
    return code
  }
}