import '../styles/index.css';
import { AppProps } from 'next/app';

export function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}