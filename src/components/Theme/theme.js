import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme ({
    typography: {
        useNextVariants: true,
      },
overrides: {
    MuiButton: {
        root: {
            color:'white',
            border: '2px solid white',
            fontFamily: `'Loved By The King', sans-serif`,
            borderRadius: 0,
            margin: '.5em 0'
        }
    }
}
});
