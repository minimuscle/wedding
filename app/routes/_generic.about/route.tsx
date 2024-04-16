import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: `About | Josh & Nathan's Wedding` }, { name: 'description', content: 'Our High Fantasy Wedding' }]
}

export default function About() {
  return (
    <div>
      <h1>A Unique Wedding</h1>
      <p>
        Nathan and I have always wanted a unique wedding, something non-traditional that matches our own energy. The
        idea of having our wedding be boring and the same as everyone else, felt like a waste of money and time. We
        wanted to have a wedding that was memorable and fun, and that&apos;s why we decided to have a High-Fantasy
        themed wedding.
      </p>
      <p>
        We&apos;ve been planning this wedding for over a year now, and we&apos;ve put a lot of thought and effort into
        making sure that it&apos;s going to be a day that we&apos;ll never forget. We&apos;ve been working with various
        vendors to make sure that everything is perfect, and we&apos;ve been putting in the time to make sure that every
        detail is just right.
      </p>
      <h1>Why High-Fantasy?</h1>
      <p>
        Nathan and I are both huge fans of high-fantasy, and we wanted to incorporate that into our wedding. We both
        love the idea of magic and adventure, and we wanted to have a wedding that reflected that. We wanted to have a
        wedding that was fun and exciting, and that&apos;s why we decided to have a high-fantasy themed wedding.
      </p>
      <p>
        We debated several different themes for our wedding, probably way too early on in our relationship, but Nathan
        kept coming back to the idea of a high-fantasy wedding. Eventually it became a no-brainer, and we started
        planning our wedding around that theme, once we were finally engaged - although some of us (me, Josh) had been
        planning it for years at this point.
      </p>
    </div>
  )
}
