import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface CreateEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string, description: string, serialNumber: string, categoryId: number, companyId: number) => void;
    categories: { categoryId: number; name: string }[]; // Список категорий оборудования
    companies: { companyId: number; name: string }[]; // Список компаний
}

const CreateEquipmentDialog: React.FC<CreateEquipmentDialogProps> = ({ open, onClose, onCreate, categories, companies }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [companyId, setCompanyId] = useState<number | ''>('');

    const handleSubmit = () => {
        if (name && description && serialNumber && categoryId && companyId) {
            onCreate(name, description, serialNumber, categoryId, companyId);
            setName('');
            setDescription('');
            setSerialNumber('');
            setCategoryId('');
            setCompanyId('');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Equipment</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Serial Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                />
                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value as number)}
                        label="Category"
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel>Company</InputLabel>
                    <Select
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value as number)}
                        label="Company"
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.companyId} value={company.companyId}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEquipmentDialog;
