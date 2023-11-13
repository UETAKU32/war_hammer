import { FC, PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import backgroundImage from '../images/background.jpg'



const theme = createTheme({
  typography: {
    fontFamily: 'JiyunoTsubasa, sans-serif',
  },
});

const containerStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export const GameThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={containerStyle}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </div>
  )
} 