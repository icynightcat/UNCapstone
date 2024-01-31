import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import VoteBox from './VoteBox';


const CurrentMotion = ( {motion, onVote, country, abstain} ) => {
  const isMotion = Object.keys(motion).length > 0;

  return (
    <>
    { isMotion && (
      <Paper id="motion"> 
        <Typography className='motionText' variant='h2'>
          Vote on Current Motion
        </Typography>
        <hr className='blackLine' />
        <Typography className='motionText'>
          {'This is the current motion'}
        </Typography>
        <hr className='blackLine' id='middleLine'/>
        <VoteBox onVote={onVote} country={country} abstain={abstain}/>
      </Paper> 
    )}

    { !isMotion && (
      <Typography id='noMotion' variant='h4'>
        No Current Motion
      </Typography>
    )}
    </>
  );
};


export default CurrentMotion;