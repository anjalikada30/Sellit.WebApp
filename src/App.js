import './App.css';
import React, { Suspense } from 'react';
import { Header, Loader } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store';

const LoginComponent = React.lazy(() => import('./pages/login/Login'));
const VerifyOtpComponent = React.lazy(() => import('./pages/verify-otp/VerifyOtp'));
const SignupComponent = React.lazy(() => import('./pages/sign-up/Signup'));
const HomeComponent = React.lazy(() => import('./pages/home/Home'));
const AllBidsComponent = React.lazy(() => import('./pages/all-bids/AllBids'));
const CompletedBidsComponent = React.lazy(() => import('./pages/completed-bids/CompletedBids'));
const PendingBidsComponent = React.lazy(() => import('./pages/pending-bids/PendingBids'));
const CancelledBidsComponent = React.lazy(() => import('./pages/cancelled-bids/CancelledBids'));
const BookmarksComponent = React.lazy(() => import('./pages/bookmarks/Bookmarks.js'));
const ProductDetailsComponent = React.lazy(() => import('./pages/product-details/ProductDetails.js'));
const UserProfileComponent = React.lazy(() => import('./pages/user-profile/UserProfile'));

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<LoginComponent />} />
              <Route path='/verify-otp' element={<VerifyOtpComponent />} />
              <Route path='/home' element={<HomeComponent />} />
              <Route path='/sign-up' element={<SignupComponent />} />
              <Route path='/all-bids' element={<AllBidsComponent />} />
              <Route path='/completed-bids' element={<CompletedBidsComponent />} />
              <Route path='/pending-bids' element={<PendingBidsComponent />} />
              <Route path='/cancelled-bids' element={<CancelledBidsComponent />} />
              <Route path='/bookmarks' element={<BookmarksComponent />} />
              <Route path='/product/:id' element={<ProductDetailsComponent />} />
              <Route path='/user-profile' element={<UserProfileComponent />} />
            </Routes>
          </Suspense>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
