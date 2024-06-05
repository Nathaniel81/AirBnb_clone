import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { 
  Home,
  Property,
  Create, 
  Details, 
  Address, 
  Favorites, 
  MyProperties,
  Reservations,
  RootLayout, 
} from './_root';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/property/:id' element={<Property />} />
            <Route path='/create' element={<Create />} />
            <Route path='/create/details' element={<Details />} />
            <Route path='/create/address' element={<Address />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/my-properties' element={<MyProperties />} />
            <Route path='/reservations' element={<Reservations />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
