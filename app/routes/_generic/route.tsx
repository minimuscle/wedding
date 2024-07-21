import type { MetaFunction } from "@remix-run/node"
import classes from "./generic.module.css"
import { Outlet, useLocation } from "@remix-run/react"
import { Container } from "@mantine/core"
import headingImg from "~/assets/images/heading.png"
import Button from "~/components/Button"

import back_image from "~/assets/images/buttons/BACK.webp"
import back_image_hover from "~/assets/images/buttons/BACK_hover.webp"
import back_image_active from "~/assets/images/buttons/BACK_active.webp"

export const meta: MetaFunction = () => {
  return [
    { title: `Josh & Nathan's Wedding` },
    { name: "description", content: "Our High Fantasy Wedding" },
  ]
}

export default function Generic() {
  const location = useLocation()

  //make the pathname the heading by capitalzing the first letter of each word and replacing the hyphen with a space
  const heading = location.pathname
    .replace(/\//g, "")
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className={classes.container}>
      <Button
        href="/"
        image={back_image}
        hover={back_image_hover}
        active={back_image_active}
        width="150px"
      />
      <h1 className={classes.headingImg}>{heading}</h1>
      <Container size={"lg"} className={classes.content}>
        <Outlet />
      </Container>
    </div>
  )
}
