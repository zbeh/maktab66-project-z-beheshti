import {createTheme} from '@mui/material/styles'
import { faIR} from '@mui/material/locale';
export  const theme = createTheme({
    typography: {
      fontFamily: [
        'main',
      ].join(','),
    },
    faIR
});