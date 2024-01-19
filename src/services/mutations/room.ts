import {useMutation} from "@tanstack/react-query";

import { joinRoom } from "../apis/room";



export const useJoinRoom = async () => {
    return useMutation({
        mutationKey: ["join-room"],
        mutationFn: ({roomId, name}: {roomId: string, name: string}) => {
            return joinRoom(roomId, name)
        }
    })
}