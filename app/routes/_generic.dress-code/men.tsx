import classes from "./dress-code.module.css"
import men1 from "~/assets/images/dresscode/men1.jpg"
import men2 from "~/assets/images/dresscode/men2.jpg"
import men3 from "~/assets/images/dresscode/men3.jpg"
import men4 from "~/assets/images/dresscode/men4.jpg"
import men5 from "~/assets/images/dresscode/men5.jpg"
import men6 from "~/assets/images/dresscode/men6.jpg"
import men7 from "~/assets/images/dresscode/men7.jpg"
import men8 from "~/assets/images/dresscode/men8.jpg"
import men9 from "~/assets/images/dresscode/men9.jpg"
import men10 from "~/assets/images/dresscode/men10.jpg"
import men11 from "~/assets/images/dresscode/men11.jpg"

import { Tabs } from "@mantine/core"

export default function Men() {
  return (
    <Tabs.Panel value="men">
      <h1>Styles and Ideas for Men</h1>
      <p>
        Embrace the rich and colourful style of the medieval period at our
        Fantasy themed wedding. Its all about{" "}
        <strong>layers and natural colours,</strong> with earthy tones like
        browns, greens, and deep reds.
        <br />
        <br />
        Accessorize all you like, whether it be with belts, pouches, swords, or
        jewellery. All we ask is you come as <strong>YOU...</strong> as much as
        we&apos;d love 10 Gandalfs, we want to party with our close friends and
        family, not a cosplay party. You might still be a wizard - but you are
        still you.
      </p>
      <div className={classes.imageGroup}>
        <img src={men1} alt="male costume 1" />
        <img src={men2} alt="male costume 2" />
        <img src={men3} alt="male costume 3" />
      </div>
      <p>
        Notice how these guys aren&apos;t stereotypes for a knight. Mens
        medieval outfits feature accessories like belts and more clothing
        options with leather, like boots and jackets. Arm bracers, and armour
        pieces work well to tie the whole outfit together, especially with more
        simplistic outfits.
      </p>
      <div className={classes.imageGroup}>
        <img src={men4} alt="male costume 4" />
        <img src={men5} alt="male costume 5" />
        <img src={men6} alt="male costume 6" />
        <img src={men7} alt="male costume 6" />
      </div>
      <p>
        Of course, its not all dirty clothes and shirts. Elves are a common
        style as well, just please, don&apos;t come as legolas!
      </p>
      <div className={classes.imageGroup}>
        <img src={men8} alt="male costume" />
        <img src={men9} alt="male costume" />
        <img src={men10} alt="male costume" />
        <img src={men11} alt="male costume" />
      </div>
      <p>
        Check out this video by Living Anachronism for some small cheap changes:{" "}
        <a href="https://youtu.be/bwxiuBkpdAw" target="_blank" rel="noreferrer">
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
  )
}
