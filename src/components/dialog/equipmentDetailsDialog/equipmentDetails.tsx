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
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import {QRCodeSVG} from 'qrcode.react';

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
            <body onload="window.print(); window.close();">
              ${printContent}
            </body>
          </html>
        `);
        
        
        printWindow.document.close();
        printWindow.focus();
      }
    }
  };
  const isAdmin = useSelector(
    (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_ADMIN'
  );

  const isManager = useSelector(
      (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_MANAGER'
  );

  const profile = useSelector(
      (state: IRootState) => state.auth.profileData.profile
  );

  const user = users.find((u) => u.id === equipment?.userId);
  let ownerName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  
  if (!isAdmin && !isManager) {
    ownerName = `${profile?.firstName} ${profile?.lastName}`;
  }
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
            {/* Генерация QR-кода из ключа */}
            <QRCodeSVG value={equipment.qrCode} size={150} style={{ cursor: 'pointer' }} onClick={handlePrint} />
            <div style={{ display: 'none' }} ref={printRef}>
              <QRCodeSVG value={equipment.qrCode} size={150} />
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
