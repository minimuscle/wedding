import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: `Location | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function Location() {
  return (
    <div>
      <h1>Location</h1>
      <p>Lorum Ipsum...</p>
    </div>
  )
}
