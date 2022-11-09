import { ToastContainer } from 'react-toastify'
import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return(
  <Layout>
  <ToastContainer/>
  <Component {...pageProps} /></Layout>
  )
}

export default MyApp
