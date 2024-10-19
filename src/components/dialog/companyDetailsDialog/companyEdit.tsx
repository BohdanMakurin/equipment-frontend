// CompanyEdit.tsx

import React from 'react';
import { TextField, Grid, Paper, Typography, TableContainer, TableBody, Table, TableRow, TableCell } from '@mui/material';

interface CompanyEditProps {
  name: string;
  description: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyEdit: React.FC<CompanyEditProps> = ({ name, description, onNameChange, onDescriptionChange }) => {
  return (
    
    <TableContainer>
      <Table>
        <TableBody>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>
                  <TextField
                    label="Company Name"
                    value={name}
                    onChange={onNameChange}
                    fullWidth
                    margin="normal"
                  />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={onDescriptionChange}
                    fullWidth
                    margin="normal"
                  />
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};

export default CompanyEdit;
