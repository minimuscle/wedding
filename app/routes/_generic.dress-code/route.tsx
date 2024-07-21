import { Tabs } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import classes from "./dress-code.module.css"

import men1 from "~/assets/images/dresscode/men1.jpg"
import men2 from "~/assets/images/dresscode/men2.jpg"
import men3 from "~/assets/images/dresscode/men3.jpg"
import men4 from "~/assets/images/dresscode/men4.jpg"
import men5 from "~/assets/images/dresscode/men5.jpg"
import men6 from "~/assets/images/dresscode/men6.jpg"

import women1 from "~/assets/images/dresscode/women1.jpg"
import women2 from "~/assets/images/dresscode/women2.jpg"
import women3 from "~/assets/images/dresscode/women3.jpg"
import women4 from "~/assets/images/dresscode/women4.jpg"

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

        <Tabs.Panel value="men">
          <h1>Styles and Ideas for Men</h1>
          <p>
            Embrace the rich and colourful style of the medieval period at our
            Fantasy themed wedding. Its all about{" "}
            <strong>layers and natural colours,</strong> with earthy tones like
            browns, greens, and deep reds.
            <br />
            <br />
            Accessorize all you like, whether it be with belts, pouches, swords,
            or jewellery. All we ask is you come as <strong>YOU...</strong> as
            much as we&apos;d love 10 Gandalfs, we want to party with our close
            friends and family, not a cosplay party. You might still be a wizard
            - but you are still you.
          </p>
          <div className={classes.imageGroup}>
            <img src={men1} alt="male costume 1" />
            <img src={men2} alt="male costume 2" />
            <img src={men3} alt="male costume 3" />
          </div>
          <p>
            Notice how these guys aren&apos;t stereotypes for a knight. Mens
            medieval outfits feature accessories like belts and more clothing
            options with leather, like boots and jackets. Arm bracers, and
            armour pieces work well to tie the whole outfit together, especially
            with more simplistic outfits.
          </p>
          <div className={classes.imageGroup}>
            <img src={men4} alt="male costume 4" />
            <img src={men5} alt="male costume 5" />
            <img src={men6} alt="male costume 6" />
          </div>
          <p>
            Check out this video by Living Anachronism for some small cheap
            changes:{" "}
            <a
              href="https://youtu.be/bwxiuBkpdAw"
              target="_blank"
              rel="noreferrer"
            >
              https://youtu.be/bwxiuBkpdAw
            </a>
          </p>
          <p>
            Another great one and a personal favourite channel: Skill tree -{" "}
            <a
              href="https://www.youtube.com/watch?v=d1V-1-RCo5s&t=612s"
              target="_blank"
              rel="noreferrer"
            >
              https://youtu.be/d1V-1-RCo5s
            </a>
          </p>
          <p>
            Here is another general pinterest thread to help:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.pinterest.com.au/search/pins/?q=Renaissance%20festival&rs=srs&b_id=BO_AViCSsZllAAAAAAAAAAAKCy3wt2nsTePg303V-CXGebH4hqjqGGC_arivIs0m5bxrjDgo-hNkVh6PmhsG9Cs&source_id=IgHjuNTJ"
            >
              Pinterest Link
            </a>
          </p>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
