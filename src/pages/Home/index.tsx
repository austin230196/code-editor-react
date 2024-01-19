import { useState, useRef } from "react";
import { MdMeetingRoom, MdKeyboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../containers";
import team from "../../assets/team.svg";
import { useRooms } from "../../services/queries/room";
import { getRoom } from "../../services/apis/room";



const Home = () => {
    const navigate = useNavigate();
    const [room, setRoom] = useState<string>("");
    const [newRoom, setNewRoom] = useState<string>("");
    const [error, setError] = useState<string>("");
    const success = useRef(true);
    const {data} = useRooms();

    console.log({data})


    async function joinRoomHandler(e: any){
        //first get the room
        const res = await getRoom(room);
        if(!res!.success){
            setError(() => res.message);
        }else {
            navigate(`/${room}`);
        }
    }

    return (
        <Layout>
            <div className="w-screen h-screen bg-blue-800">
                <div className="w-[85%] max:w-[90%] h-screen mx-auto grid grid-cols-2 gap-3 flex items-center">
                    <div className="text-white">
                        <h1 className="text-3xl font-extrabold">Code collaboration.</h1>
                        <h1 className="text-3xl font-extrabold mb-4">Free for everyone.</h1>
                        <p className="text-grey-500 italic text-sm mb-8">Shared code-editor with syntax highlighting. Best for interviews, pair-programming or just collaborating on a script</p>
                        <div className="flex flex-col gap-3">
                            <button className="p-2 rounded-md w-[200px] flex items-center justify-center gap-2 bg-white text-blue-800"><MdMeetingRoom /> <span>Create room</span></button>
                            <span className="uppercase text-sm text-bold">or</span> 
                            <div className="flex flex-col border border-2 border-white w-[90%] rounded-md">
                                <section className="flex items-center p-2 gap-3">
                                    <span className="">
                                        <MdKeyboard />
                                    </span>
                                    <input className="outline-none bg-transparent leading-2" value={room} onChange={e => {setError(''); setRoom(() => e.target.value)}} placeholder="Enter room ID" />
                                </section>
                                {error && <i className="text-red-500 text-xs p-1.5 italic">{error}</i>}
                            </div>
                            <button disabled={!success.current} className="bg-green-500 rounded-md p-2 w-[200px]" onClick={joinRoomHandler} color={"red"}>Join room</button>
                        </div>
                    </div>
                    <div className="">
                        <img src={team} alt="Team" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Home;