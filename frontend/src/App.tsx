import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { Homepage } from './pages/Homepage';
import { RegistrationPage } from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import NavigationBar from "./components/NavigationBar";
import { Restaurants } from "./pages/Restaurants";
import { OrderPage } from "./pages/OrderOverviewPage";
import { AccountPage } from "./pages/AccountPage";
import { ManagerPage } from "./pages/ManagerPage";
import { ManagerRestaurantsPage } from "./pages/ManagerRestaurantsPage";
import { ManagerMenuPage } from "./pages/MenuManagerPage";
import { ManagerRestaurantPage } from "./pages/ManagerRestaurantPage";
import { UserSession } from "./models/user";
import {MenuPage} from "./pages/MenuPage";
import { TextComponent } from './components/TextComponent';

const App: FC = () => {

  return (
    <div>
      <Routes>
        <Route index element={<Navigate to="/auth/homepage" />} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegistrationPage} />
        <Route path="/auth/*" Component={PrivateRoute} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

const PrivateRoute: FC = () => {

  const { auth, isLoading, isError } = useAuth();

  if (isLoading) return <TextComponent message="Loading ..."/>;
  if (!auth || isError) return <Navigate to="/login" />;

  return <div>
    <NavigationBar />
    <Routes>
      <Route index element={<Navigate to="homepage"/>} />
      <Route path="homepage" Component={Homepage} />
      <Route path="restaurant">
        <Route index Component={Restaurants}/>
        <Route path=":restaurantId/" element={<Navigate to="menu"/>} />
        <Route path=":restaurantId/menu" Component={MenuPage} />
      </Route>
      <Route path="order" Component={OrderPage} />
      <Route path="account" Component={AccountPage} />
      <Route path="manager/*" element={<ManagerRoute session={ auth } />} />
    </Routes>
  </div>
}

type ManagerRouteProps = {
  session: UserSession;
}

const ManagerRoute: FC<ManagerRouteProps> = ({ session }) => {

  if (session.role !== "MANAGER") {
    return <Navigate to="/auth" />
  }

  return <Routes>
    <Route index Component={ManagerPage} />
    <Route path="restaurant/:restaurantId/menu" Component={ManagerMenuPage} />
    <Route path="restaurant/:restaurantId" Component={ManagerRestaurantPage} />
    <Route path="restaurant" Component={ManagerRestaurantsPage} />
  </Routes>
}

export default App
