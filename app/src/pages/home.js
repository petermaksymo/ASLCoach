import React from "react"
import { Box, Button, Grid, Typography } from "@mui/material"


function Home(props) {
  return (
    <Grid container maxWidth="lg" marginX="auto">
      <Grid item xs={12}>
        <Typography variant="h4" my={2}>
          Welcome to ASL Coach!
        </Typography>
        <Typography paragraph>
          This is a personal project created by{" "}
          <a href="https://peter.maksymowsky.com" target="_blank">
            Peter Maksymowsky
          </a>{" "}
          to help teach you how to sign the ASL alphabet.
        </Typography>
        <Typography paragraph>
          This project is built with <strong>React</strong> and has a{" "}
          <strong>client-side machine learning model</strong> which is used to
          run the inferencing in near real-time. The model was originally
          developed with <strong>Pytorch</strong>, using{" "}
          <strong>transfer learning</strong> with the{" "}
          <a href="https://arxiv.org/pdf/1807.11626.pdf" target="_blank">
            MNASNET 0.5 model
          </a>
          . The model was fine-tuned by replacing the final classifier with one
          targeting the 27 classes for this problem and locking the parameters
          for the rest of the model. It was then trained on a{" "}
          <a
            href="https://www.kaggle.com/datasets/lexset/synthetic-asl-alphabet"
            target="_blank"
          >
            Kaggle ASL Alphabet dataset
          </a>
          . Finally, the model was exported into an <strong>ONNX</strong>-based
          model to work with the ONNX web runtime. This allows us to run the
          model client-side using the available gpu resources of the client with{" "}
          <strong>webGL</strong>.
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button variant="contained" href="/game" size="large">
            Play Game
          </Button>
          <Button variant="contained" href="/practice" size="large">
            Practice
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home
