// CompanyEdit.tsx

import React from 'react';
import { TextField, Grid, Paper, Typography } from '@mui/material';

interface CompanyEditProps {
  name: string;
  description: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyEdit: React.FC<CompanyEditProps> = ({ name, description, onNameChange, onDescriptionChange }) => {
  return (
    
    <Grid item xs={3}>
    <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
        <Typography variant="h6">Edit Company Details</Typography>
        <TextField
        label="Company Name"
        value={name}
        onChange={onNameChange}
        fullWidth
        margin="normal"
        />
        <TextField
        label="Description"
        value={description}
        onChange={onDescriptionChange}
        fullWidth
        margin="normal"
        />
    </Paper>
    </Grid>
    
  );
};

export default CompanyEdit;
