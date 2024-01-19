import {useQuery} from "@tanstack/react-query";
import { getRoom, getRooms } from "../apis/room";


export const useRoom = (roomId: string) => {
    return useQuery({
        queryKey: ["room"],
        queryFn: () => getRoom(roomId),
        refetchOnWindowFocus: true,        
    })
}


export const useRooms = () => {
    return useQuery({
        queryKey: ["rooms"],
        queryFn: getRooms,
        refetchOnWindowFocus: true,        
    })
}