import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useJobNotifications = () => {
    const { userInfo } = useContext(AuthContext);
    const userCity = userInfo?.city;

    return useQuery({
        queryKey: ["jobNotifications", userCity],
        queryFn: async () => {
            const res = await axiosInstance.get(`/jobs/notifications/${userCity}`);
            return res.data.data; // array of jobs
        },
        enabled: !!userCity, // only fetch if city exists
        staleTime: 5 * 60 * 1000,
    });
};

export default useJobNotifications;
