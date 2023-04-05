import React, { useRef, useEffect, useState } from "react"
import { Grid, Typography } from "@mui/material"
import Webcam from "react-webcam"

import { inferenceModel } from "../utils/predict"
import AlphabetButtons from "../components/alphabetButtons"
import Predictions from "../components/predictions"

function Practice({ session }) {
  const [res, setRes] = useState(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const webcamRef = useRef(null)

  const captureVideo = async () => {
    if (isCapturing) return
    setIsCapturing(true)

    if (webcamRef && webcamRef.current && session) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        const pred = await inferenceModel(imageSrc, session)
        setRes(pred[0])
      }
    }

    setIsCapturing(false)
  }

  useEffect(() => {
    const intervalId = setInterval(captureVideo, 1000 / 1) // x times per second
    return () => clearInterval(intervalId)
  }, [webcamRef, session])

  return (
    <Grid container maxWidth="lg" marginX="auto">
      <Grid item xs={12}>
        <Typography variant="h4" style={{ marginTop: 12 }}>
          Welcome to ASL Coach
        </Typography>
        <Typography paragraph>
          Here you can practice by clicking on one of the letters to see how you
          can sign it.
        </Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={8}>
          <Webcam
            style={{ width: "100%" }}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "user" }}
          />
          <Predictions predictions={res} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AlphabetButtons />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Practice
