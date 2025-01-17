import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../../store';
import { createCategory, removeCategory, updateCategoryById } from '../../../store/equipmentCategory/actionCreators';
import { CreateCategoryRequest } from '../../../models/models';

interface EquipmentCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  categories: { categoryId: number; name: string; expirationPeriodInMonths: number}[];
}

const EquipmentCategoryDialog: React.FC<EquipmentCategoryDialogProps> = ({ open, onClose, categories }) => {
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [expirationPeriod, setExpirationPeriod] = useState('');
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [editedExpirationPeriod, setEditedExpirationPeriod] = useState('');

  const profileId = useSelector(
    (state: IRootState) => state.auth.profileData.profile?.id
  );

  const isLoading = useSelector((state: IRootState) => state.equipmentCategory.isLoading);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleExpirationPeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationPeriod(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryName.trim() || expirationPeriod.trim()) {
      console.log(categoryName, expirationPeriod);
      dispatch(createCategory({ name: categoryName, adminId: Number(profileId), expirationPeriodInMonths: Number(expirationPeriod)} as CreateCategoryRequest));
      setCategoryName('');
      setExpirationPeriod('');
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    dispatch(removeCategory(categoryId));
  };

  const handleEditCategory = (category: { categoryId: number; name: string; expirationPeriodInMonths: number }) => {
    setEditCategoryId(category.categoryId);
    setEditedCategoryName(category.name);
    setEditedExpirationPeriod(String(category.expirationPeriodInMonths));
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setEditedCategoryName('');
    setEditedExpirationPeriod('');
  };

  const handleSaveEdit = (categoryId: number) => {
    dispatch(updateCategoryById({
      name: editedCategoryName,
      expirationPeriodInMonths: Number(editedExpirationPeriod),
    }, categoryId));
    setEditCategoryId(null);
    setEditedCategoryName('');
    setEditedExpirationPeriod('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Equipment Category</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={handleNameChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Expiration Period (In Months)"
            value={expirationPeriod}
            onChange={handleExpirationPeriodChange}
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
          disabled={isLoading || !categoryName.trim() || !expirationPeriod.trim()}
        >
          Add Category
        </Button>
        <Box mt={3}>
          <Typography variant="h6">Existing Categories</Typography>
          <List>
            {categories.map((category) => (
              <ListItem key={category.categoryId}>
                {editCategoryId === category.categoryId ? (
                  <>
                    <TextField
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      label="Category Name"
                      fullWidth
                    />
                    <TextField
                      value={editedExpirationPeriod}
                      onChange={(e) => setEditedExpirationPeriod(e.target.value)}
                      label="Expiration Period (Months)"
                      fullWidth
                    />
                    <IconButton
                      edge="end"
                      aria-label="confirm"
                      onClick={() => handleSaveEdit(category.categoryId)}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="cancel"
                      onClick={handleCancelEdit}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText primary={category.name} />
                    <ListItemText primary={category.expirationPeriodInMonths} />
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditCategory(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteCategory(category.categoryId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentCategoryDialog;
