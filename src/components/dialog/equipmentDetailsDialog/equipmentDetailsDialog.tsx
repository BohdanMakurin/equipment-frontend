// EquipmentDetailsDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogActions,
} from '@mui/material';
import EquipmentDetails from './equipmentDetails';
import EquipmentEdit from './equipmentEdit';
import { Equipment, User, Company, Category, EquipmentEditRequest } from '../../../models/models';
import { SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';

interface EquipmentDetailsDialogProps {
  open: boolean;
  equipment: Equipment | null;
  onClose: () => void;
  onSave: (updatedEquipment: EquipmentEditRequest, equipmentId: number) => void;
  users: User[];
  companies: Company[];
  categories: Category[];
}

const EquipmentDetailsDialog: React.FC<EquipmentDetailsDialogProps> = ({
  open,
  equipment,
  onClose,
  onSave,
  users,
  companies,
  categories,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedEquipment, setEditedEquipment] = useState<Equipment | null>(equipment);

  const isAdmin = useSelector(
    (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_ADMIN'
);

const isManager = useSelector(
    (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_MANAGER'
);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedEquipment) {
      setEditedEquipment({
        ...editedEquipment,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<number>, name: string) => {
    const value = event.target.value;
        if (editedEquipment) {
            setEditedEquipment({
                ...editedEquipment,
                [name]: value,
                ...(name === 'category' && { category: categories.find(cat => cat.categoryId === value) || editedEquipment.category }),
                ...(name === 'company' && { company: companies.find(comp => comp.companyId === value) || editedEquipment.company }),
                ...(name === 'user' && { user: users.find(us => us.id === value) || editedEquipment.user }),
            });
        }
    };

  const handleSave = () => {
    if (editedEquipment) {
      const updatedEquipment: EquipmentEditRequest = {
        name: editedEquipment.name,
        description: editedEquipment.description,
        serialNumber: editedEquipment.serialNumber,
        categoryId: String(editedEquipment.category?.categoryId || ''),
        userId: String(editedEquipment.user?.id || ''),
        companyId: String(editedEquipment.company?.companyId || ''),
        location: editedEquipment.location || '',
      };

      onSave(updatedEquipment, editedEquipment.equipmentId);  
      setIsEditing(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Equipment Details</DialogTitle>
      <DialogContent dividers>
        {isEditing ? (
          <EquipmentEdit
            equipment={editedEquipment}
            users={users}
            companies={companies}
            categories={categories}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSave={handleSave}
            onCancel={handleEditToggle}
          />
        ) : (
          <EquipmentDetails
            equipment={editedEquipment}
            users={users}
            companies={companies}
            categories={categories}
          />
        )}
      </DialogContent>
      <DialogActions>
      {isAdmin || isManager ? 
        <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditToggle}
        >
        {isEditing ? 'Cancel Editing' : 'Edit'}
        </Button>
        {!isEditing && (
            <Button onClick={onClose} color="primary">
              CLOSE
            </Button>
        )}
        {isEditing && (
            <Button onClick={handleSave} color="primary">
              SAVE
            </Button>
        )}
        </>
      :
        <Button onClick={onClose} color="primary">
          CLOSE
        </Button>
      }
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentDetailsDialog;
