import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteEquipmentDialogProps {
    open: boolean;
    equipment: { id: number; name: string; serialNumber: string } | null;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteEquipmentDialog: React.FC<DeleteEquipmentDialogProps> = ({ open, equipment, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Equipment</DialogTitle>
            <DialogContent>
                {equipment ? (
                    <>
                        Are you sure you want to delete the equipment{" "}
                        <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                            {equipment.name} (Serial Number: {equipment.serialNumber})
                        </Typography>
                        ?
                    </>
                ) : (
                    "Are you sure you want to delete this equipment?"
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} sx={{color: "red"}}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteEquipmentDialog;
