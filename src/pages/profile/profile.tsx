import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { editProfile } from "../../store/auth/actionCreators";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { fetchCompaniesByAdminId } from "../../store/company/actionCreators";
import dayjs from "dayjs";

const Main = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );

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
        if (profile) {
            setEmail(profile.email || "");
            setFirstName(profile.firstName || "");
            setLastName(profile.lastName || "");
            if (isLoggedIn && isAdmin && profileId) {
                dispatch(fetchCompaniesByAdminId(Number(profileId)));
            }
        }
    }, [isLoggedIn, isAdmin, dispatch, profile]);

    const companies = useSelector(
        (state: IRootState) => state.companies.companies
    );
    const editingProfile = (e: FormEvent) => {
        e.preventDefault();
        dispatch(editProfile(Number(profile?.id), { email, firstName, lastName }));
        setIsEdit(false);
    };

    return (
        <Box sx={{ maxWidth: "800px", margin: "0 auto", mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4">Your Profile</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
            </IconButton>
        </Box>
        {!isEdit ? (
            <Box>
            <Card sx={{ mb: 4 }}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Edition Information
                </Typography>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">{profile?.email || "Loading..."}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell align="right">{profile?.firstName || "Loading..."}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="right">{profile?.lastName || "Loading..."}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Created at</TableCell>
                        <TableCell align="right">{profile?.createdAt ? dayjs(profile?.createdAt).format('DD MMMM YYYY, HH:mm:ss') : "Loading..."}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

            <Typography variant="h4" gutterBottom>
                Companies
            </Typography>
            {companies.map((company)=>(
                <Card sx={{mb: 3}}>
                    <CardContent>
                        <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Company Name</TableCell>
                                <TableCell align="right">{company.name || "Loading..."}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Company Description</TableCell>
                                <TableCell align="right">{company.description || "Loading..."}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Count of Employees</TableCell>
                                <TableCell align="right">{company.employees.length || "Loading..."}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Created at</TableCell>
                                <TableCell align="right">{company.createdAt ? dayjs(company.createdAt).format('DD MMMM YYYY, HH:mm:ss') : "Loading..."}</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
                    {/* <TableBody>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">{profile?.email || "Loading..."}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell align="right">{profile?.firstName || "Loading..."}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="right">{profile?.lastName || "Loading..."}</TableCell>
                    </TableRow>
                    </TableBody> */}
                
                
            </Box>
        ) : (
            <form onSubmit={editingProfile}>
            <Card sx={{ mb: 4 }}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Edit Profile
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    />
                    <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    />
                    <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    />
                    <Button variant="contained" color="primary" type="submit">
                    Save
                    </Button>
                </Box>
                </CardContent>
            </Card>
            </form>
        )}
        </Box>
    );
};

export default Main;
