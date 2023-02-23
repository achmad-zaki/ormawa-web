import '@/styles/globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function App({ Component, pageProps }) {
  return (
    <div className='font-poppins'>
      <Sidebar>
        <Header/>
        <Component {...pageProps} />
      </Sidebar>
    </div>
  )
}
