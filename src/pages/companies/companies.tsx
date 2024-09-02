import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { createCompany, editCompany, fetchCompaniesByAdminId, removeCompany } from "../../store/company/actionCreators";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CompanyDetailsDialog from "../../components/dialog/companyDetailsDialog/companyDetailsDialog";
import CreateCompanyDialog from "../../components/dialog/createCompanyDialog/createCompanyDialog";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteCompanyDialog from "../../components/dialog/deleteCompanyDialog/deleteCompanyDialog";
import { CompanyEditRequest } from "../../models/models";


const Companies = () => {
    const dispatch = useAppDispatch();
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreate, setOpenCreate] = useState(false); // Состояние для диалогового окна создания компании
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
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100},
        { field: 'companyName', headerName: 'Company Name', flex: 2, minWidth: 150},
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
        dispatch(editCompany(companyId, updatedCompany))
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreateCompany = (name: string, description: string) => {
        const adminId = Number(profileId);
        dispatch(createCompany({adminId, name, description}));
        setOpenCreate(false);
    };

    const handleCloseDeleteCompanyDialog = () => {
        setOpenDeleteCompanyDialog(false);
    };

    const handleConfirmDeleteCompany = () => {
        setOpenDeleteCompanyDialog(false); 
        dispatch(removeCompany(selectedCompany.companyId))
    };
    
    return (
        <div style={{ height: 'auto', width: '80%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                <h1 style={{ margin: 0 }}>Companies</h1>
                {/* <IconButton color="primary" onClick={handleOpenCreate}>
                    <AddCircleOutlineOutlinedIcon fontSize="large" />
                </IconButton> */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={handleOpenCreate}
                >
                    Add Company
                </Button>
            </div>
            <div style={{ height: 'auto', width: '100%', marginBottom: '100px'}}>
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
