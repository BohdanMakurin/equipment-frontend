import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../models/models'; // Импортируйте необходимые типы

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    loadCategoriesStart: (state): CategoryState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    loadCategoriesSuccess: (state, action: PayloadAction<Category[]>): CategoryState => ({
      ...state,
      categories: action.payload,
      isLoading: false,
      error: null,
    }),
    loadCategoriesFailure: (state, action: PayloadAction<string>): CategoryState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addCategory: (state, action: PayloadAction<Category>): CategoryState => ({
      ...state,
      categories: [...state.categories, action.payload],
    }),
    updateCategory: (state, action: PayloadAction<Category>): CategoryState => ({
      ...state,
      categories: state.categories.map(category =>
        category.categoryId === action.payload.categoryId ? action.payload : category
      ),
    }),
    deleteCategory: (state, action: PayloadAction<number>): CategoryState => ({
      ...state,
      categories: state.categories.filter(category => category.categoryId !== action.payload),
    }),
    resetCategories: (state): CategoryState => ({
      ...initialState,
    }),
  },
});

export const {
  loadCategoriesStart,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  addCategory,
  updateCategory,
  deleteCategory,
  resetCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
