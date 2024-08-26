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
import { CreateUserRequest } from "../../api/users/types";

export const RESET_STORE = 'RESET_STORE';

export const resetStore = () => ({
    type: RESET_STORE,
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