import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { createUser, fetchUsersByAdminId, fetchUsersByCompanyId, removeUser, updateUserById } from "../../store/user/actionCreators";
import CreateUserDialog from "../../components/dialog/createUserDialog/createUserDialog";
import { fetchCompaniesByAdminId } from "../../store/company/actionCreators";
import DeleteUserDialog from "../../components/dialog/deleteUserDialog/deleteUserDialog";
import UserDetailsDialog from "../../components/dialog/userDetailsDialog/userDetailsDialog"; // Импортируем новый диалог
import { EditUserRequest, User } from "../../models/models";

const Users = () => {
    const dispatch = useAppDispatch();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);
    const [companies, setCompanies] = useState<any[]>([]); // Добавлено для хранения списка компаний
    const [userDetails, setUserDetails] = useState<any>(null); // Добавлено для хранения данных пользователя для деталей

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
            dispatch(fetchUsersByAdminId(Number(profileId)));
            dispatch(fetchCompaniesByAdminId(Number(profileId)));
        }else if (isLoggedIn && isManager && profile){
            dispatch(fetchUsersByCompanyId(Number(profile.company.companyId)))
        }

    }, [isLoggedIn, isAdmin, dispatch, profileId]);

    const users = useSelector(
        (state: IRootState) => state.users.users
    );

    const companiesFromState = useSelector(
        (state: IRootState) => state.companies.companies
    );

    useEffect(() => {
        setCompanies(companiesFromState); // Обновление списка компаний
    }, [companiesFromState]);

    const rows = users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company?.name || '',
        role: user.role.replace("ROLE_", ""),
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100},
        { field: 'firstName', headerName: 'First Name', flex: 2, minWidth: 150},
        { field: 'lastName', headerName: 'Last Name', flex: 2, minWidth: 150 },
        { field: 'email', headerName: 'E-mail', flex: 2, minWidth: 150 },
        { field: 'company', headerName: 'Company', flex: 2, minWidth: 150 },
        { field: 'role', headerName: 'Role', flex: 2, minWidth: 150 },
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
                    {isAdmin?
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

    const handleEditClick = (userId: number) => {
        const user = users.find(user => user.id === userId);
        if (user) {
            setUserDetails(user); // Устанавливаем детали пользователя
            setOpenDetails(true);
        }
    };

    const handleDeleteClick = (userId: number) => {
        const user = users.find(user => user.id === userId);
        if (user) {
            setSelectedUser(user);
            setOpenDeleteUserDialog(true);
        }
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setUserDetails(null);
    };

    const handleSaveDetails = (id: number, updatedUser: EditUserRequest) => {
        dispatch(updateUserById(id, updatedUser));
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreateUser = (firstName: string, lastName: string, email: string, password: string, role: string, companyId: number) => {
        dispatch(createUser({ firstName, lastName, email, password, role, companyId}));
        setOpenCreate(false);
    };

    const handleCloseDeleteUserDialog = () => {
        setOpenDeleteUserDialog(false);
    };

    const handleConfirmDeleteUser = () => {
        setOpenDeleteUserDialog(false); 
        dispatch(removeUser(selectedUser.id));
    };

    return (
        <div style={{ height: 'auto', width: '80%', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                <h1 style={{ margin: 0 }}>Workers</h1>
                {isAdmin? 
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={handleOpenCreate}
                >
                    Add Employee
                </Button>
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
                />
            </div>

            {/* Диалог для создания пользователя */}
            <CreateUserDialog
                open={openCreate}
                onClose={handleCloseCreate}
                onCreate={handleCreateUser}
                companies={companies} 
            />

            {/* Диалог для удаления пользователя */}
            <DeleteUserDialog
                open={openDeleteUserDialog}
                user={selectedUser}
                onClose={handleCloseDeleteUserDialog}
                onConfirm={handleConfirmDeleteUser}
            />

            {/* Диалог для отображения деталей пользователя */}
            {userDetails && (
                <UserDetailsDialog
                    open={openDetails}
                    onClose={handleCloseDetails}
                    onSave={handleSaveDetails}
                    userDetails= {userDetails}
                    companies={companies}
                />
            )}
        </div>
    );
};

export default Users;
