import './App.css'
import AppRouter from './router/AppRouter'
import QueryClientProviderWrapper from './components/react-query-provider'
import { ToastProvider } from './components/toast-provider'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <QueryClientProviderWrapper>
        <ToastProvider />
        <AppRouter />
      </QueryClientProviderWrapper>
    </ThemeProvider>
  )

  // return (
  //   <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
  //     <QueryClientProviderWrapper>
  //       <ToastProvider />
  //       <AppRouter />
  //     </QueryClientProviderWrapper>
  //   </ThemeProvider>
  // )
}

export default App
