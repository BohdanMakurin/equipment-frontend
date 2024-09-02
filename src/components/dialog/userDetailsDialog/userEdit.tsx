import React from 'react';
import { TextField, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Company } from '../../../models/models';

interface UserEditProps {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    selectedCompanyId: number; // Добавляем проп для выбранной компании
    companies: Company[];
    onFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRoleChange: (event: SelectChangeEvent<string>) => void;
    onCompanyChange: (event: SelectChangeEvent<number>) => void; // Добавляем проп для изменения компании
}

const UserEdit: React.FC<UserEditProps> = ({
    firstName,
    lastName,
    email,
    role,
    selectedCompanyId,
    companies,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onRoleChange,
    onCompanyChange
}) => {
    const roles = ['ADMIN', 'USER', 'MANAGER'];

    return (
        <Grid item xs={3}>
            <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
                <Typography variant="h6" gutterBottom>Edit User Details</Typography>
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={onFirstNameChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={onLastNameChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={onEmailChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="company-select-label">Company</InputLabel>
                    <Select
                        labelId="company-select-label"
                        value={selectedCompanyId}
                        onChange={onCompanyChange}
                        label="Company"
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.companyId} value={company.companyId}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        value={role}
                        onChange={onRoleChange}
                        label="Role"
                    >
                        {roles.map((roleName) => (
                            <MenuItem key={roleName} value={roleName}>
                                {roleName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>
        </Grid>
    );
};

export default UserEdit;
