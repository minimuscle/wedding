import type { MetaFunction } from '@remix-run/node'
import paddock1 from '~/assets/images/paddock.jpeg'
import paddock2 from '~/assets/images/paddock2.jpeg'
import classes from './location.module.css'

export const meta: MetaFunction = () => {
  return [{ title: `Location | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Location() {
  return (
    <div>
      <h1>Ceremony</h1>
      <p>The ceremony will be held in Koo Wee Rup, at a private property. This location is the</p>
      <h1>Reception</h1>
      <p>
        After the ceremony, we will then move to a new location, about 25 minutes away, while it is a bit of a distance,
        we hope our guests will be able to accomodate this as we work towards the best value and options available to us
      </p>
      <h2>Address</h2>
      <p>Old Cheese Factory, 34 Homestead Rd, Berwick VIC 3806</p>
      <h3>Middle Paddock</h3>
      <p>
        The large grassed middle paddock is positioned in the heart of the site. It features a large garden with trees
        and lined with the old buildings, which is perfect for our wedding. Here are some pictures of the location:
      </p>
      <div className={classes.group}>
        <img src={paddock1} alt='Paddock 1' />
        <img src={paddock2} alt='Paddock 2' />
      </div>
    </div>
  )
}
