import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: `Dress Code | Josh & Nathan's Wedding` },
    { name: 'description', content: 'Our High Fantasy Wedding' },
  ]
}

export default function Dress() {
  return (
    <div>
      <h1>About</h1>
      <p>Lorum Ipsum...</p>
    </div>
  )
}
