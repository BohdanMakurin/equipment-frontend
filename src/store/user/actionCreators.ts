import { Dispatch } from "@reduxjs/toolkit"
import api from "../../api"
import {
  loadUsersStart,
  loadUsersSuccess,
  loadUsersFailure,
  addUser,
  updateUser,
  deleteUser
} from "./userReducer"
import { CreateUserRequest, EditUserRequest } from "../../models/models";

export const RESET_USERS_STORE = 'RESET_USERS_STORE';

export const resetStore = () => ({
    type: RESET_USERS_STORE,
});

// Action creator для загрузки всех пользователей по айди админа
export const fetchUsersByAdminId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadUsersStart());
      const res = await api.users.getUsersByAdminId(id);
      dispatch(loadUsersSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadUsersFailure(e.message));
    }
  }

export const fetchUsersByCompanyId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadUsersStart());
      const res = await api.users.getUsersByCompanyId(id);
      dispatch(loadUsersSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadUsersFailure(e.message));
    }
  }

    // Action creator для добавления нового работника
export const createUser = (user: CreateUserRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const res = await api.users.createUser(user)
      dispatch(addUser(res.data));
    } catch (e: any) {
      console.error(e)
      dispatch(loadUsersFailure(e.message))
    }
  }

    //Action creator для удаления пользователя
export const removeUser = (userId: number) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await api.users.deleteUser(userId)
      dispatch(deleteUser(userId))
    } catch (e: any) {
      console.error(e)
      dispatch(loadUsersFailure(e.message))
    }
  }

export const updateUserById = (id: number, equipment: EditUserRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const res = await api.users.updateUser(id, equipment);
      dispatch(updateUser(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadUsersFailure(e.message));
    }
  }