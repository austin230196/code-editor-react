import axios from "axios";

import { BASE_URL } from "./constants";

const instance = axios.create({
    baseURL: BASE_URL,
    validateStatus: status => {
        return status >= 200 && status < 600;
    }
})


export default instance;