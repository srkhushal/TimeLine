import { DeviceProvider } from "./DeviceProvider";
import { Routes } from "./RouterProvider";
import { UserProvider } from "./UserProvider";

export { Routes } from "./RouterProvider";
export { UserProvider, useUser } from "./UserProvider";
export { DeviceProvider, useDevice } from "./DeviceProvider";

export const Providers = () => {
    return (
        <UserProvider>
            <DeviceProvider>
                <Routes />
            </DeviceProvider>
        </UserProvider>
    )
}