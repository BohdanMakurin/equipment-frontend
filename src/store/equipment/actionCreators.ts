import { Dispatch } from "@reduxjs/toolkit";
import api from "../../api";
import {
  loadEquipmentStart,
  loadEquipmentSuccess,
  loadEquipmentFailure,
  addEquipment,
  updateEquipment,
  deleteEquipment
} from "./equipmentReducer";
import { CreateEquipmentRequest, Equipment, EquipmentEditRequest } from "../../models/models";

export const RESET_EQUIPMENT_STORE = 'RESET_EQUIPMENT_STORE';

export const resetEquipmentStore = () => ({
    type: RESET_EQUIPMENT_STORE,
});

// Action creator для загрузки всего оборудования
export const fetchEquipmentByAdminId = (id: number) =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        dispatch(loadEquipmentStart());
        const res = await api.equipment.getEquipmentByAdminId(id);
        dispatch(loadEquipmentSuccess(res.data));
      } catch (e: any) {
        console.error(e);
        dispatch(loadEquipmentFailure(e.message));
      }
    }
export const fetchEquipmentByCompanyId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadEquipmentStart());
      const res = await api.equipment.getEquipmentByCompanyId(id);
      dispatch(loadEquipmentSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadEquipmentFailure(e.message));
    }
  }
export const fetchEquipmentByUserId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadEquipmentStart());
      const res = await api.equipment.getEquipmentByUserId(id);
      dispatch(loadEquipmentSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadEquipmentFailure(e.message));
    }
  }

// Action creator для добавления нового оборудования
export const createEquipment = (equipment: CreateEquipmentRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        const res = await api.equipment.createEquipment(equipment);
        dispatch(addEquipment(res.data));
      } catch (e: any) {
        console.error(e);
        dispatch(loadEquipmentFailure(e.message));
      }
    }

// Action creator для обновления оборудования
export const updateEquipmentById = (equipment: EquipmentEditRequest, id: number) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        const res = await api.equipment.updateEquipment(id, equipment);
        dispatch(updateEquipment(res.data));
      } catch (e: any) {
        console.error(e);
        dispatch(loadEquipmentFailure(e.message));
      }
    }

// Action creator для удаления оборудования
export const removeEquipment = (equipmentId: number) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        await api.equipment.deleteEquipment(equipmentId);
        dispatch(deleteEquipment(equipmentId));
      } catch (e: any) {
        console.error(e);
        dispatch(loadEquipmentFailure(e.message));
      }
    }
