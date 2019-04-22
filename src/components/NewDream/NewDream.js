import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the rule
      text: {
        background: 'transparent',
        border: '1px solid white',
        color: 'white',
        padding: '5px 10px',
        margin: '1em 0',
        display:'block',
        textAlign: 'center'
      },
    },
  },
  typography: { useNextVariants: true },
});

function NewDream() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>
          Add New Dream
      </Button>
    </MuiThemeProvider>
  );
}

export default NewDream;