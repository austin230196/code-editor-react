import axios from "axios";
import axiosInstance from "../../axios";
import { JUDGE0_URL, JUDGE0_HOST, JUDGE0_KEY } from "../../constants";



export const getCompilers = async() => {
    const res = await axiosInstance.get("/compilers");
    return res.data;
}


export const compileCode = async(languageId: number, sourceCode: string) => {
    const res = await axios.post(`${JUDGE0_URL}/submissions`, {language_id: languageId, source_code: sourceCode, stdin: ''}, {
        params: {
            base64_encoded: true,
            fields: "*"
        },
        headers: {
            'X-RapidAPI-Key': JUDGE0_KEY,
            'X-RapidAPI-Host': JUDGE0_HOST,
            'Content-Type': 'application/json',
        }
    })
    return res.data;
}


export const getCodeOutput = async(codeToken: string) => {
    const res = await axios.get(`${JUDGE0_URL}/submissions/${codeToken}`, {
        params: {
            base64_encoded: true,
            fields: "*"
        },
        headers: {
            'X-RapidAPI-Key': JUDGE0_KEY,
            'X-RapidAPI-Host': JUDGE0_HOST,
            'Content-Type': 'application/json',
        }
    })
    console.log({res})
    return res.data;
}