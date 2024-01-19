import {useState} from "react";


const useLocalStorage = (key: string) => {
    const [value, setValue] = useState(window.localStorage.getItem(key));

    function clear(){
        window.localStorage.removeItem(key);
        setValue(() => '');
        return true;
    }


    function setItem(value: string){
        window.localStorage.setItem(key, value);
        setValue(() => value);
        return true;
    }


    return {
        setItem,
        value,
        clear
    }
}



export default useLocalStorage;