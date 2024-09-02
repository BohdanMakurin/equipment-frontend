import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Equipment } from '../../models/models'; // Импортируйте необходимые типы

interface EquipmentState {
  equipmentList: Equipment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EquipmentState = {
  equipmentList: [],
  isLoading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    loadEquipmentStart: (state): EquipmentState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    loadEquipmentSuccess: (state, action: PayloadAction<Equipment[]>): EquipmentState => ({
      ...state,
      equipmentList: action.payload,
      isLoading: false,
      error: null,
    }),
    loadEquipmentFailure: (state, action: PayloadAction<string>): EquipmentState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addEquipment: (state, action: PayloadAction<Equipment>): EquipmentState => ({
      ...state,
      equipmentList: [...state.equipmentList, action.payload],
    }),
    updateEquipment: (state, action: PayloadAction<Equipment>): EquipmentState => ({
      ...state,
      equipmentList: state.equipmentList.map(equipment =>
        equipment.equipmentId === action.payload.equipmentId ? action.payload : equipment
      ),
    }),
    deleteEquipment: (state, action: PayloadAction<number>): EquipmentState => ({
      ...state,
      equipmentList: state.equipmentList.filter(equipment => equipment.equipmentId !== action.payload),
    }),
    resetEquipment: (state): EquipmentState => ({
      ...initialState,
    }),
  },
});

export const {
  loadEquipmentStart,
  loadEquipmentSuccess,
  loadEquipmentFailure,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  resetEquipment,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
