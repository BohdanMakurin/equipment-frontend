import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';

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
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!firstName || !lastName || !email || !password || !role || !companyId) {
            setError('All fields are required');
            return;
        }
        setError(null); // Сбросить ошибку, если все поля заполнены
        onCreate(firstName, lastName, email, password, role, companyId);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRole('');
        setCompanyId('');
    };

    const handleClose = () => {
        onClose();
        // Сброс состояния при закрытии
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRole('');
        setCompanyId('');
        setError(null);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
                    error={!firstName && Boolean(error)} // Указать ошибку
                />
                {!firstName && error && <FormHelperText error>{error}</FormHelperText>} {/* Сообщение об ошибке */}

                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!lastName && Boolean(error)} // Указать ошибку
                />
                {!lastName && error && <FormHelperText error>{error}</FormHelperText>} {/* Сообщение об ошибке */}

                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!email && Boolean(error)} // Указать ошибку
                />
                {!email && error && <FormHelperText error>{error}</FormHelperText>} {/* Сообщение об ошибке */}

                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!password && Boolean(error)} // Указать ошибку
                />
                {!password && error && <FormHelperText error>{error}</FormHelperText>} {/* Сообщение об ошибке */}

                <FormControl fullWidth margin="dense" variant="outlined" error={!role && Boolean(error)}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as string)}
                        label="Role"
                    >
                        <MenuItem value="ROLE_USER">User</MenuItem>
                        <MenuItem value="ROLE_MANAGER">Manager</MenuItem>
                    </Select>
                    {!role && error && <FormHelperText>Please select a role</FormHelperText>} {/* Сообщение об ошибке */}
                </FormControl>

                <FormControl fullWidth margin="dense" variant="outlined" error={!companyId && Boolean(error)}>
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
                    {!companyId && error && <FormHelperText>Please select a company</FormHelperText>} {/* Сообщение об ошибке */}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
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
