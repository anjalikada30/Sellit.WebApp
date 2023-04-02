import './App.css';
import React, { Suspense } from 'react';
import { Header, Loader } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store';
import Protected from './ProtectedRoute';

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
const ForgotPasswordComponent = React.lazy(() => import('./pages/forgot-password/ForgotPassword'));

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/login' element={<LoginComponent />} />
              <Route path='/verify-otp' element={<VerifyOtpComponent />} />
              <Route path='/forgot-password' element={<ForgotPasswordComponent />} />
              <Route path='/home'
                element={
                  <Protected>
                    <HomeComponent />
                  </Protected>}
              />
              <Route path='/sign-up' element={<SignupComponent />} />
              <Route path='/all-bids'
                element={
                  <Protected>
                    <AllBidsComponent />
                  </Protected>}
              />
              <Route path='/completed-bids'
                element={
                  <Protected>
                    <CompletedBidsComponent />
                  </Protected>}
              />
              <Route path='/pending-bids'
                element={
                  <Protected>
                    <PendingBidsComponent />
                  </Protected>}
              />
              <Route path='/cancelled-bids'
                element={
                  <Protected>
                    <CancelledBidsComponent />
                  </Protected>}
              />
              <Route path='/bookmarks'
                element={
                  <Protected>
                    <BookmarksComponent />
                  </Protected>}
              />
              <Route path='/product/:id'
                element={
                  <Protected>
                    <ProductDetailsComponent />
                  </Protected>}
              />
              <Route path='/user-profile'
                element={
                  <Protected>
                    <UserProfileComponent />
                  </Protected>}
              />
            </Routes>
          </Suspense>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
