import { Tabs } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import classes from "./dress-code.module.css"
import Men from "./men"
import Women from "./women"

export const meta: MetaFunction = () => {
  return [
    { title: `Dress Code | Josh & Nathan's Wedding` },
    { name: "description", content: "Our High Fantasy Wedding" },
  ]
}

export default function Dress() {
  return (
    <div className={classes.container}>
      <h1>Dress Code</h1>
      <p>
        The dress code is mandatory. You MUST dress to this style. However,
        there is a lot of leniency. when it comes to what you actually need to
        wear.
        <br /> <br />
        <h2>Links</h2>
        <p>
          For accessories, clothing, foam weapons and more:{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://epicarmoury.com.au/"
          >
            Epic Armoury - (https://epicarmoury.com.au/)
          </a>
        </p>
        <p>
          Clothing and accessories:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://medievalclothing.com.au/mytholon/?p=1"
          >
            Medieval Clothing - (https://medievalclothing.com.au/mytholon/?p=1 )
          </a>
        </p>
        <br />
        Below is examples and links to buy some of the items we have found that
        we think would be perfect for the day.
      </p>
      <Tabs
        variant="unstyled"
        color="rgba(133, 65, 1, 1)"
        defaultValue="men"
        classNames={classes}
      >
        <Tabs.List grow>
          <Tabs.Tab value="men">Men</Tabs.Tab>
          <Tabs.Tab value="women">Women</Tabs.Tab>
        </Tabs.List>
        <Men />
        <Women />
      </Tabs>
    </div>
  )
}
