import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { fetchAllCompanies } from "../../store/company/actionCreators";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const Companies = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    // Проверяем, залогинен ли пользователь
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    // Получаем роль пользователя
    const isAdmin = useSelector(
        (state: IRootState) => state.auth.profileData.profile?.role === 'ROLE_ADMIN'
    );

    // Загружаем все компании, если пользователь залогинен и является администратором
    useEffect(() => {
        if (isLoggedIn && isAdmin) {
            dispatch(fetchAllCompanies());
        }
    }, [isLoggedIn, isAdmin, dispatch]);

    const companies = useSelector(
        (state: IRootState) => state.companies.companies
    );

    // Преобразование данных компаний для использования в DataGrid
    const rows = companies.map((company) => ({
        id: company.companyId,
        companyName: company.name,
        description: company.description,
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 250 },
    ];

    // Обработчик клика на строку
    const handleRowClick = (params: any) => {
        setSelectedCompany(params.row);
        setOpen(true);
    };

    // Закрытие модального окна
    const handleClose = () => {
        setOpen(false);
        setSelectedCompany(null);
    };

    return (
        <div style={{ height: 'auto', width: '80%', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>Companies</h1>
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
                    onRowClick={handleRowClick} // Обработчик клика на строку
                />
            </div>

            {/* Модальное окно */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Company Details</DialogTitle>
                <DialogContent>
                    {selectedCompany && (
                        <div>
                            <Typography variant="h6">Company Name: {selectedCompany.companyName}</Typography>
                            <Typography variant="body1">Description: {selectedCompany.description}</Typography>
                            {/* Добавьте здесь дополнительные поля, если нужно */}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Companies;
