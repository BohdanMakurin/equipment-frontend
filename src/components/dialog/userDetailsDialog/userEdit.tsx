import React from 'react';
import { TextField, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Dialog, TableContainer, TableBody, Table, TableCell, TableRow } from '@mui/material';
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
        <Grid container spacing={2}>
            {/* Информация для редактирования */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Edition Information</Typography>
                <Paper elevation={2} style={{ padding: "20px", position: 'relative' }}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>
                                        <TextField
                                            value={email}
                                            onChange={onEmailChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>
                                        <TextField
                                            value={lastName}
                                            onChange={onLastNameChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>
                                        <TextField
                                            value={firstName}
                                            onChange={onFirstNameChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>

            {/* Роль в компании */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Company Role</Typography>
                <Paper elevation={2} style={{ padding: "20px", position: 'relative' }}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name of Company</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
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
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Role in Company</TableCell>
                                    <TableCell>
                                        <FormControl fullWidth>
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
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserEdit;
