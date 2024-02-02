import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


const Header = ( {version, country, flagPath} ) => {
  // Function to convert a string to title case
  const toTitleCase = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div id='headerbar'>
      { version === 'delegate' && (
        <>
          <Paper id='logoback' elevation={0}>
            <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
          </Paper>
          <Typography variant='h3'>{toTitleCase(country)}</Typography>
          <img id='flag' src={window.location.origin + flagPath} alt='United Nations Logo' />
        </>
      ) }

      { version === 'dias' && (
        <>
          <Paper id='logoback' elevation={0}>
            <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
          </Paper>
          <SettingsIcon id='settings'/>
        </>
      ) }

      { version === 'blank' && (
        <>
         
        </>
      ) }

    </div>
  );
}


export default Header;