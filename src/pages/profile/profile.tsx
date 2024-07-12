import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store";
import { getProfile, logoutUser, editProfile } from "../../store/auth/actionCreators";
import dashboard from "../dashboard";
import Dashboard from "../dashboard";
import { getEmailFromToken } from "../../utils/jwt";
import { getCompaniesByUserId } from "../../api/companies";
import { fetchCompaniesByUserId } from "../../store/company/actionCreators";

const Main = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );

    const editingProfile = (e: FormEvent) =>{
    
        e.preventDefault();
        const role = profile?.role
        
        // dispatch(editProfile(Number(profile?.id), {firstName,lastName,email, password, role}));
        
        setIsEdit(false)
    }
    // useEffect(() => {
    //     if (profile && profile.id) {
    //       dispatch(fetchCompaniesByUserId(Number(profile.id)));
    //     }
    //   }, [profile, dispatch]);
    // const companies = useSelector(
    //     (state: IRootState) => state.companies.companies
    // );
    console.log(profile)
    return (
        <div>
            <button onClick={() => setIsEdit(true)}>Edit Profile</button>
            {!isEdit ? 
                <div>
                    <h2>Yours Profile</h2>
                    <div>
                        <p>Email: {profile !== null ? <span>{profile.email}</span>  : "Loading..."}</p>
                        <p>First Name: {profile !== null ? <span>{profile.firstName}</span>  : "Loading..."}</p>
                        <p>Last Name: {profile !== null ? <span>{profile.lastName}</span>  : "Loading..."}</p>
                        <p>Profile was created: {profile !== null ? <span>{profile.createdAt}</span>  : "Loading..."}</p>
                    </div>
                    <h2>Companies</h2>
                    <div>
                        <div><p>company box</p></div>
                    </div>
                </div>
            :
                <div>
                    <form onSubmit={editingProfile}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            } 
        </div>
    );
};

export default Main;