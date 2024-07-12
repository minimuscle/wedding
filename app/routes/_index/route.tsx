import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import classes from './_index.module.css'
import { Space } from '@mantine/core'
import Button from '~/components/Button'
import headingImg from '~/assets/images/heading.png'

//Import images
import menu_image from '~/assets/images/buttons/MENU.webp'
import menu_image_hover from '~/assets/images/buttons/MENU_hover.webp'
import menu_image_active from '~/assets/images/buttons/MENU_active.webp'

import about_image from '~/assets/images/buttons/ABOUT.webp'
import about_image_hover from '~/assets/images/buttons/ABOUT_hover.webp'
import about_image_active from '~/assets/images/buttons/ABOUT_active.webp'

import location_image from '~/assets/images/buttons/LOCATION.webp'
import location_image_hover from '~/assets/images/buttons/LOCATION_hover.webp'
import location_image_active from '~/assets/images/buttons/LOCATION_active.webp'

import dress_code_image from '~/assets/images/buttons/DRESS_CODE.webp'
import dress_code_image_hover from '~/assets/images/buttons/DRESS_CODE_hover.webp'
import dress_code_image_active from '~/assets/images/buttons/DRESS_CODE_active.webp'

import party_image from '~/assets/images/buttons/PARTY.webp'
import party_image_hover from '~/assets/images/buttons/PARTY_hover.webp'
import party_image_active from '~/assets/images/buttons/PARTY_active.webp'

import admin_image from '~/assets/images/buttons/ADMIN.webp'
import admin_image_hover from '~/assets/images/buttons/ADMIN_hover.webp'
import admin_image_active from '~/assets/images/buttons/ADMIN_active.webp'

import rsvp_image from '~/assets/images/buttons/RSVP.webp'
import rsvp_image_hover from '~/assets/images/buttons/RSVP_hover.webp'
import rsvp_image_active from '~/assets/images/buttons/RSVP_active.webp'

export const meta: MetaFunction = () => {
  return [{ title: `Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Index() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.overlay}>
          <h2>Welcome to Josh and Nathan&apos;s</h2>
          <h1>High -Fantasy Wedding</h1>
          <Button href='/rsvp' image={rsvp_image} hover={rsvp_image_hover} active={rsvp_image_active} width='300px' />
        </div>
      </div>
      <div className={classes.content}>
        <h1 className={classes.headingImg}>Quick Links</h1>
        <div className={classes.buttonGroup}>
          <Button
            href='/about'
            image={about_image}
            hover={about_image_hover}
            active={about_image_active}
            width='250px'
          />
          <Button href='/menu' image={menu_image} hover={menu_image_hover} active={menu_image_active} width='250px' />
          <Button
            href='/location'
            image={location_image}
            hover={location_image_hover}
            active={location_image_active}
            width='250px'
          />
          <Button
            href='/dress-code'
            image={dress_code_image}
            hover={dress_code_image_hover}
            active={dress_code_image_active}
            width='250px'
          />
        </div>
        <Space h={100} />
        <div className={classes.text}>
          <h1>Part of THE Party?</h1>
          <p>This part is just for those in the wedding party</p>
        </div>

        <div className={classes.buttonGroup}>
          <Button
            href='/party'
            image={party_image}
            hover={party_image_hover}
            active={party_image_active}
            width='250px'
          />
          <Button
            href='/admin'
            image={admin_image}
            hover={admin_image_hover}
            active={admin_image_active}
            width='250px'
          />
        </div>
      </div>
    </div>
  )
}
