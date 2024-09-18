import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Fade } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';

const PersonalityScreen = ({ userDetails, nextScreen, component }) => {
  const { fullName, gender, profession, images } = userDetails;
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [gender1, gender2] = gender.split('/')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDescriptionVisible(true);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, []);

  const personalityStrings = [
    `${fullName} is a kind and compassionate person who always puts others first. ${gender1} has a great sense of humor and loves to make people laugh. ${gender1} is also very intelligent and hardworking, and ${gender1} is always striving to learn new things.`,
  `${fullName} is a reliable and trustworthy friend who is always there to lend a helping hand. ${gender1} has a strong sense of justice and fairness, and ${gender1} is always willing to stand up for what is right.`,
  `${fullName} is a confident and determined individual who is not afraid to take risks. ${gender1} has a natural talent for leadership, and ${gender1} is always inspiring others to reach their full potential.`,
  `${fullName} is a compassionate and caring person who always puts others before ${gender2}self. ${gender1} has a deep understanding of human nature, and ${gender1} is always able to connect with people on a personal level.`
  ]
  const professionStrings = [
    `${fullName} is a dedicated and hardworking professional who is always striving for excellence. ${gender1} has a strong work ethic and is always willing to go the extra mile. ${gender1} is also highly skilled and knowledgeable in ${profession}.`,
  `${fullName} is a creative and innovative professional who is always pushing boundaries. ${gender1} has a unique perspective and a passion for ${profession}. ${gender1} is also highly skilled at problem-solving and finding creative solutions.`,
 `${fullName} is a confident and charismatic leader who inspires those around ${gender2}. ${gender1} has a natural ability to motivate and empower others. ${gender1} is also highly skilled at strategic planning and decision-making in ${profession}.`,
  `${fullName} is a highly skilled and knowledgeable technical professional with a deep understanding of ${profession}. ${gender1} is always staying up-to-date with the latest trends and technologies. ${gender1} is also a problem-solver who can effectively troubleshoot technical issues.`
  ]
  const thankyouStrings = [
    `${fullName}, I'm so grateful for your friendship. You've always been there for me, no matter what. Thank you for being such a wonderful person.`,
  `${fullName}, your positive attitude and infectious laugh always brighten my day. Thank you for being such a wonderful friend.`,
 `${fullName}, your kindness and compassion are truly inspiring. Thank you for always being so understanding and supportive.`,
  `${fullName}, your friendship is like a ray of sunshine on a cloudy day. Thank you for always bringing light and joy.`,
  ]

  const paragraphString = () => {
    switch (component) {
      case 'personality':
        return personalityStrings[Math.floor(Math.random() * 4)]
      case 'profession':
        return professionStrings[Math.floor(Math.random() * 4)]
      case 'thankyou':
        return thankyouStrings[Math.floor(Math.random() * 4)]    
      default:
        break;
    }
  }
  const imageArray = (index) => {
    switch (component) {
      case 'personality':
        return images[index]
      case 'profession':
        return images[2 + index]
      case 'thankyou':
        return images[4 + index]   
      default:
        break;
    }
  }

  const imageContainerStyle = {
    overflow: 'hidden',
    borderRadius: '80px 0px 80px 0px',
    margin: 10,
  };

  const imageStyle = {
    width: isDesktop ? '20vw' : '80vw',
    height: isDesktop ? '80vh' : '30vh',
    animation: 'slide 12s ease-in-out infinite alternate',
  };
  const imageStyle1 = {
    width: isDesktop ? '20vw' : '80vw',
    height: isDesktop ? '80vh' : '30vh',
    animation: 'slide1 12s ease-in-out infinite alternate',
  };

  const textContainerStyle = {
    width: isDesktop ? '50vw' : '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isDesktop ? 10 : 20, // Adjust the margin for mobile,
    marginLeft: isDesktop ? 0 : '-25vw'
  };

  const flexFunction = () => {
    switch (component) {
      case 'profession':
        console.log(component)
        return isDesktop ? 'row-reverse' : 'column';
      default:
        return isDesktop ? 'row' : 'column';
    }
  }


  return (
    <Box display="flex" flexDirection={flexFunction} justifyContent="space-between" height="100vh" width="100vw">
      <Grid container alignItems="center" display="flex" flexDirection={flexFunction}>
        <Grid 
            data-aos="fade-up"
            data-aos-offset="200"
            // data-aos-delay="50"
            // data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
        item xs={6} style={{ width: isDesktop ? '50vw' : '100vw', maxWidth: '100vw', minHeight: '40vh' }} flexDirection={flexFunction}>
          <Box display="flex" flexDirection={flexFunction} alignItems="center" style={{ width: isDesktop ? '50vw' : '100vw' }}>
            <div style={imageContainerStyle}>
              <img src={imageArray(0)} alt="Personality Image 1" style={imageStyle} />
            </div>
            <div style={imageContainerStyle}>
              <img src={imageArray(1)} alt="Personality Image 2" style={imageStyle1} />
            </div>
          </Box>
        </Grid>
        <Grid item xs={6} style={{ width: isDesktop ? '50vw' : '100vw' }}>
          <div style={textContainerStyle}>
            <TypeAnimation
              style={{ fontFamily: 'cursive', whiteSpace: 'pre-line', height: '195px', fontSize: isDesktop ? '2em' : '1.5em', display: 'block', minHeight: '200px', marginTop: '15vh' }}
              sequence={[
                paragraphString(),
                1000,
                '',
              ]}
              repeat={Infinity}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalityScreen;