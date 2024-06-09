import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { 
  Home,
  PropertyDetail,
  Create, 
  Details, 
  Location, 
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
            <Route path='/property/:id' element={<PropertyDetail />} />
            <Route path='/create' element={<Create />} />
            <Route path='/create/details' element={<Details />} />
            <Route path='/create/location' element={<Location />} />
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
