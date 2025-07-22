import { create } from 'zustand';

interface AlertState {
    isActive: boolean;
    message: string;
    type: 'error' | 'success';
    instanceId: number;
    showAlert: (message: string, type: 'error' | 'success') => void;
    hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
    isActive: false,
    message: '',
    type: 'success',
    instanceId: 0,
    showAlert: (message: string, type: 'error' | 'success') => 
        set((state) => ({
            isActive: true, 
            message, 
            type,
            instanceId: state.instanceId + 1,
        })),
    hideAlert: () => set({ isActive: false })
}))