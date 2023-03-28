import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  palette: {
    palette: {
      primary: {
        main: '#43a047',
      },
      secondary: {
        main: '#ff7043',
      },
      type: 'light',
    },
    text: {
      main: "#FFFFFF",
      grey: "#555555",
      dark: "#303030",
    },
    typography: {
      fontFamily: "Red Hat Display",
    },
  },
})

export default theme
