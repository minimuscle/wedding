import { Container } from "@mantine/core"
import classes from "./rsvp.module.css"
import Button from "~/components/Button"
import back_image from "~/assets/images/buttons/BACK.webp"
import back_image_hover from "~/assets/images/buttons/BACK_hover.webp"
import back_image_active from "~/assets/images/buttons/BACK_active.webp"
import home_image from "~/assets/images/buttons/HOME.webp"
import home_image_hover from "~/assets/images/buttons/HOME_hover.webp"
import home_image_active from "~/assets/images/buttons/HOME_active.webp"
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  MetaFunction,
  useLoaderData,
} from "@remix-run/react"
import { initializeAppCheck } from "../admin/route"
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"
import CodeInput from "./components/CodeInput"
import { People, User } from "../../utils/types"
import RsvpForm from "./components/RsvpForm"
import GuestForm from "./components/GuestForm"
import { addGuest, removeGuest, save } from "./action"

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url)
  const success = url.searchParams.get("success")
  const code = url.searchParams.get("code")

  if (success) {
    return { message: "RSVP Saved", status: 201 }
  }

  if (code) {
    //check if code is valid before returning the data
    const app = initializeAppCheck()
    const db = getFirestore(app)

    const usersRef = collection(db, "users")
    const q = query(usersRef, where("code", "==", code))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { message: "Invalid Code", status: 404 }
    } else {
      const data = querySnapshot.docs[0].data() as User
      data.id = querySnapshot.docs[0].id

      //get subcollection of users
      const subCollection = await getDocs(
        collection(db, "users", querySnapshot.docs[0].id, "users")
      )
      data.users = subCollection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as People[]

      return { data, status: 200 }
    }
  }
  return null
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData()
  const _intent = formData.get("_intent") as string

  const app = initializeAppCheck()
  const db = getFirestore(app)

  switch (_intent) {
    case "save":
      // eslint-disable-next-line no-case-declarations
      const res = await save(formData, db)
      return res
      break
    case "addGuest":
      await addGuest(formData, db)
      break
    case "removeGuest":
      await removeGuest(formData, db)
      break
  }

  return null
}

export const meta: MetaFunction = () => {
  return [
    { title: `RSVP | Josh & Nathan's Wedding` },
    { name: "description", content: "Our High Fantasy Wedding" },
  ]
}

interface LoaderDataProps {
  message?: string
  data?: User
  status?: number
}

export default function Rsvp() {
  const loaderData = useLoaderData<LoaderDataProps>()
  return (
    <div className={classes.container}>
      <Button
        href="/"
        image={back_image}
        hover={back_image_hover}
        active={back_image_active}
        width="150px"
      />
      <h1 className={classes.headingImg}>RSVP</h1>
      <Container size={"lg"} className={classes.content}>
        {loaderData?.status !== 200 && loaderData?.status !== 201 && (
          <CodeInput />
        )}
        {loaderData?.data && <RsvpForm />}
        {loaderData?.data && loaderData?.data.guests > 0 && <GuestForm />}
        {loaderData?.status == 201 && (
          <>
            <h1>Thank you for RSVPing</h1>
            <p>We hope to see you there!</p>
            <Button
              href="/"
              image={home_image}
              hover={home_image_hover}
              active={home_image_active}
              width="250px"
            />
          </>
        )}
      </Container>
    </div>
  )
}
