import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Company, CompanyEditRequest, User } from "../../../models/models";
import CompanyEdit from './companyEdit';

interface CompanyDetailsDialogProps {
open: boolean;
company: Company | null; 
onClose: () => void;
onSave: (companyId: number, updatedCompany: CompanyEditRequest) => void;
}

    const CompanyDetailsDialog: React.FC<CompanyDetailsDialogProps> = ({ open, company, onClose, onSave }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    
    useEffect(() => {
        if (company) {
            setName(company.name || '');
            setDescription(company.description || '');
        }
    }, [company]);

    useEffect(() => {
        // При закрытии диалога сбрасываем состояние редактирования
        if (!open) {
        setIsEditing(false);
        }
    }, [open]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (company) {
            const updatedCompany = { ...company, name, description };
            onSave(company.companyId, updatedCompany);
            setIsEditing(false);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>{isEditing ? 'Edit Company Details' : 'Company Details'}</DialogTitle>
            <DialogContent dividers style={{ height: '80vh' }}>
                <Grid container spacing={2}>
                    {isEditing ? (
                        <CompanyEdit
                            name={name}
                            description={description}
                            onNameChange={handleNameChange}
                            onDescriptionChange={handleDescriptionChange}
                        />
                    ) : (
                        <Grid item xs={3}>
                            <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
                                <Typography variant="h6">Company Name: {name}</Typography>
                                <Typography variant="body1">Description: {description}</Typography>
                            </Paper>
                        </Grid>
                    )}
                    <Grid item xs={9}>
                        <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
                            <h2 style={{ marginBottom: '20px' }}>Employees</h2>
                            <div style={{ height: 'auto', width: '100%' }}>
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
                            </div>
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

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
    { field: 'firstName', headerName: 'First Name', flex: 2, minWidth: 150 },
    { field: 'lastName', headerName: 'Last Name', flex: 2, minWidth: 150 },
    { field: 'email', headerName: 'E-mail', flex: 2, minWidth: 150 },
    { field: 'role', headerName: 'Role', flex: 2, minWidth: 150 },
];

export default CompanyDetailsDialog;
