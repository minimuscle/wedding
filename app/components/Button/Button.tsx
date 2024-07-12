import { Link } from "@remix-run/react"
import classes from './Button.module.css'

interface ButtonProps {
  href: string
  image: string
  hover: string
  active: string
  width?: `${number}px` | `${number}%` | `${number}rem` | `${number}em`
  height?: `${number}px` | `${number}%` | `${number}rem` | `${number}em`
}

export default function Button({ href, image, hover, active, width, height }: ButtonProps){
  //If the window width is less than 768px, it is considered mobile, and will prefetch the link with "viewport"
  const isMobile = window?.innerWidth < 768 

  return <Link to={href} className={classes.button} prefetch={isMobile ? "viewport" : "intent"}>
    <img width={width} height={height} className={classes.image} src={image} alt="Button" />
    {hover && <img width={width} height={height} className={classes.hover} src={hover} alt="Hover" />}
    {active && <img width={width} height={height} className={classes.active} src={active} alt="Active" />}
  </Link>
}