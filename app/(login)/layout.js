
import Provider from '@components/Provider'
import '../globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
    <body className="font-sans main min-h-screen flex flex-col bg-gray-100 text-gray-700 overflow-x-hidden">
      <Provider>
        {children}
      </Provider>
    </body>
    </html>
  )
}
