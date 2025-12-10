import { create } from 'zustand';

type AlertType = 'success' | 'error';

interface Alert {
  id: number;
  message: string;
  type: AlertType;
}

interface AlertState {
  alerts: Alert[];
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: (id: number) => void;
}

let idCounter = 0;

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [],
  showAlert: (message: string, type: AlertType) => {
    const id = idCounter++;
    set((state) => ({
      alerts: [{ id, message, type }, ...state.alerts],
    }));
  },

  hideAlert: (id: number) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));
