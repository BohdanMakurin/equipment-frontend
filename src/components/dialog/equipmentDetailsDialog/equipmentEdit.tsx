import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogActions,
  SelectChangeEvent,
  Box,
  Table,
  TableCell,
  TableBody,
  Typography,
  TableRow
} from '@mui/material';
import { Equipment, User, Company, Category } from '../../../models/models';

interface EquipmentEditProps {
  equipment: Equipment | null;
  users: User[];
  companies: Company[];
  categories: Category[];
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: SelectChangeEvent<number>, name: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EquipmentEdit: React.FC<EquipmentEditProps> = ({
  equipment,
  users,
  companies,
  categories,
  onInputChange,
  onSelectChange,
  onSave,
  onCancel,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(equipment?.company?.companyId || null);

  const handleCompanyChange = (event: SelectChangeEvent<number>) => {
    const companyId = event.target.value;
    setSelectedCompany(Number(companyId));
    onSelectChange(event, 'company');
  };

  const filteredUsers = selectedCompany
    ? users.filter(user => user.company.companyId === selectedCompany)
    : users;

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
            <TableCell>
              <TextField
                name="name"
                label="Name"
                value={equipment?.name || ''}
                onChange={onInputChange}
                fullWidth
                margin="dense"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>
              <TextField
                name="description"
                label="Description"
                value={equipment?.description || ''}
                onChange={onInputChange}
                fullWidth
                margin="dense"
              />
            </TableCell>
            </TableRow>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell>
              <TextField
                name="serialNumber"
                label="Serial Number"
                value={equipment?.serialNumber || ''}
                onChange={onInputChange}
                fullWidth
                margin="dense"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>
              <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={equipment?.category?.categoryId || ''}
                  onChange={(e) => onSelectChange(e as SelectChangeEvent<number>, 'category')}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.categoryId} value={category.categoryId}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>
              <FormControl fullWidth margin="dense">
                <InputLabel>Company</InputLabel>
                <Select
                  name="company"
                  value={equipment?.company?.companyId || ''}
                  onChange={handleCompanyChange}
                  label="Company"
                >
                  {companies.map((company) => (
                    <MenuItem key={company.companyId} value={company.companyId}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>
              <FormControl fullWidth margin="dense">
                <InputLabel>User</InputLabel>
                <Select
                  name="user"
                  value={equipment?.userId || ''}
                  onChange={(e) => onSelectChange(e as SelectChangeEvent<number>, 'user')}
                  label="User"
                >
                  {filteredUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>
              <TextField
                name="location"
                label="Location"
                value={equipment?.location || ''}
                onChange={onInputChange}
                fullWidth
                margin="dense"
              />
            </TableCell>
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
              
            />
          </>
        ) : (
          <p>QR Code not available</p>
        )}
      </Box>

    </Box>
    // <>
    //   <TextField
    //     name="name"
    //     label="Name"
    //     value={equipment?.name || ''}
    //     onChange={onInputChange}
    //     fullWidth
    //     margin="dense"
    //   />
    //   <TextField
    //     name="description"
    //     label="Description"
    //     value={equipment?.description || ''}
    //     onChange={onInputChange}
    //     fullWidth
    //     margin="dense"
    //   />
    //   <TextField
    //     name="serialNumber"
    //     label="Serial Number"
    //     value={equipment?.serialNumber || ''}
    //     onChange={onInputChange}
    //     fullWidth
    //     margin="dense"
    //   />
    //   <FormControl fullWidth margin="dense">
    //     <InputLabel>Category</InputLabel>
    //     <Select
    //       name="category"
    //       value={equipment?.category?.categoryId || ''}
    //       onChange={(e) => onSelectChange(e as SelectChangeEvent<number>, 'category')}
    //       label="Category"
    //     >
    //       {categories.map((category) => (
    //         <MenuItem key={category.categoryId} value={category.categoryId}>
    //           {category.name}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth margin="dense">
    //     <InputLabel>Company</InputLabel>
    //     <Select
    //       name="company"
    //       value={equipment?.company?.companyId || ''}
    //       onChange={handleCompanyChange}
    //       label="Company"
    //     >
    //       {companies.map((company) => (
    //         <MenuItem key={company.companyId} value={company.companyId}>
    //           {company.name}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
      // <FormControl fullWidth margin="dense">
      //   <InputLabel>User</InputLabel>
      //   <Select
      //     name="user"
      //     value={equipment?.userId || ''}
      //     onChange={(e) => onSelectChange(e as SelectChangeEvent<number>, 'user')}
      //     label="User"
      //   >
      //     {filteredUsers.map((user) => (
      //       <MenuItem key={user.id} value={user.id}>
      //         {user.firstName} {user.lastName}
      //       </MenuItem>
      //     ))}
      //   </Select>
      // </FormControl>
      // <TextField
      //   name="location"
      //   label="Location"
      //   value={equipment?.location || ''}
      //   onChange={onInputChange}
      //   fullWidth
      //   margin="dense"
      // />
    // </>
  );
};

export default EquipmentEdit;
