// EquipmentEdit.tsx
import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogActions,
  SelectChangeEvent
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
  return (
    <>
      <TextField
        name="name"
        label="Name"
        value={equipment?.name || ''}
        onChange={onInputChange}
        fullWidth
        margin="dense"
      />
      <TextField
        name="description"
        label="Description"
        value={equipment?.description || ''}
        onChange={onInputChange}
        fullWidth
        margin="dense"
      />
      <TextField
        name="serialNumber"
        label="Serial Number"
        value={equipment?.serialNumber || ''}
        onChange={onInputChange}
        fullWidth
        margin="dense"
      />
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
        <FormControl fullWidth margin="dense">
            <InputLabel>Company</InputLabel>
            <Select
                name="company"
                value={equipment?.company?.companyId || ''}
                onChange={(e) => onSelectChange(e as SelectChangeEvent<number>, 'company')}
                label="Company"
                >
                {companies.map((company) => (
                    <MenuItem key={company.companyId} value={company.companyId}>
                    {company.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
        <InputLabel>User</InputLabel>
            <Select
            name="user"
            value={equipment?.user?.id || ''}
            onChange={(e) => onSelectChange(e as SelectChangeEvent<number>, 'user')}
            label="User"
            >
            {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        <TextField
            name="location"
            label="Location"
            value={equipment?.location || ''}
            onChange={onInputChange}
            fullWidth
            margin="dense"
        />
    </>
  );
};

export default EquipmentEdit;
