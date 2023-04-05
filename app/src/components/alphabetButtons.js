import React, { useState } from "react"
import { Button, Typography, Grid } from "@mui/material"

import SignImage from "../signImages"
import { alphabet } from "../data/classes"

function AlphabetButtons(props) {
  const [letter, setLetter] = useState(null)

  return (
    <Grid container>
      <Typography variant="subtitle" paragraph>
        Click on one of the letters to get a hint:
      </Typography>
      <Grid item>
        {alphabet.map((letter) => (
          <Button
            onClick={() => setLetter(letter)}
            variant="outlined"
            style={{ borderRadius: 0 }}
          >
            {letter}
          </Button>
        ))}
      </Grid>
      <SignImage letter={letter} />
    </Grid>
  )
}

export default AlphabetButtons
