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
import SelectCompanyDialog from "../../components/dialog/selectCompanyDialog/selectCompanyDialog";
import { getExpiredEquipment } from "../../api/equipment";

const Equipment = () => {
    const dispatch = useAppDispatch();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [openSelectCompanyDialog, setOpenSelectCompanyDialog] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
    const [expiredEquipment, setExpiredEquipment] = useState<any[]>([]);

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
        } else if (isLoggedIn && isManager && profile) {
            dispatch(fetchEquipmentByCompanyId(Number(profile.company.companyId)));
            dispatch(fetchCompaniesByAdminId(Number(profile.company.admin.id)));
            dispatch(fetchCategoriesByAdminId(Number(profile.company.admin.id)));
            dispatch(fetchUsersByCompanyId(Number(profile.company.companyId)));
        } else if (isLoggedIn && !isManager && !isAdmin && profile) {
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

    const rows = equipment.map((item) => {
        const user = users.find((u) => u.id === item.userId);
        let owner = user ? `${user.firstName} ${user.lastName}` : 'Not specified';
        let location = item.location ? `${item.location}` : 'Not specified';
        if (!isAdmin && !isManager) {
            owner = `${profile?.firstName} ${profile?.lastName}`;
        }
        return {
            id: item.equipmentId,
            name: item.name,
            serialNumber: item.serialNumber,
            category: item.category.name,
            location: location,
            owner: owner,
            company: item.company.name
        };
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
        { field: 'name', headerName: 'Name', flex: 2, minWidth: 150 },
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

    const handleSaveDetails = (updatedEquipment: EquipmentEditRequest, equipmentId: number) => {
        dispatch(updateEquipmentById(updatedEquipment, equipmentId)).then(() => {
            dispatch(fetchEquipmentByAdminId(Number(profileId)));
        });
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
    
    const handlePrintTable = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const currentTime = new Date();
            const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
            const formattedDate = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')}`;
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Equipment Table</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                        </style>
                    </head>
                    <body>
                        <h3>Equipment Table</h3>              
                        <p>Printed by: ${profile?.firstName} ${profile?.lastName} </p>
                        <p> At: ${formattedDate} ${formattedTime} </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Serial Number</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>Owner</th>
                                    <th>Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows.map(row => `
                                    <tr>
                                        <td>${row.id}</td>
                                        <td>${row.name}</td>
                                        <td>${row.serialNumber}</td>
                                        <td>${row.category}</td>
                                        <td>${row.location}</td>
                                        <td>${row.owner}</td>
                                        <td>${row.company}</td>
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

    const handleOpenSelectCompanyDialog = () => {
        setOpenSelectCompanyDialog(true);
    };

    const handleCloseSelectCompanyDialog = () => {
        setOpenSelectCompanyDialog(false);
    };

    const handleSelectCompany = (companyId: number) => {
        setSelectedCompanyId(companyId);
        setOpenSelectCompanyDialog(false);

        getExpiredEquipment(companyId).then((response) => {
            const expired = response.data; 
            if (expired.length === 0) {
                alert('Company has no expired equipment');
            } else {
                setExpiredEquipment(expired); 
                handlePrintExpiredEquipment(expired); 
            }
        }).catch((error) => {
            console.error('Error fetching expired equipment', error);
        });
    };

    const handlePrintExpiredEquipment = (expiredEquipment: any[]) => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const currentTime = new Date();
            const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
            const formattedDate = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')}`;

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Expired Equipment</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                        </style>
                    </head>
                    <body>
                        <h3>Expired Equipment</h3>              
                        <p>Printed by: ${profile?.firstName} ${profile?.lastName}</p>
                        <p>At: ${formattedDate} ${formattedTime}</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Serial Number</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>Owner</th>
                                    <th>Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${expiredEquipment.map(row => `
                                    <tr>
                                        <td>${row.id}</td>
                                        <td>${row.name}</td>
                                        <td>${row.serialNumber}</td>
                                        <td>${row.category.name}</td>
                                        <td>${row.location}</td>
                                        <td>${row.user.firstName} ${row.user.lastName}</td>
                                        <td>${row.company.name}</td>
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
                <h1 style={{ margin: 0 }}>Equipment</h1>
                {isAdmin || isManager ?
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={handleOpenCategoryDialog}
                        >
                            View Equipment Categories
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => setOpenCreate(true)}
                        >
                            Add Equipment
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleOpenSelectCompanyDialog}
                        >
                            View Expired Equipment
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handlePrintTable}
                        >
                            Print
                        </Button>
                    </>
                    : []}
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
                    disableRowSelectionOnClick
                    disableColumnSelector
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
            <SelectCompanyDialog
                open={openSelectCompanyDialog}
                onClose={handleCloseSelectCompanyDialog}
                onSelect={handleSelectCompany}
                companies={companies}
            />
        </div>
    );
};

export default Equipment;
