import classes from "./dress-code.module.css"
import women1 from "~/assets/images/dresscode/women1.jpg"
import women2 from "~/assets/images/dresscode/women2.jpg"
import women3 from "~/assets/images/dresscode/women3.jpg"
import women4 from "~/assets/images/dresscode/women4.jpg"
import women5 from "~/assets/images/dresscode/women5.webp"
import women6 from "~/assets/images/dresscode/women6.jpg"
import women7 from "~/assets/images/dresscode/women7.jpg"
import women8 from "~/assets/images/dresscode/women8.jpg"
import women9 from "~/assets/images/dresscode/women9.jpg"
import women10 from "~/assets/images/dresscode/women10.jpg"
import women11 from "~/assets/images/dresscode/women11.jpg"
import women12 from "~/assets/images/dresscode/women12.png"
import women13 from "~/assets/images/dresscode/women13.jpg"
import women14 from "~/assets/images/dresscode/women14.jpg"
import women15 from "~/assets/images/dresscode/women15.webp"
import women16 from "~/assets/images/dresscode/women16.webp"
import women17 from "~/assets/images/dresscode/women17.jpg"
import women18 from "~/assets/images/dresscode/women18.jpg"
import women19 from "~/assets/images/dresscode/women19.jpg"
import women20 from "~/assets/images/dresscode/women20.jpg"

import { Tabs } from "@mantine/core"

export default function Women() {
  return (
    <Tabs.Panel value="women">
      <h1>Styles and Ideas for Women</h1>
      <p>
        Woman&apos;s medieval attire come in many different ranges of styles.
        Layering in these styles is key, as more if often better, more
        especially on the lower half. Belts, capes, and jewellery all are great
        options to add a little extra to make everything tie together.
        <br />
      </p>
      <div className={classes.imageGroup}>
        <img src={women1} alt="female costume 1" />
        <img src={women2} alt="female costume 2" />
        <img src={women3} alt="female costume 3" />
        <img src={women4} alt="female costume 4" />
        <img src={women5} alt="female costume" />
        <img src={women6} alt="female costume" />
        <img src={women7} alt="female costume" />
      </div>
      <p>
        These are various styles, usually dresses in this case, but not always!
        Warriors are common in high-fantasy and not just men. Like Galadrial in
        The Lord of the Rings, you can be powerful in a dress as well as armour.
        <br /> <br />
        The important thing is layers and natural colour. A great start is a
        white underdress or shirt, with a colourful overdress or corset. Of
        course, if you would rather go the warrior route, here are some cool
        ideas, the last one is one of my favourites for simple designs:
      </p>
      <div className={classes.imageGroup}>
        <img src={women8} alt="female costume" />
        <img src={women9} alt="female costume" />
        <img src={women10} alt="female costume" />
        <img src={women11} alt="female costume" />
      </div>
      <p>
        And while any of these styles can look great for anyone, sometimes its
        hard to imagine yourself, especially if you aren&apos;t that hourglass
        figure that models often have. So here are some larger inspirations:
      </p>
      <div className={classes.imageGroup}>
        <img src={women12} alt="female costume" />
        <img src={women13} alt="female costume" />
        <img src={women14} alt="female costume" />
        <img src={women15} alt="female costume" />
        <img src={women16} alt="female costume" />
        <img src={women17} alt="female costume" />
      </div>
      <p>
        And of course, we can&apos;t forget the elves. They are a common style
        in high-fantasy, and for good reason. They are elegant and beautiful,
        and can be a great style for anyone. Here are some examples:
      </p>
      <div className={classes.imageGroup}>
        <img src={women18} alt="female costume" />
        <img src={women19} alt="female costume" />
        <img src={women20} alt="female costume" />
      </div>
    </Tabs.Panel>
  )
}
