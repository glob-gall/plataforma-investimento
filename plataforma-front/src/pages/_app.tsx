import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/global.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#EF959D',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#ff0000',
        },
        background: {
            default: '#fff',
        },
    }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
