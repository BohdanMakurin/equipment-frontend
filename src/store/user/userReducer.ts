import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../api/users/types'; // Импортируйте необходимые типы

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUsersStart: (state): UserState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    loadUsersSuccess: (state, action: PayloadAction<User[]>): UserState => ({
      ...state,
      users: action.payload,
      isLoading: false,
      error: null,
    }),
    loadUsersFailure: (state, action: PayloadAction<string>): UserState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addUser: (state, action: PayloadAction<User>): UserState => ({
      ...state,
      users: [...state.users, action.payload],
    }),
    updateUser: (state, action: PayloadAction<User>): UserState => ({
      ...state,
      users: state.users.map(user =>
        user.id === action.payload.id ? action.payload : user
      ),
    }),
    deleteUser: (state, action: PayloadAction<number>): UserState => ({
      ...state,
      users: state.users.filter(user => user.id !== action.payload),
    }),
    resetUsers: (state): UserState => ({
      ...initialState,
    }),
  },
});

export const {
  loadUsersStart,
  loadUsersSuccess,
  loadUsersFailure,
  addUser,
  updateUser,
  deleteUser,
  resetUsers,
} = userSlice.actions;

export default userSlice.reducer;
