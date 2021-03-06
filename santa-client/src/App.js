import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import stateReducer from "./config/stateReducer";
import { StateContext } from "./config/store";
import Login from "./components/login";
import Home from "./components/Home";
import SignUp from "./components/Register";
import AboutUs from "./components/AboutUs";
import LetterToSantaController from "./components/letterToSanta/LetterToSantaController";
import GiftList from "./components/giftList/GiftList";
import AdventCalender from "./components/AdventCalender";
import Nav from "./components/Nav";
import SocialsBar from "./components/SocialsBar";
import "./styles/partials/cane.scss";
import { getLoggedInUser } from "./services/authServices";

function App() {
  const initialState = {
    giftLists: {},
    letterToSanta: {
      parentMode: true,
      addForm: false,
      currentChild: false,
      children: [],
      //  children to be an array of objects
      // 1st e.g {name:"jimmy", uid:"12312341", list:["xbox", "socks"]}
    },
  };

  const [store, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "setLoggedInUser",
      data: getLoggedInUser(),
    });
  }, []);

  return (
    <div>
      <StateContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <div className="allPageContainer">
            <div className="row p-0 m-0 d-flex justify-content-center">
              <div className="col-1 p-0">
                <div className="leftCane"></div>
              </div>

              <div className="col-10 p-0 d-flex flex-column justify-content-between allPageGrid">
                <Nav />

                <div className="d-flex flex-column align-items-center text-center">
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/about-us" component={AboutUs} />
                  <Route
                    exact
                    path="/letter-to-santa"
                    component={LetterToSantaController}
                  />
                  <Route exact path="/gift-list" component={GiftList} />
                  <Route
                    exact
                    path="/advent-calender"
                    component={AdventCalender}
                  />
                  <Route exact path="/" component={Home} />
                </div>
                <SocialsBar />
              </div>

              <div className="col-1 p-0">
                <div className="rightCane"></div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
