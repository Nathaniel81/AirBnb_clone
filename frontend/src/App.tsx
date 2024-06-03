import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RootLayout, Home, Create, Details, Address } from './_root';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/create/details' element={<Details />} />
            <Route path='/create/address' element={<Address />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
