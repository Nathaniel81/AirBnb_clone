import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loader from './components/loaders/Loader';

const Home = lazy(() => import('./_root/Home'));
const PropertyDetail = lazy(() => import('./_root/PropertyDetail'));
const Create = lazy(() => import('./_root/create/Create'));
const Details = lazy(() => import('./_root/create/Details'));
const Amenities = lazy(() => import('./_root/create/Amenities'));
const Location = lazy(() => import('./_root/create/Location'));
const Photos = lazy(() => import('./_root/create/Photos'));
const Favorites = lazy(() => import('./_root/Favorites'));
const MyProperties = lazy(() => import('./_root/MyProperties'));
const Reservations = lazy(() => import('./_root/Reservations'));
const PropertyPhotos = lazy(() => import('./_root/PropertyPhotos'));
const RootLayout = lazy(() => import('./_root/RootLayout'));

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path='/property/:id' element={<PropertyDetail />} />
              <Route path='/property/:id/photos' element={<PropertyPhotos />} />
              <Route path='/create' element={<Create />} />
              <Route path='/create/details' element={<Details />} />
              <Route path='/create/amenities' element={<Amenities />} />
              <Route path='/create/location' element={<Location />} />
              <Route path='/create/photos' element={<Photos />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/my-properties' element={<MyProperties />} />
              <Route path='/reservations' element={<Reservations />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
