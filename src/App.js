import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import PersonalityScreen from "./components/PersonalityScreen";
import ProfessionScreen from "./components/ProfessionScreen";
import ThankYouScreen from "./components/ThankYouScreen";

import ScrollIntoView from 'react-scroll-into-view'

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css'

function App() {

  AOS.init();

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    gender: "",
    profession: "",
    images: []
  });

  const [currentScreen, setCurrentScreen] = useState(0);

  const handleFormSubmit = (details) => {
    setUserDetails(details);
    setCurrentScreen(1); // Move to Personality Screen
  };

  const nextScreen = () => {
    setCurrentScreen((prevScreen) => prevScreen + 1);
  };

  return (
    <div className="App">
      {currentScreen === 0 ?
        <ImageUpload onFormSubmit={handleFormSubmit} />
        :
        <>
          <div id="personality">
            <ScrollIntoView selector="#profession">
              <PersonalityScreen id={0} userDetails={userDetails} nextScreen={nextScreen} component={'personality'}/>
            </ScrollIntoView>
          </div>
          <div id="profession">
            <ScrollIntoView selector="#thankyou">
              {/* <ProfessionScreen userDetails={userDetails} nextScreen={nextScreen} /> */}
              <PersonalityScreen id={1} userDetails={userDetails} nextScreen={nextScreen} component={'profession'}/>
            </ScrollIntoView>
          </div>
          <div id="thankyou">
            {/* <ThankYouScreen userDetails={userDetails} /> */}
            <PersonalityScreen id={2} userDetails={userDetails} nextScreen={nextScreen} component={'thankyou'}/>
          </div>
        </>
      }
      {/* {currentScreen === 1 && (
      )}
      {currentScreen === 2 && (
      )}
      {currentScreen === 3 && 
      } */}

    </div>
  );
}

export default App;
