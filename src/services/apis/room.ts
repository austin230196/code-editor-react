import axiosInstance from "../../axios";

import type Room from "../../types/Room";


export const getRooms = async() => {
    return (await axiosInstance.get("rooms")).data;
}

export const getRoom = async(roomId: string) => {
    return (await axiosInstance.get(`rooms/${roomId}`)).data
}


export const joinRoom = async(roomId: string, user: string) => {
    const formdata = new FormData();
    formdata.append("user", user);
    formdata.append("roomId", roomId);
    return (await axiosInstance.post(`room/join`, formdata)).data
}