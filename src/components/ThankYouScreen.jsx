import React from "react";

const ThankYouScreen = ({ userDetails }) => {
  const { fullName, images } = userDetails;

  return (
    <div>
      <h2>{`Thank you, ${fullName}, for being a special part of my life!`}</h2>
      {/* <div className="image-container">
        <img src={images[4]} alt="Thank You Image 1" />
        <img src={images[5]} alt="Thank You Image 2" />
      </div> */}
    </div>
  );
};

export default ThankYouScreen;
