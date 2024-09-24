import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Typography, Box, Button, DialogActions, Paper, IconButton } from '@mui/material';
import { Company, EditUserRequest, Equipment, User } from '../../../models/models';
import UserEdit from './userEdit'; // Импортируем компонент UserEdit
import { SelectChangeEvent } from '@mui/material';
import { fetchEquipmentByUserId } from "../../../store/equipment/actionCreators";
import { IRootState, useAppDispatch } from '../../../store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
interface UserDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (id: number, updatedUser: EditUserRequest) => void;
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
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userDetails) {
            setFirstName(userDetails.firstName);
            setLastName(userDetails.lastName);
            setEmail(userDetails.email);
            setRole(userDetails.role.replace("ROLE_", ""));
            setSelectedCompanyId(userDetails.company.companyId);
            dispatch(fetchEquipmentByUserId(Number(userDetails.id))); 
                    
        }
    }, [userDetails]);

    const equipment = useSelector(
        (state: IRootState) => state.equipment.equipmentList
        
    );

    const isAdmin = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.role === "ROLE_ADMIN"
        
    );
    
    const rows = equipment.map((item) => ({
        id: item.equipmentId,
        name: item.name,
        serialNumber: item.serialNumber,
        category: item.category.name,
        location: item.location,
        company: item.company.name
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100},
        { field: 'name', headerName: 'Name', flex: 2, minWidth: 150},
        { field: 'serialNumber', headerName: 'Serial Number', flex: 2, minWidth: 150 },
        { field: 'category', headerName: 'Category', flex: 2, minWidth: 150 },
        { field: 'location', headerName: 'Location', flex: 2, minWidth: 150 },
        { field: 'company', headerName: 'Company', flex: 2, minWidth: 150 },
        
    ];

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        const updatedUser: EditUserRequest = {
            firstName,
            lastName,
            email,
            role: `ROLE_${role}`,
            companyId: selectedCompanyId
        };
        onSave(userDetails.id, updatedUser);
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
                            <div style={{ height: 'auto', width: '100%' }}>
                                
                                    <DataGrid
                                    rows={rows}
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
                                
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {isAdmin ?
                    <>
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
                    </>
                :
                    <Button onClick={onClose} color="primary">
                        CLOSE
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;
