import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"

import "./App.css"
import theme from "./Theme"
import Nav from "./components/nav"
import Game from "./pages/game"
import Home from "./pages/home"
import Practice from "./pages/practice"
import { createSession } from "./utils/modelHelper"

const { REACT_APP_UMAMI_URL, REACT_APP_UMAMI_ID } = process.env

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    if(REACT_APP_UMAMI_URL && REACT_APP_UMAMI_ID) {
      const scriptTag = document.createElement('script')
      scriptTag.src = REACT_APP_UMAMI_URL
      scriptTag['data-website-id'] = REACT_APP_UMAMI_ID
      document.head.appendChild(scriptTag)
    }
  }, [])

  useEffect(async () => {
    const session = await createSession()
    setSession(session)
  }, [])

  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/practice">
                <Nav />
                <Practice session={session} />
              </Route>
              <Route path="/game">
                <Nav />
                <Game session={session} />
              </Route>
              <Route path="/">
                <Nav />
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
