import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Typography, Box, Button, DialogActions, Paper } from '@mui/material';
import { Company, User } from '../../../models/models';
import UserEdit from './userEdit'; // Импортируем компонент UserEdit
import { SelectChangeEvent } from '@mui/material';

interface UserDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
    userDetails: User;
    companies: Company[];
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ open, onClose, onSave, userDetails, companies }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>(userDetails.firstName);
    const [lastName, setLastName] = useState<string>(userDetails.lastName);
    const [email, setEmail] = useState<string>(userDetails.email);
    const [role, setRole] = useState<string>(userDetails.role.replace("ROLE_", ""));
    const [selectedCompanyId, setSelectedCompanyId] = useState<number>(userDetails.company.companyId);

    useEffect(() => {
        if (userDetails) {
            setFirstName(userDetails.firstName);
            setLastName(userDetails.lastName);
            setEmail(userDetails.email);
            setRole(userDetails.role.replace("ROLE_", ""));
            setSelectedCompanyId(userDetails.company.companyId);
        }
    }, [userDetails]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        const updatedUser: User = {
            ...userDetails,
            firstName,
            lastName,
            email,
            role: `ROLE_${role}`,
            company: companies.find(company => company.companyId === selectedCompanyId) || userDetails.company
        };
        onSave(updatedUser);
        setIsEditing(false);
    };

    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        setRole(event.target.value as string);
    };

    const handleCompanyChange = (event: SelectChangeEvent<number>) => {
        setSelectedCompanyId(event.target.value as number);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ marginBottom: "20px" }}>
            <DialogTitle>{isEditing ? "Edit User Details" : "User Details"}</DialogTitle>
            <DialogContent dividers style={{ height: '80vh' }}>
                <Grid container spacing={2}>
                    {isEditing ? (
                        <UserEdit
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            role={role}
                            selectedCompanyId={selectedCompanyId} // Передаем выбранную компанию
                            companies={companies}
                            onFirstNameChange={(e) => setFirstName(e.target.value)}
                            onLastNameChange={(e) => setLastName(e.target.value)}
                            onEmailChange={(e) => setEmail(e.target.value)}
                            onRoleChange={handleRoleChange}
                            onCompanyChange={handleCompanyChange} // Передаем функцию для изменения компании
                        />
                    ) : (
                        <Grid item xs={3}>
                            <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
                                <Typography variant="h6" gutterBottom>{userDetails.firstName}'s Profile</Typography>
                                <Box border={1} borderRadius={4} p={2} borderColor="black" mb={2}>
                                    <Typography>Email: {userDetails.email}</Typography>
                                    <Typography>First Name: {userDetails.firstName}</Typography>
                                    <Typography>Last Name: {userDetails.lastName}</Typography>
                                    <Typography>Profile was created: {userDetails.createdAt.toString().split('T')[0]}</Typography>
                                </Box>
                                <Typography variant="h6" gutterBottom>Company</Typography>
                                <Box border={1} borderRadius={4} p={2}>
                                    <Typography>{userDetails.company.name}</Typography>
                                    <Typography>{`${userDetails.firstName}'s role: ${role}`}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    )}
                    <Grid item xs={9}>
                        <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
                            <h2 style={{ marginBottom: '20px' }}>{userDetails.firstName}'s equipment</h2>
                            {/* <div style={{ height: 'auto', width: '100%' }}>
                                {company?.employees && (
                                    <DataGrid
                                        rows={company?.employees.map((employee: User) => ({
                                            id: employee.id,
                                            firstName: employee.firstName,
                                            lastName: employee.lastName,
                                            email: employee.email,
                                            role: employee.role.replace("ROLE_", ""),
                                        }))}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        disableColumnResize
                                        autoHeight
                                    />
                                )}
                            </div> */}
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditToggle}
                >
                {isEditing ? 'Cancel Editing' : 'Edit'}
                </Button>
                {!isEditing && (
                    <Button onClick={onClose} color="primary">
                        CLOSE
                    </Button>
                )}
                {isEditing && (
                    <Button onClick={handleSave} color="primary">
                        SAVE
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;
