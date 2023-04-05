import React from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

const Nav = () => {
  const theme = useTheme()
  const location = useLocation()

  const navOptions = [
    { title: "Play Game", link: "/game" },
    { title: "Practice", link: "/practice" },
  ]

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar
        sx={{
          maxWidth: 1024,
          width: "100%",
          margin: "auto",
          boxSizing: "border-box",
          padding: "0 !important",
          color: "#FFF",
        }}
      >
        <Link to="/">
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#FFF" }}>
            ASL Coach
          </Typography>
        </Link>
        <div style={{ flex: 1 }}>&nbsp;</div>
        {navOptions.map((option) => (
          <Link
            to={option.link}
            style={{
              margin: "auto 8px",
              ...(option.link === location.pathname && {
                borderBottom: "2px solid #FF9100",
                paddingTop: 2,
              }),
            }}
          >
            <Typography
              sx={{ fontSize: "18px", margin: "0 8px", color: "#FFF" }}
            >
              {option.title}
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default Nav
