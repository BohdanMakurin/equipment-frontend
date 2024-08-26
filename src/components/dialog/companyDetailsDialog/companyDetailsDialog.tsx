import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { User } from "../../../api/companies/types";

interface CompanyDetailsDialogProps {
  open: boolean;
  company: any;
  onClose: () => void;
  onSave: () => void;
}

const CompanyDetailsDialog: React.FC<CompanyDetailsDialogProps> = ({
  open,
  company,
  onClose,
  onSave
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Company Details</DialogTitle>
      <DialogContent dividers style={{ height: '80vh'}}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
              {company && (
                <div>
                  <Typography variant="h6">Company Name: {company.name}</Typography>
                  <Typography variant="body1">Description: {company.description}</Typography>
                </div>
              )}
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <Paper elevation={2} style={{ padding: "20px", height: "100%" }}>
              <h2 style={{ marginBottom: '20px' }}>Employees</h2>
              <div style={{ height: 'auto', width: '100%' }}>
                {company && company.employees && (
                  <DataGrid
                    rows={company.employees.map((employee: User) => ({
                      id: employee.id,
                      firstName: employee.firstName,
                      lastName: employee.lastName,
                      email: employee.email,
                      role: employee.role.replace("ROLE_", ""),
                    }))}
                    columns={[
                      { field: 'id', headerName: 'ID', flex: 1, minWidth: 100},
                      { field: 'firstName', headerName: 'First Name', flex: 2, minWidth: 150},
                      { field: 'lastName', headerName: 'Last Name', flex: 2, minWidth: 150 },
                      { field: 'email', headerName: 'E-mail', flex: 2, minWidth: 150 },
                      { field: 'role', headerName: 'Role', flex: 2, minWidth: 150 },
                    ]}
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

export default CompanyDetailsDialog;
