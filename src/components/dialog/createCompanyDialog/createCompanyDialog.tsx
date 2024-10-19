import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormHelperText } from '@mui/material';

interface CreateCompanyDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const CreateCompanyDialog: React.FC<CreateCompanyDialogProps> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = () => {
    if (!name || !description) {
      setError('Both fields are required');
      return;
    }
    setError(null); // Сбросить ошибку, если все поля заполнены
    onCreate(name, description);
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    onClose();
    setName('');
    setDescription('');
    setError(null);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Company</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Company Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!name && Boolean(error)} // Указать ошибку
        />
        {!name && error && <FormHelperText error>{error}</FormHelperText>} {/* Сообщение об ошибке */}
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!description && Boolean(error)} // Указать ошибку
        />
        {!description && error && <FormHelperText error>{error}</FormHelperText>} {/* Сообщение об ошибке */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCompanyDialog;
