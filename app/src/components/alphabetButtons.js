import React, { useState } from 'react';
import { Button, Typography, Grid } from '@mui/material'

import SignImage from "../signImages"

const categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space']

function AlphabetButtons(props) {
  const [letter, setLetter] = useState(null)
  const [prediction, setPrediction] = useState(null);

  const handleClick = async (letter) => {
    // Send the captured image to the ML algorithm for prediction
    setLetter(letter)
    const prediction = await predict(letter);
    setPrediction(prediction);
  };

  const predict = async (letter) => {
    // Implement your ML algorithm's prediction logic here
    // You can use the captured image as input
    // Return the top 3 predicted letters with their confidence percentages
    console.log({ letter1: { letter: 'A', confidence: 90 }, letter2: { letter: 'B', confidence: 80 }, letter3: { letter: 'C', confidence: 70 } })
    return { letter1: { letter: 'A', confidence: 90 }, letter2: { letter: 'B', confidence: 80 }, letter3: { letter: 'C', confidence: 70 } };
  };

  return (
    <Grid container>
      <Grid item>
        {categories.map(letter => <Button onClick={() => handleClick(letter)}>{letter}</Button>)}
      </Grid>
      <SignImage letter={letter}/>
      {/* Add more buttons for each letter of the alphabet */}
      {prediction && (
        <div>
          <p>Prediction:</p>
          <ul>
            <li>{prediction.letter1.letter} ({prediction.letter1.confidence}%)</li>
            <li>{prediction.letter2.letter} ({prediction.letter2.confidence}%)</li>
            <li>{prediction.letter3.letter} ({prediction.letter3.confidence}%)</li>
          </ul>
        </div>
      )}
    </Grid>
  );
}

export default AlphabetButtons;
