import React from "react";

const ProfessionScreen = ({ userDetails, nextScreen }) => {
  const { fullName, profession, images } = userDetails;

  return (
    <div>
      <h2>{`${fullName} is excellent in their profession as a ${profession}!`}</h2>
      <div className="image-container">
        <img src={images[1]} alt="Profession Image 1" />
        <img src={images[3]} alt="Profession Image 2" />
      </div>
      <button onClick={nextScreen}>Next</button>
    </div>
  );
};

export default ProfessionScreen;
