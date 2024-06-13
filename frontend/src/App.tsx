import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { 
  Home,
  PropertyDetail,
  Create,
  Details,
  Amenities,
  Location,
  Photos,
  Favorites, 
  MyProperties,
  Reservations,
  PropertyPhotos,
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
            <Route path='/property/:id/photos' element={<PropertyPhotos />} />
            <Route path='/create' element={<Create />} />
            <Route path='/create/details' element={<Details />} />
            <Route path='/create/amenities' element={<Amenities />} />
            <Route path='/create/location' element={<Location />} />
            <Route path='/create/Photos' element={<Photos />} />
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
