import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/global.scss'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>        
        <Component {...pageProps} />
    </AuthContextProvider>
  )
}
