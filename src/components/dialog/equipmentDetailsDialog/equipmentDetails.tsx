// EquipmentDetails.tsx
import React from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Equipment, User, Company, Category } from '../../../models/models';

interface EquipmentDetailsProps {
  equipment: Equipment | null;
  users: User[];
  companies: Company[];
  categories: Category[];
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({
  equipment,
  users,
  companies,
  categories,
}) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">Name: </Typography>
      <Typography><b>{equipment?.name || 'Not provided'}</b></Typography>

      <Typography variant="body1">Description: </Typography>
      <Typography><b>{equipment?.description || 'Not provided'}</b></Typography>

      <Typography variant="body1">Serial Number: </Typography>
      <Typography><b>{equipment?.serialNumber || 'Not provided'}</b></Typography>

      <Typography variant="body1">Category: </Typography>
      <Typography><b>{equipment?.category?.name || 'Not assigned'}</b></Typography>

      <Typography variant="body1">Company: </Typography>
      <Typography><b>{equipment?.company?.name || 'Not assigned'}</b></Typography>

      <Typography variant="body1">User: </Typography>
      <Typography><b>{equipment?.user?.firstName || 'Not assigned'} {equipment?.user?.lastName || ''}</b></Typography>

      <Typography variant="body1">Location: </Typography>
      <Typography><b>{equipment?.location || 'Not provided'}</b></Typography>
    </Box>
  );
};

export default EquipmentDetails;
