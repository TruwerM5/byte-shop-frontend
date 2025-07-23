
'use client';
import { useAlertStore } from "@/store/alertStore";
import Alert from "../Alert/Alert";


export default function AlertsContainer() {
    const alerts = useAlertStore((state) => state.alerts);

    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-4">
            {alerts.map(alert => (
                <Alert
                    key={alert.id}
                    id={alert.id}
                    type={alert.type}
                    message={alert.message}
                />
            ))}
        </div>
    )
}