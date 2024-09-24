import React from 'react';
import {
  Typography,
  Box,
} from '@mui/material';
import { Equipment, User, Company, Category } from '../../../models/models';
import api from '../../../api';

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
  console.log(equipment);
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

      {/* Добавьте отображение QR-кода */}
      <Box mt={2}>
        <Typography variant="body1">QR Code: </Typography>
        {equipment?.qrCode? (
                <img src={`http://localhost:8080/${equipment.qrCode}`} alt="QR Code" />
            ) : (
                <p>QR Code not available</p>
            )}
      </Box>
    </Box>
  );
};

export default EquipmentDetails;
