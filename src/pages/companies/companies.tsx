import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { createCompany, editCompany, fetchCompaniesByAdminId, removeCompany } from "../../store/company/actionCreators";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CompanyDetailsDialog from "../../components/dialog/companyDetailsDialog/companyDetailsDialog";
import CreateCompanyDialog from "../../components/dialog/createCompanyDialog/createCompanyDialog";
import DeleteCompanyDialog from "../../components/dialog/deleteCompanyDialog/deleteCompanyDialog";
import { CompanyEditRequest } from "../../models/models";

const Companies = () => {
    const dispatch = useAppDispatch();
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [openDeleteCompanyDialog, setOpenDeleteCompanyDialog] = useState(false);

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    const isAdmin = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_ADMIN'
    );

    const profileId = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.id
    );
    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );
    useEffect(() => {
        if (isLoggedIn && isAdmin && profileId) {
            dispatch(fetchCompaniesByAdminId(Number(profileId)));
        }
    }, [isLoggedIn, isAdmin, dispatch]);

    const companies = useSelector(
        (state: IRootState) => state.companies.companies
    );

    const rows = companies.map((company) => ({
        id: company.companyId,
        companyName: company.name,
        description: company.description,
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
        { field: 'companyName', headerName: 'Company Name', flex: 2, minWidth: 150 },
        { field: 'description', headerName: 'Description', flex: 3, minWidth: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <Box display="flex" justifyContent="start" width="100%">
                    <IconButton
                        color="primary"
                        onClick={() => handleEditClick(params.row.id)}
                    >
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const handleEditClick = (companyId: number) => {
        const company = companies.find(company => company.companyId === companyId);
        if (company) {
            setSelectedCompany(company);
            setOpenDetails(true);
        }
    };

    const handleDeleteClick = (companyId: number) => {
        const company = companies.find(company => company.companyId === companyId);
        if (company) {
            setSelectedCompany(company);
            setOpenDeleteCompanyDialog(true);
        }
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedCompany(null);
    };

    const handleSaveDetails = (companyId: number, updatedCompany: CompanyEditRequest) => {
        dispatch(editCompany(companyId, updatedCompany));
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreateCompany = (name: string, description: string) => {
        const adminId = Number(profileId);
        dispatch(createCompany({ adminId, name, description }));
        setOpenCreate(false);
    };

    const handleCloseDeleteCompanyDialog = () => {
        setOpenDeleteCompanyDialog(false);
    };

    const handleConfirmDeleteCompany = () => {
        setOpenDeleteCompanyDialog(false);
        dispatch(removeCompany(selectedCompany.companyId));
    };

    // New function to print the table
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const currentTime = new Date();
            const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
            const formattedDate = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')}`;
            printWindow.document.write(`
                <html>
                <head>
                    <title>Company Table</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h3>Companies Table</h3>
                    <p>Printed by: ${profile?.firstName} ${profile?.lastName} </p>
                    <p> At: ${formattedDate} ${formattedTime} </p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map(row => `
                                <tr>
                                    <td>${row.id}</td>
                                    <td>${row.companyName}</td>
                                    <td>${row.description}</td>
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
        <div style={{ height: 'auto', width: '80%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                <h1 style={{ margin: 0 }}>Companies</h1>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={handleOpenCreate}
                    >
                        Add Company
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handlePrint}
                        style={{ marginLeft: '10px' }}
                    >
                        Print
                    </Button>
                </div>
            </div>
            <div style={{ height: 'auto', width: '100%', marginBottom: '100px' }}>
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
                    disableRowSelectionOnClick
                    disableColumnSelector
                    autoHeight
                />
            </div>

            <CompanyDetailsDialog
                open={openDetails}
                company={selectedCompany}
                onClose={handleCloseDetails}
                onSave={handleSaveDetails}
            />

            <CreateCompanyDialog
                open={openCreate}
                onClose={handleCloseCreate}
                onCreate={handleCreateCompany}
            />

            <DeleteCompanyDialog
                open={openDeleteCompanyDialog}
                company={selectedCompany}
                onClose={handleCloseDeleteCompanyDialog}
                onConfirm={handleConfirmDeleteCompany}
            />
        </div>
    );
};

export default Companies;
