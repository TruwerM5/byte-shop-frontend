import { create } from 'zustand';

interface AlertState {
    isActive: boolean;
    message: string;
    type: 'error' | 'success';
    showAlert: (message: string, type: 'error' | 'success') => void;
    hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    isActive: false,
    message: '',
    type: 'success',
    showAlert: (message: string, type: 'error' | 'success') => set({isActive: true, message, type}),
    hideAlert: () => set({ isActive: false })
}))