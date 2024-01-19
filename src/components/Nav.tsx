import { ChangeEvent, useCallback } from "react";

import Logo from "./Logo";
import useLocalStorage from "../hooks/useLocalStorage";



const Nav = () => {
    const {value, setItem} = useLocalStorage("theme");

    function handleThemeChange(e: ChangeEvent<HTMLInputElement>) {
      if(e.target.checked){
        setItem("light");
      }else{
        setItem("dark");
      }
    }

    const getDate = useCallback(() => {
        let now = new Date();
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return `${now.getHours()}:${now.getMinutes()} . ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
    }, []);


    return (
        <nav className="relative bg-blue-800 text-white z-1000 bg-opacity-80 top-0 left-0 right-0 px-10 py-4 flex items-center justify-between">
            <div className="">
                <Logo />
            </div>

            <div className="flex items-center gap-3">
                <p className="text-white text-xs italic">{getDate()}</p>
                <input type="checkbox" checked={value === 'light'} onChange={handleThemeChange} />
                {value}
            </div>
        </nav>
    )
}


export default Nav;