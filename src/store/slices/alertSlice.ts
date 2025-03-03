import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AlertType = "success" | "warning" | "error" | "info";

interface Alert {
  id: string; // Unique ID for each alert
  type: AlertType;
  message: string;
  autoClose:number;
}

interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

const alertSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
      addAlert: (state, action: PayloadAction<{ type: AlertType; message: string; autoClose: number }>) => {
        const newAlert: Alert = {
          id: `${Date.now()}`, // Unique ID
          type: action.payload.type,
          message: action.payload.message,
          autoClose: action.payload.autoClose, // Include autoClose
        };
        state.alerts.push(newAlert);
      },
      removeAlert: (state, action: PayloadAction<string>) => {
        state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
      },
    },
  });

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
