import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './pages/home.page';
import RootLayout from './layouts/root-layout.layout';
import MainLayout from './layouts/main.layout';
import HotelsPage from './pages/hotels.page';
import HotelPage from './pages/hotel.page';
import CreateHotelPage from './pages/create-hotel.page';
import AccountPage from './pages/account-page';
import ProtectedLayout from './layouts/protected.layout';
import AdminProtectedLayout from './layouts/admin-protected-layout';

import SignInPage from './pages/sign-in.page';
import SignUpPage from './pages/sign-up.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './lib/store';
import { ClerkProvider } from '@clerk/clerk-react';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk publishable key to the .env file");
}


//we use provider to make the store available to all the components in the app, so we wrap the entire app with the provider and pass the store as a prop to it.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>


        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/hotels/:id" element={<HotelPage />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="/account" element={<AccountPage />} />
                  <Route element={<AdminProtectedLayout />}>
                    <Route path="/hotels/create" element={<CreateHotelPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>

          </Routes>

        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
