import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"

import "./App.css"
import theme from "./Theme"
import Home from "./pages/home"

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
