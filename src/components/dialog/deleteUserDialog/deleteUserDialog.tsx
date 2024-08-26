import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteUserDialogProps {
    open: boolean;
    user: { id: number; firstName: string; lastName: string } | null;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, user, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                {user ? (
                    <>
                    Are you sure you want to delete the user{" "}
                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    ?
                    </>
                ) : (
                    "Are you sure you want to delete the user?"
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserDialog;
