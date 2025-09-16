import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useJobNotifications = () => {
    const { userInfo } = useContext(AuthContext);
    const userCity = userInfo?.city;

    // store the IDs of notifications the user has already read
    const [readIds, setReadIds] = useState(() => {
        // try to load from localStorage
        const saved = localStorage.getItem("readNotifications");
        return saved ? JSON.parse(saved) : [];
    });

    const query = useQuery({
        queryKey: ["jobNotifications", userCity],
        queryFn: async () => {
            const res = await axiosInstance.get(`/jobs/notifications/${userCity}`);
            return res.data.data;
        },
        enabled: !!userCity,
        staleTime: 5 * 60 * 1000,
    });

    // whenever new jobs come in, mark only the ones not read yet as unread
    const unreadIds = query.data
        ? query.data.map((job) => job._id).filter((id) => !readIds.includes(id))
        : [];

    const markAllAsRead = () => {
        if (query.data) {
            const allIds = query.data.map((job) => job._id);
            const newReadIds = Array.from(new Set([...readIds, ...allIds]));
            setReadIds(newReadIds);
            localStorage.setItem("readNotifications", JSON.stringify(newReadIds));
        }
    };

    return { ...query, unreadIds, markAllAsRead };
};

export default useJobNotifications;
