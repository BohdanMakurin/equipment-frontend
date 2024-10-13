import React, { useRef } from 'react';
import {
  Typography,
  Box,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Button,
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
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print QR Code</title>
            </head>
            <body>${printContent}</body>
          </html>
        `);

        // Ждем загрузки содержимого и затем вызываем печать
        printWindow.document.close();
        printWindow.focus();
        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      }
    }
  };

  const user = users.find((u) => u.id === equipment?.userId);
  const ownerName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  return (
    <Box mb={2} textAlign="center">
      <Typography variant="h4" gutterBottom>Equipment Details</Typography>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell><Typography>Main Information</Typography></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell><Typography><b>{equipment?.name || 'Not provided'}</b></Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell><Typography><b>{equipment?.description || 'Not provided'}</b></Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell><Typography><b>{equipment?.serialNumber || 'Not provided'}</b></Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell><Typography><b>{equipment?.category?.name || 'Not assigned'}</b></Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell><Typography><b>{equipment?.company?.name || 'Not assigned'}</b></Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell><Typography><b>{ownerName}</b></Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell><Typography><b>{equipment?.location}</b></Typography></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box mt={4}>
        <Typography variant="h6">QR Code:</Typography>
        {equipment?.qrCode ? (
          <>
            <img
              src={`http://localhost:8080/${equipment.qrCode}`}
              alt="QR Code"
              style={{ cursor: 'pointer', width: '150px', height: '150px' }}
              onClick={handlePrint}
            />
            <div style={{ display: 'none' }} ref={printRef}>
              <img src={`http://localhost:8080/${equipment.qrCode}`} alt="QR Code" />
            </div>
          </>
        ) : (
          <p>QR Code not available</p>
        )}
      </Box>

    </Box>
  );
};

export default EquipmentDetails;
