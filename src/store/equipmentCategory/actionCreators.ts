import { Dispatch} from "@reduxjs/toolkit";
import api from "../../api";
import {
  loadCategoriesStart,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  addCategory,
  updateCategory,
  deleteCategory
} from "./equipmentCategoryReducer";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../../models/models";

export const RESET_CATEGORY_STORE = 'RESET_CATEGORY_STORE';

export const resetCategoryStore = () => ({
    type: RESET_CATEGORY_STORE,
});

export const fetchCategoriesByAdminId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadCategoriesStart());
      const res = await api.equipmentCategory.getCategoriesByAdminId(id);
      dispatch(loadCategoriesSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadCategoriesFailure(e.message));
    }
  }

// Action creator для загрузки всех категорий
// export const fetchCategories = () =>
//     async (dispatch: Dispatch): Promise<void> => {
//       try {
//         dispatch(loadCategoriesStart());
//         const res = await api.equipmentCategory.getCategories();
//         dispatch(loadCategoriesSuccess(res.data));
//       } catch (e: any) {
//         console.error(e);
//         dispatch(loadCategoriesFailure(e.message));
//       }
//     }

// Action creator для добавления новой категории
export const createCategory = (category: CreateCategoryRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        const res = await api.equipmentCategory.createCategory(category);
        dispatch(addCategory(res.data));
      } catch (e: any) {
        console.error(e);
        dispatch(loadCategoriesFailure(e.message));
      }
    }

// Action creator для обновления категории
export const updateCategoryById = (category: UpdateCategoryRequest, id: number) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        const res = await api.equipmentCategory.updateCategory(id, category);
        dispatch(updateCategory(res.data));
      } catch (e: any) {
        console.error(e);
        dispatch(loadCategoriesFailure(e.message));
      }
    }

// Action creator для удаления категории
export const removeCategory = (categoryId: number) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        await api.equipmentCategory.deleteCategory(categoryId);
        dispatch(deleteCategory(categoryId));
      } catch (e: any) {
        console.error(e);
        dispatch(loadCategoriesFailure(e.message));
      }
    }
