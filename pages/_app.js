import '@/styles/globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { QueryClientProvider, QueryClient } from 'react-query'
import { store } from '@/redux/store';
import { Provider } from 'react-redux'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <div className='font-poppins'>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <Sidebar>
        <Header/>
        <Component {...pageProps} />
      </Sidebar>
        </Provider>
      </QueryClientProvider>
    </div>
  )
}
