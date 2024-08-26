import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';

interface deleteCompanyDialogProps {
  open: boolean;
  company: any;
  onClose: () => void;
  onConfirm: () => void;
}

const deleteCompanyDialog: React.FC<deleteCompanyDialogProps> = ({
    open,
    company,
    onClose,
    onConfirm 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm delete company"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {company ? (
            <>
              Are you sure you want to delete the company{" "}
              <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                {company.name}
              </Typography>
              ?
            </>
          ) : (
            "Are you sure you want to delete this company?"
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus sx={{color: "red"}}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default deleteCompanyDialog;
