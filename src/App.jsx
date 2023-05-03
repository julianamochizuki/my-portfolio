import "./App.css";
import Navbar from "./components/Navbar";
import { Box, ThemeProvider } from "@mui/material";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import { theme } from "./theme/theme";
import Home from "./components/Home";
import Left from "./components/LeftMenu";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="App" bgcolor="background.default">
        <Navbar />
        <Left />
        <Home />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </Box>
    </ThemeProvider>
  );
}

export default App;
