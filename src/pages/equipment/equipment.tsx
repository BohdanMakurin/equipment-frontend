import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createEquipment, removeEquipment, fetchEquipmentByAdminId, updateEquipmentById, fetchEquipmentByCompanyId, fetchEquipmentByUserId } from "../../store/equipment/actionCreators";
import EquipmentDetailsDialog from "../../components/dialog/equipmentDetailsDialog/equipmentDetailsDialog";
import EquipmentDeleteDialog from "../../components/dialog/deleteEquipmentDialog/deleteEquipmentDialog";
import EquipmentCategoryDialog from "../../components/dialog/equipmentCategoryDialog/equipmentCategoryDialog";
import { fetchCompaniesByAdminId } from "../../store/company/actionCreators";
import CreateEquipmentDialog from "../../components/dialog/createEquipmentDialog/createEquipmentDialog";
import { fetchCategoriesByAdminId } from "../../store/equipmentCategory/actionCreators";
import { fetchUsersByAdminId, fetchUsersByCompanyId } from "../../store/user/actionCreators";
import { EquipmentEditRequest } from "../../models/models";
import { find } from "@reduxjs/toolkit/dist/utils";

const Equipment = () => {
    const dispatch = useAppDispatch();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false); 

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    const isAdmin = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_ADMIN'
    );

    const isManager = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_MANAGER'
    );

    const profileId = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.id
    );

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );

    useEffect(() => {
        if (isLoggedIn && isAdmin && profileId) {
            dispatch(fetchEquipmentByAdminId(Number(profileId)));
            dispatch(fetchCompaniesByAdminId(Number(profileId))); 
            dispatch(fetchCategoriesByAdminId(Number(profileId))); 
            dispatch(fetchUsersByAdminId(Number(profileId)))
        }else if (isLoggedIn && isManager && profile){
            dispatch(fetchEquipmentByCompanyId(Number(profile.company.companyId)));
            dispatch(fetchCompaniesByAdminId(Number(profile.company.admin.id))); 
            dispatch(fetchCategoriesByAdminId(Number(profile.company.admin.id))); 
            dispatch(fetchUsersByCompanyId(Number(profile.company.companyId)));
        }else if((isLoggedIn && !isManager && !isAdmin && profile)){
            dispatch(fetchEquipmentByUserId(Number(profileId)));
        }
    }, [isLoggedIn, isAdmin, dispatch, profileId, profile, isManager]);

    const equipment = useSelector(
        (state: IRootState) => state.equipment.equipmentList
        
    );

    const companies = useSelector(
        (state: IRootState) => state.companies.companies
    );

    const categories = useSelector(
        (state: IRootState) => state.equipmentCategory.categories
    );
    const users = useSelector(
        (state: IRootState) => state.users.users
    );
    const rows = equipment.map((item) => ({
        id: item.equipmentId,
        name: item.name,
        serialNumber: item.serialNumber,
        category: item.category.name,
        location: item.location,
        owner: item.user? item.user.firstName + " " + item.user.lastName : "No specified",
        // owner: users.find((user) => user.id == item.user)
        company: item.company.name
    }));
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100},
        { field: 'name', headerName: 'Name', flex: 2, minWidth: 150},
        { field: 'serialNumber', headerName: 'Serial Number', flex: 2, minWidth: 150 },
        { field: 'category', headerName: 'Category', flex: 2, minWidth: 150 },
        { field: 'location', headerName: 'Location', flex: 2, minWidth: 150 },
        { field: 'owner', headerName: 'Owner', flex: 2, minWidth: 150 },
        { field: 'company', headerName: 'Company', flex: 2, minWidth: 150 },
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
                    {isAdmin || isManager ? 
                    <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    : []}
                </Box>
            ),
        },
    ];

    const handleEditClick = (id: number) => {
        const item = equipment.find(equip => equip.equipmentId === id);
        if (item) {
            setSelectedEquipment(item);
            setOpenDetails(true);
        }
    };

    const handleDeleteClick = (id: number) => {
        const item = equipment.find(equip => equip.equipmentId === id);
        if (item) {
            setSelectedEquipment(item);
            setOpenDeleteDialog(true);
        }
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedEquipment(null);
    };

    const handleSaveDetails = (updatedEquipment:EquipmentEditRequest, equipmentId: number) => {
        dispatch(updateEquipmentById(updatedEquipment, equipmentId));
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        if (selectedEquipment) {
            dispatch(removeEquipment(selectedEquipment.equipmentId));
            setOpenDeleteDialog(false);
        }
    };

    const handleOpenCategoryDialog = () => {
        setOpenCategoryDialog(true);
    };

    const handleCloseCategoryDialog = () => {
        setOpenCategoryDialog(false);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreateEquipment = (name: string, description: string, serialNumber: string, categoryId: number, companyId: number) => {
        dispatch(createEquipment({ name, description, serialNumber, categoryId, companyId }));
        setOpenCreate(false);
    };

    return (
        <div style={{ height: 'auto', width: '80%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                <h1 style={{ margin: 0 }}>Equipment</h1>
                {isAdmin || isManager?
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={handleOpenCategoryDialog}
                    >
                        View EquipmentCategories
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={() => setOpenCreate(true)}
                    >
                        Add Equipment
                    </Button>
                </>
                :[]}
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
                    autoHeight
                />
            </div>
            
            <CreateEquipmentDialog
                open={openCreate}
                onClose={handleCloseCreate}
                onCreate={handleCreateEquipment}
                companies={companies} 
                categories={categories}
            />

            {selectedEquipment && (
                <EquipmentDetailsDialog
                    open={openDetails}
                    onClose={handleCloseDetails}
                    onSave={handleSaveDetails}
                    equipment={selectedEquipment}
                    users={users} 
                    companies={companies}
                    categories={categories}
                />
            )}

            <EquipmentDeleteDialog
                open={openDeleteDialog}
                equipment={selectedEquipment}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
            />

            <EquipmentCategoryDialog
                open={openCategoryDialog}
                onClose={handleCloseCategoryDialog}
                categories={categories}
            />
        </div>
    );
};

export default Equipment;
