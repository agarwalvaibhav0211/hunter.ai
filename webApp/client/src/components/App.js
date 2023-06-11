import logo from '../img/logo.svg';
import '../css/App.css';
import { Router } from './Router';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>

      <Router />
      </ThemeProvider>
  );
}

export default App;
