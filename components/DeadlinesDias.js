import React from "react";
import { Paper, Typography, IconButton} from "@mui/material";
import './DiasComponents.css';
import CloseIcon from '@mui/icons-material/Close';

const DeadlineDias = ({ deadline, version, removeDeadline}) => {

  return (
    <>
      { version === 'diasHome' ? (
      <Paper id={'oneDeadline'} elevation={0}>
        <Typography>{deadline?.deadlineAdded ?? "Deadline"}</Typography>
        <IconButton onClick={() => removeDeadline(deadline)} >
          <CloseIcon style={{ color: "red" }} fontSize="medium"/>
        </IconButton>
      </Paper>
      ) : (
        <Paper id={'presentationDeadline'} elevation={0}>
          <Typography variant="h2" style={{ fontSize:'1.5rem' }}>{deadline?.deadlineAdded ?? "Deadline"}</Typography>
        </Paper>
      )}
    </>
  );
}

export default DeadlineDias;