import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Paper, Typography, TableCell, TableBody, TableRow, Table, TableContainer } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Company, CompanyEditRequest, User } from "../../../models/models";
import CompanyEdit from './companyEdit';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';

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

    const isAdmin = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_ADMIN'
      );

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );
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

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const currentTime = new Date();
            const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
            const formattedDate = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')}`;
            printWindow.document.write(`
                <html>
                <head>
                    <title>${name} Employees</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h3>Employees of ${name}</h3>
                    <p>Printed by: ${profile?.firstName} ${profile?.lastName}</p>
                    <p>At: ${formattedDate} ${formattedTime}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>E-mail</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${company?.employees?.map((employee: User) => `
                                <tr>
                                    <td>${employee.id}</td>
                                    <td>${employee.firstName}</td>
                                    <td>${employee.lastName}</td>
                                    <td>${employee.email}</td>
                                    <td>${employee.role.replace("ROLE_", "")}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Company Details</DialogTitle>
            <DialogContent dividers style={{ height: '80vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Company Information</Typography>
                        <Paper elevation={2} style={{ padding: "20px", marginBottom: "20px" }}>
                            {isEditing ? (
                                <CompanyEdit 
                                    name={name}
                                    description={description}
                                    onNameChange={handleNameChange}
                                    onDescriptionChange={handleDescriptionChange}
                                />
                            ) : (
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell><Typography><b>{company?.name}</b></Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Description</TableCell>
                                                <TableCell><Typography><b>{company?.description}</b></Typography></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Paper>
                    </Grid>

                    {/* Секция для работников */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Workers</Typography>
                        <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handlePrint}
                                >
                                    Print
                                </Button>
                            </div>
                            <div style={{ height: 'auto', width: '100%' }}>
                                {company?.employees && (
                                    <DataGrid
                                        rows={company.employees.map((employee) => ({
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
                                        disableRowSelectionOnClick
                                        disableColumnSelector
                                        autoHeight
                                    />
                                )}
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

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
    { field: 'firstName', headerName: 'First Name', flex: 2, minWidth: 150 },
    { field: 'lastName', headerName: 'Last Name', flex: 2, minWidth: 150 },
    { field: 'email', headerName: 'E-mail', flex: 2, minWidth: 150 },
    { field: 'role', headerName: 'Role', flex: 2, minWidth: 150 },
];

export default CompanyDetailsDialog;
