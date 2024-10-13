import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Box,
    Button,
    DialogActions,
    Paper,
    IconButton,
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableContainer,
    TextField
} from '@mui/material';
import { Company, EditUserRequest, Equipment, User } from '../../../models/models';
import UserEdit from './userEdit'; // Импортируем компонент UserEdit
import { SelectChangeEvent } from '@mui/material';
import { fetchEquipmentByUserId } from "../../../store/equipment/actionCreators";
import { IRootState, useAppDispatch } from '../../../store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { profile } from 'console';

interface UserDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (id: number, updatedUser: EditUserRequest) => void;
    userDetails: User;
    companies: Company[];
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
    open,
    onClose,
    onSave,
    userDetails,
    companies
}) => {
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

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
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
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
        { field: 'name', headerName: 'Name', flex: 2, minWidth: 150 },
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

    // Функция для печати таблицы
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const currentTime = new Date();
            const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
            const formattedDate = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')}`;
            printWindow.document.write(`
                <html>
                <head>
                    <title>User Equipment</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h3>${userDetails.firstName} ${userDetails.lastName} Equipment</h3>
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
                  selectedCompanyId={selectedCompanyId}
                  companies={companies}
                  onFirstNameChange={(e) => setFirstName(e.target.value)}
                  onLastNameChange={(e) => setLastName(e.target.value)}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onRoleChange={handleRoleChange}
                  onCompanyChange={handleCompanyChange}
                />
              ) : (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Edition Information</Typography>
                    <Paper elevation={2} style={{ padding: "20px", position: 'relative' }}>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Email</TableCell>
                              <TableCell><Typography><b>{userDetails.email}</b></Typography></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Last Name</TableCell>
                              <TableCell><Typography><b>{userDetails.lastName}</b></Typography></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>First Name</TableCell>
                              <TableCell><Typography><b>{userDetails.firstName}</b></Typography></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
    
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Company Role</Typography>
                    <Paper elevation={2} style={{ padding: "20px", position: 'relative' }}>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Name of Company</TableCell>
                              <TableCell><Typography><b>{userDetails.company.name || 'Not assigned'}</b></Typography></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Role in Company</TableCell>
                              <TableCell><Typography><b>{role}</b></Typography></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </>
              )}
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Equipment</Typography>
                <Paper elevation={2} style={{ padding: "20px" }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Typography variant="h6">{userDetails.firstName}'s Equipment</Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handlePrint}
                    >
                      Print
                    </Button>
                  </div>
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
                      disableRowSelectionOnClick
                      disableColumnSelector
                      autoHeight
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            {isAdmin ? (
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
            ) : (
              <Button onClick={onClose} color="primary">
                CLOSE
              </Button>
            )}
          </DialogActions>
        </Dialog>
      );

    // return (
    //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ marginBottom: "20px" }}>
    //         <DialogTitle>{isEditing ? "Edit User Details" : "User Details"}</DialogTitle>
    //         <DialogContent dividers style={{ height: '80vh' }}>
    //             <Grid container spacing={2}>
    //                 {isEditing ? (
    //                     <UserEdit
    //                         firstName={firstName}
    //                         lastName={lastName}
    //                         email={email}
    //                         role={role}
    //                         selectedCompanyId={selectedCompanyId} // Передаем выбранную компанию
    //                         companies={companies}
    //                         onFirstNameChange={(e) => setFirstName(e.target.value)}
    //                         onLastNameChange={(e) => setLastName(e.target.value)}
    //                         onEmailChange={(e) => setEmail(e.target.value)}
    //                         onRoleChange={handleRoleChange}
    //                         onCompanyChange={handleCompanyChange} // Передаем функцию для изменения компании
    //                     />
    //                 ) : (
    //                     <Grid item xs={3}>
    //                         <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
    //                             <Typography variant="h6" gutterBottom>{userDetails.firstName}'s Profile</Typography>
    //                             <Box border={1} borderRadius={4} p={2} borderColor="black" mb={2}>
    //                                 <Typography>Email: {userDetails.email}</Typography>
    //                                 <Typography>First Name: {userDetails.firstName}</Typography>
    //                                 <Typography>Last Name: {userDetails.lastName}</Typography>
    //                                 <Typography>Profile was created: {userDetails.createdAt.toString().split('T')[0]}</Typography>
    //                             </Box>
    //                             <Typography variant="h6" gutterBottom>Company</Typography>
    //                             <Box border={1} borderRadius={4} p={2}>
    //                                 <Typography>{userDetails.company.name}</Typography>
    //                                 <Typography>{`${userDetails.firstName}'s role: ${role}`}</Typography>
    //                             </Box>
    //                         </Paper>
    //                     </Grid>
    //                 )}
    //                 <Grid item xs={9}>
    //                     <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
    //                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
    //                             <h2 style={{ marginBottom: '20px' }}>{userDetails.firstName}'s Equipment</h2>
    //                             <Button
    //                                 variant="outlined"
    //                                 color="secondary"
    //                                 onClick={handlePrint}
    //                             >
    //                                 Print
    //                             </Button>
    //                         </div>
    //                         <div style={{ height: 'auto', width: '100%' }}>
    //                             <DataGrid
    //                                 rows={rows}
    //                                 columns={columns}
    //                                 initialState={{
    //                                     pagination: {
    //                                         paginationModel: { page: 0, pageSize: 5 },
    //                                     },
    //                                 }}
    //                                 pageSizeOptions={[5, 10]}
    //                                 disableColumnResize
    //                                 disableRowSelectionOnClick
    //                                 disableColumnSelector
    //                                 autoHeight
    //                             />
    //                         </div>
    //                     </Paper>
    //                 </Grid>
    //             </Grid>
    //         </DialogContent>
            // <DialogActions>
            //     {isAdmin ? 
            //         <>
            //         <Button
            //             variant="contained"
            //             color="primary"
            //             onClick={handleEditToggle}
            //         >
            //         {isEditing ? 'Cancel Editing' : 'Edit'}
            //         </Button>
            //         {!isEditing && (
            //             <Button onClick={onClose} color="primary">
            //                 CLOSE
            //             </Button>
            //         )}
            //         {isEditing && (
            //             <Button onClick={handleSave} color="primary">
            //                 SAVE
            //             </Button>
            //         )}
            //         </>
            //         :
            //         <Button onClick={onClose} color="primary">
            //             CLOSE
            //         </Button>
            //     }
            // </DialogActions>
    //     </Dialog>
    // );
};

export default UserDetailsDialog;
