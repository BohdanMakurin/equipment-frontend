import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// Обновите интерфейс, чтобы включить список компаний
interface CreateUserDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (firstName: string, lastName: string, email: string, password: string, role: string, companyId: number) => void;
    companies: { companyId: number; name: string }[]; // Список компаний
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose, onCreate, companies }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [companyId, setCompanyId] = useState<number | ''>('');

    const handleSubmit = () => {
        if (firstName && lastName && email && password && role && companyId) {
            onCreate(firstName, lastName, email, password, role, companyId);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRole('');
            setCompanyId('');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as string)}
                        label="Role"
                    >
                        <MenuItem value="ROLE_USER">User</MenuItem>
                        <MenuItem value="ROLE_MANAGER">Manager</MenuItem>
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

export default CreateUserDialog;
