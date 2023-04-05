import React from "react"
import { useTheme } from "@mui/material/styles"
import { Box, Grid, Typography } from "@mui/material"

function Prediction({ letter, confidence }) {
  const theme = useTheme()

  return (
    <tr>
      <td style={{ width: 120 }}>
        <div style={{ display: "flex" }}>
          <Typography style={{ fontWeight: "700", minWidth: 55 }}>
            {letter}:
          </Typography>
          <Typography>
            {(Math.round(confidence * 10000) / 100).toFixed(2)}%
          </Typography>
        </div>
      </td>
      <td style={{ display: "flex", width: "99%" }}>
        <Box
          style={{
            height: 18,
            width: `${confidence * 100}%`,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          &nbsp;
        </Box>
        <Box
          style={{
            height: 18,
            width: `100-${confidence * 100}%`,
          }}
        >
          &nbsp;
        </Box>
      </td>
    </tr>
  )
}

function Predictions({ predictions }) {
  if (!predictions) return null

  return (
    <Grid container maxWidth="lg" marginX="auto">
      <Typography>
        Here you can see the model's top 5 predictions and confidence:
      </Typography>
      <table style={{ width: "100%" }}>
        <tbody>
          {predictions.map((pred) => (
            <Prediction letter={pred.name} confidence={pred.probability} />
          ))}
        </tbody>
      </table>
    </Grid>
  )
}

export default Predictions
