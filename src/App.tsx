import * as React from 'react';
import {
  Navigate,
  Outlet, Route, Routes, useLocation, useNavigate
} from 'react-router-dom';
import { fakeAuthProvider } from './services/auth.service';
import { AuthProvider } from './views/auth/AuthProvider';
import Checkout from './views/checkout/Checkout';
import Review from './views/checkout/Review';
import ArtistDetail from './views/dashboard/ArtistDetail';
import Artists from './views/dashboard/Artists';
import Dashboard from './views/dashboard/Dashboard';
import Orders from './views/dashboard/Orders';
import Layout from './views/layout/Layout';
import { RequireAuth } from './views/layout/RequireAuthen';
import SignIn from './views/sign-in/SignIn';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>}
          />
          <Route path="/artists" element={
            <RequireAuth>
              <Artists />
            </RequireAuth>}
          />
          <Route path='artists/:artistId' element={
            <RequireAuth>
              <ArtistDetail />
            </RequireAuth>
          }></Route>
          <Route path="/checkout" element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>}
          />

        </Route>
      </Routes>
    </AuthProvider>
  );
}

// function Layout() {
//   return (
//     <div>
//       {/* <AuthStatus /> */}

//       {/* <ul>
//         <li>
//           <Link to="/">Public Page</Link>
//         </li>
//         <li>
//           <Link to="/protected">Protected Page</Link>
//         </li>
//       </ul> */}

//       <Outlet />
//     </div>
//   );
// }

// interface AuthContextType {
//   user: any;
//   signin: (user: string, callback: VoidFunction) => void;
//   signout: (callback: VoidFunction) => void;
// }

// let AuthContext = React.createContext<AuthContextType>(null!);

// function AuthProvider({ children }: { children: React.ReactNode }) {
//   let [user, setUser] = React.useState<any>(null);

//   let signin = (newUser: string, callback: VoidFunction) => {
//     return fakeAuthProvider.signin(() => {
//       setUser(newUser);
//       callback();
//     });
//   };

//   let signout = (callback: VoidFunction) => {
//     return fakeAuthProvider.signout(() => {
//       setUser(null);
//       callback();
//     });
//   };

//   let value = { user, signin, signout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// function useAuth() {
//   return React.useContext(AuthContext);
// }

// function AuthStatus() {
//   let auth = useAuth();
//   let navigate = useNavigate();

//   if (!auth.user) {
//     // return <p>You are not logged in.</p>;
//     return null;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{' '}
//       <button
//         onClick={() => {
//           auth.signout(() => navigate('/'));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// }

// function RequireAuth({ children }: { children: JSX.Element }) {
//   let auth = useAuth();
//   let location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

// function LoginPage() {
//   let navigate = useNavigate();
//   let location = useLocation();
//   let auth = useAuth();

//   let from = location.pathname || '/';

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     let formData = new FormData(event.currentTarget);
//     let username = formData.get('username') as string;
//     let password = formData.get('password') as string;
//     auth.signin(username, () => {
//       // Send them back to the page they tried to visit when they were
//       // redirected to the login page. Use { replace: true } so we don't create
//       // another entry in the history stack for the login page.  This means that
//       // when they get to the protected page and click the back button, they
//       // won't end up back on the login page, which is also really nice for the
//       // user experience.
//       navigate(from, { replace: true });
//     });
//   }

//   return (
//     <div>
//       {/* <p>You must log in to view the page at {from}</p> */}

//       <form onSubmit={handleSubmit}>
//         <label>
//           Username: <input name="username" type="text" />
//         </label>{' '}
//         <label>
//           Password: <input name="password" type="text" />
//         </label>{' '}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// function PublicPage() {
//   return <h3>Public</h3>;
// }

// function ProtectedPage() {
//   return <h3>Protected</h3>;
// }
