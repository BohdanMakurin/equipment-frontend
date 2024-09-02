import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../../store';
import { createCategory, removeCategory } from '../../../store/equipmentCategory/actionCreators';
import { CreateCategoryRequest } from '../../../models/models';

interface EquipmentCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  categories: { categoryId: number; name: string }[];
  
}

const EquipmentCategoryDialog: React.FC<EquipmentCategoryDialogProps> = ({ open, onClose, categories }) => {
  
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState('');

  const profileId = useSelector(
      (state: IRootState) => state.auth.profileData.profile?.id
  );

  const isLoading = useSelector((state: IRootState) => state.equipmentCategory.isLoading);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      dispatch(createCategory({ name: categoryName, adminId: Number(profileId)} as CreateCategoryRequest));
      setCategoryName('');
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    dispatch(removeCategory(categoryId));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Equipment Category</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
          disabled={isLoading || !categoryName.trim()}
        >
          Add Category
        </Button>
        <Box mt={3}>
          <Typography variant="h6">Existing Categories</Typography>
          <List>
            {categories.map((category) => (
              <ListItem key={category.categoryId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteCategory(category.categoryId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={category.categoryId} />
                <ListItemText primary={category.name} />
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
