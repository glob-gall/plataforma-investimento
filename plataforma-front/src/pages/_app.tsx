import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/global.css'
import apiConfig from "@config/api.config";
import {parseCookies} from "nookies";
import {TOKEN_KEY} from "@constants/constants";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F08080',
        },
        secondary: {
            main: '#FBC4AB',
        },
        error: {
            main: '#ff0000',
        },
        background: {
            default: '#fff',
        },
    }
});

if( typeof window !== 'undefined' ) {
    const { [TOKEN_KEY]:token } = parseCookies(null);
    apiConfig.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`; // for all requests
        return config;
    });

    apiConfig.interceptors.response.use((response) => {
        if(response.status === 401) {
            localStorage.clear();
            window.location.replace('/');
        }
        return response;
    });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
