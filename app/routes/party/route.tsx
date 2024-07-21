import Button from "~/components/Button"
import back_image from "~/assets/images/buttons/BACK.webp"
import back_image_hover from "~/assets/images/buttons/BACK_hover.webp"
import back_image_active from "~/assets/images/buttons/BACK_active.webp"

export default function Party() {
  return (
    <div>
      <h1>This will be coming soon</h1>
      <Button
        href="/"
        image={back_image}
        hover={back_image_hover}
        active={back_image_active}
        width="150px"
      />
    </div>
  )
}
