import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import '@mantine/core/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const theme = createTheme({
  /** Put your mantine theme override here */
})

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Outlet />
    </MantineProvider>
  )
}
