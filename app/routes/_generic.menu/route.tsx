import type { MetaFunction } from '@remix-run/node'
import classes from './menu.module.css'
import beef from '~/assets/images/sliders/beef.webp'
import kim from '~/assets/images/sliders/kim.webp'
import bbq from '~/assets/images/sliders/bbq.webp'
import shroom from '~/assets/images/sliders/shroom.webp'

export const meta: MetaFunction = () => {
  return [{ title: `Menu | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Menu() {
  return (
    <div>
      <h1>Menu</h1>
      <p>
        One of the most important parts of a wedding, is what to eat. We both dislike sit-down traditional meals. We
        loved the idea of something dirty and delicious, which is why we chose the menu below. We hope you enjoy it as
        much as we do.
      </p>
      <p>Note: Please contact us for any dietry requirements that are not met with the below options.</p>
      <h1>Food</h1>
      <h2>Main Meal : Sliders + Sides</h2>
      <p>Each person will get:</p>
      <ul>
        <li>2x Sliders</li>
        <li>Southern Fried Chicken</li>
        <li>Hand Cut Rustic Chips</li>
        <li>Mac & Cheese Croquettes</li>
        <li>Mamasita&apos;s Famouse Corn</li>
        <li>Truck Made Salad</li>
      </ul>
      <p>Guests will have the option of any 2 of the below Sliders:</p>
      <div className={classes.sliders}>
        <img src={beef} alt='Beef Cheeseburger' />
        <img src={kim} alt='Kimchi Fried Chicken' />
        <img src={bbq} alt='BBQ Pulled Pork' />
        <img src={shroom} alt='Crispy Mushroom' />
      </div>
    </div>
  )
}
