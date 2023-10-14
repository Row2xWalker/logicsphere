
import Provider from '@components/Provider'
import './../globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@components/Sidebar'
import Header from '@components/Header'
import Footer from '@components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Form Generator',
  description: 'Generate Form that is print ready',
}
  
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans main min-h-screen flex flex-col bg-gray-100 text-gray-700 overflow-x-hidden">
          <Provider>
          <div className="flex min-h-screen">
            <div className="flex-1 flex">
              <Sidebar className="h-full bg-gray-800 text-white" />
              <div className="flex-1">
                <div className="flex flex-col h-full">
                <Header />
                  <div className="h-full">
                  {children}
                  </div>
                <Footer />
                </div>
              </div>
            </div>
          </div>
          </Provider>
        </body>
    </html>
  )
}
