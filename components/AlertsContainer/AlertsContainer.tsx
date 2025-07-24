
'use client';
import { useAlertStore } from "@/store/alertStore";
import Alert from "../Alert/Alert";
import './AlertsContainer.scss';

export default function AlertsContainer() {
    const alerts = useAlertStore((state) => state.alerts);

    return (
        <div className="alerts-container">
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