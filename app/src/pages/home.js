import React, { useRef, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Webcam from 'react-webcam';

import AlphabetButtons from '../components/alphabetButtons';

function Home(props) {
  const webcamRef = useRef(null);
  useEffect(() => captureVideo(), [webcamRef])

  const captureVideo = (counter = 0) => {
    if(webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      // console.log(imageSrc)
      // Do something with the imageSrc, like send it to the ML algorithm for prediction
    }

    requestAnimationFrame(() => {
      // captureVideo()
    })
  };
  
  return (
    <Grid container maxWidth='lg' marginX='auto'>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ width: '100%', textAlign: 'center' }}>
          ASL Coach
        </Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={8}>
          <Webcam
            style={{ width: '100%' }}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AlphabetButtons />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
