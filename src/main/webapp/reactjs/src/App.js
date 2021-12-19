import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/ViewCar";
import UserList from "./components/User/UserList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SecurityServiceComponent from "./components/SecurityServiceComponent";

import Profile from "./components/User/Profile";
import UserProfile from "./components/User/UserProfile";
import ViewCar from "./components/Car/ViewCar";
import ViewUserCar from "./components/Car/ViewUserCar";
import ListCarUserComponent from './components/Car/ListCarUserComponent'

import CreateUpdateCarImageComponent from './components/Car/CreateUpdateCarImageComponent';

import CreateUpdateUserComponent from './components/User/CreateUpdateUserComponent';
import CreateUpdateAccountImageComponent from './components/UserInformation/CreateUpdateAccountImageComponent';
import CreateUpdatePassportImageComponent from './components/UserInformation/CreateUpdatePassportImageComponent';
import CreateUserInformationComponent from './components/UserInformation/CreateUserInformationComponent';
import CreateUpdateEmployeeComponent from './components/Employee/CreateUpdateEmployeeComponent';
import CreateUpdateDimplomaImageComponent from './components/Employee/CreateUpdateDimplomaImageComponent';
import CreateUpdateCustomersComponent from './components/Customers/CreateUpdateCustomersComponent';
import CreateUpdateDriverLicenseComponent from './components/Customers/CreateUpdateDriverLicenseComponent';
import ListUserComponent from './components/User/ListUserComponent'
import ListCarComponent from './components/Car/ListCarComponent'
import CreateUpdateCarComponent from './components/Car/CreateUpdateCarComponent';

import ListRentalComponent from './components/Rental/ListRentalComponent'
import ListRatingsComponent from './components/Ratings/ListRatingsComponent'
import ListRentalUserComponent from './components/Rental/ListRentalUserComponent'


import CreateUpdateRatingComponent from './components/Ratings/CreateUpdateRatingComponent'

import CreateUpdateCarInformationComponent from './components/Car/CreateUpdateCarInformationComponent';

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/home/:id" exact component={Home} />

              <Route path="/transition/:idUser/:carId" component={Welcome} />

              <Route path="/security-service" component={SecurityServiceComponent} />

              <Route path="/update-user/:idUser/:role" component={CreateUpdateUserComponent} />
              <Route path="/users" component={ListUserComponent} />

              <Route path="/cars" component={ListCarComponent} />
              <Route path="/cars-user/:idUser" component={ListCarUserComponent} />

              <Route path="/add-car" component={CreateUpdateCarComponent} />
              <Route path="/car-page/:carId" exact component={ViewCar} />
              <Route path="/car-page/:idRental/:idUser/:role" exact component={ViewCar} />
              <Route path="/car-page/:ratingId/:idUser/:role" exact component={ViewCar} />

              <Route path="/car-page-user/:carId/:idUser" exact component={ViewUserCar} />
             
              <Route path="/view-car-rental/:idRental/:idUser/:role" exact component={ViewUserCar} />
              <Route path="/view-car-rating/:ratingId/:idUser/:role" exact component={ViewUserCar} />

              <Route path="/update-car/:carId" component={CreateUpdateCarComponent} />
              <Route path="/update-car-rating/:ratingId/:idUser/:role" component={CreateUpdateRatingComponent} />

              <Route path="/create-car-information/:carId" component={CreateUpdateCarInformationComponent} />
              <Route path="/update-car-information/:carInformationId/:carId" component={CreateUpdateCarInformationComponent} />
             

              <Route path="/usersList" exact component={UserList} />
              <Route path="/profile/:idUser/:role" exact component={Profile} />
              <Route path="/user-profile-page/:idUser" exact component={UserProfile} />
              <Route path="/admin-user-profile-page/:idRental/:idUser/:role" exact component={UserProfile} />
              <Route path="/admin-user-profile-page/:ratingId/:idUser/:role" exact component={UserProfile} />


              <Route path="/create-account-image/:idUserInformation/:idUser/:role" component={CreateUpdateAccountImageComponent} />
               <Route path="/create-passport-image/:idUserInformation/:idUser/:role" component={CreateUpdatePassportImageComponent} />
              
               <Route path="/create-user-information/:idUser/:role" component={CreateUserInformationComponent} />
               <Route path="/update-user-information/:userInformationId/:idUser/:role" component={CreateUserInformationComponent} />
             
               <Route path="/create-employee/:idUser/:role" component={CreateUpdateEmployeeComponent} />
               <Route path="/update-employee/:employeeId/:idUser/:role" component={CreateUpdateEmployeeComponent} />
              
               <Route path="/create-customer/:idUser/:role" component={CreateUpdateCustomersComponent} />
               <Route path="/update-customer/:customersId/:idUser/:role" component={CreateUpdateCustomersComponent} />
              
               <Route path="/create-driver-license-image/:customersId/:idUser/:role" component={CreateUpdateDriverLicenseComponent} />
               <Route path="/create-diploma-image/:employeeId/:idUser/:role" component={CreateUpdateDimplomaImageComponent} />
               <Route path="/create-car-image/:carId" component={CreateUpdateCarImageComponent} />

               <Route path="/rentals/:idUser/:role" component={ListRentalUserComponent} />

               <Route path="/ratings/:idUser/:role" component={ListRatingsComponent} />
               <Route path="/rentals-user/:idUser/:role" component={ListRentalComponent} />


              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login message="User Logged Out Successfully." />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
