import React, { useRef, useEffect, useState } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import Webcam from "react-webcam"

import { inferenceModel } from "../utils/predict"
import { alphabet } from "../data/classes"
import Predictions from "../components/predictions"
import SignImage from "../signImages"

function Game({ session }) {
  const [started, setStarted] = useState(false)
  const [easyMode, setEasyMode] = useState(true)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(false)
  const [res, setRes] = useState(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [currentClass, setCurrentClass] = useState(null)

  const webcamRef = useRef(null)

  const captureVideo = async () => {
    if (isCapturing) return
    setIsCapturing(true)
    setCorrect(false)

    if (webcamRef && webcamRef.current && session) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        const pred = await inferenceModel(imageSrc, session)
        setRes(pred[0])
      }
    }

    setIsCapturing(false)
  }

  const compareRes = () => {
    if (!started || !res) return

    if (!easyMode && res[0].name === currentClass) {
      setScore(score + 2)
      setLetter()
      setCorrect(true)
    }

    if (
      easyMode &&
      (res[0].name === currentClass ||
        res[1].name === currentClass ||
        res[2].name === currentClass)
    ) {
      setScore(score + 1)
      setLetter()
      setCorrect(true)
    }
  }

  const setLetter = () => {
    if (!started) return
    setCurrentClass(alphabet[Math.floor(Math.random() * alphabet.length)])
  }

  const startGame = (difficulty) => {
    setStarted(true)
    setEasyMode(difficulty === "easy")
    setScore(0)
  }

  useEffect(() => {
    if (!started) return

    setLetter()
    const intervalId = setInterval(captureVideo, 1000 / 5) // x times per second
    return () => clearInterval(intervalId)
  }, [webcamRef, session, started])
  useEffect(compareRes, [res, currentClass])

  return (
    <Grid container spacing={2} maxWidth="lg" marginX="auto">
      <Grid item xs={12}>
        <Typography variant="h4" style={{ marginTop: 12 }}>
          Welcome to ASL Coach
        </Typography>
        <Typography paragraph>
          Here you can test your skills by playing a game. In easy mode, you
          will get points for each time you sign the given letter and it is
          within the models top 3 predicted results. For hard mode, the model
          must predict your sign as its top result and you will have no hints.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={() => startGame("easy")}>
            {started ? "restart easy game" : "start easy game"}
          </Button>
          <Button variant="contained" onClick={() => startGame("hard")}>
            {started ? "restart hard game" : "start hard game"}
          </Button>
          <Button variant="outlined" onClick={setLetter}>
            New Letter
          </Button>
        </Box>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={8}>
          <div style={{ position: "relative" }}>
            <Webcam
              style={{ width: "100%" }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{ facingMode: "user" }}
            />
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "calc(100% - 4px)",
                top: 0,
              }}
              className={correct ? "video-window" : "video-window-reverse"}
            />
          </div>
          <Predictions predictions={res} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Score: {score}</Typography>
          {currentClass && (
            <Typography variant="h6">Letter: {currentClass}</Typography>
          )}
          <SignImage letter={currentClass} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Game
