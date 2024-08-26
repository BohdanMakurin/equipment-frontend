import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Card, CardContent, Typography, Box, Button, DialogActions, Divider, Paper } from '@mui/material';
import { User } from '../../../api/users/types';

interface UserDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    userDetails: User;
};


const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ open, onClose, onSave, userDetails }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{marginBottom: "20px"}}>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent dividers style={{ height: '80vh'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={2} style={{ padding: "20px"}}>
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
                                <Typography>{`${userDetails.firstName}'s role: ${userDetails.role.replace("ROLE_","")}`}</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Правый блок: оборудование пользователя */}
                    <Grid item xs={12} md={8}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{userDetails.firstName}'s Equipment</Typography>
                                {/* {userDetails.equipment.map((item, index) => (
                                    <Box key={index} display="flex" justifyContent="space-between" p={1} mb={1} border={1} borderRadius={4}>
                                        <Typography>{item.name}</Typography>
                                        <Typography>{item.serialNumber}</Typography>
                                        <Typography>{item.category}</Typography>
                                        <Box width={30} height={30} bgcolor="#ddd"></Box> 
                                    </Box>
                                ))} */}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSave} color="primary">
                SAVE
                </Button>
                <Button onClick={onClose} color="primary">
                CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;
