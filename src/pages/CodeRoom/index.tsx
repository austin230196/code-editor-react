import {useRef, useMemo, useState} from "react";
import {Editor, OnChange, useMonaco} from "@monaco-editor/react";
import * as Y from "yjs";
import {WebsocketProvider} from "y-websocket";
import {MonacoBinding} from "y-monaco";
import {editor} from "monaco-editor";


import useLocalStorage from "../../hooks/useLocalStorage";
import axiosInstance from "../../axios";
import { JUDGE0_HOST, JUDGE0_KEY, JUDGE0_URL } from "../../constants";


const CodeRoom = () => {
    const monaco = useMonaco();
    const {value: va, clear, setItem} = useLocalStorage("theme");
    const [code, setCode] = useState("");
    // const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const [defaultLanguage, setDefaultLanguage] = useState("rust");
    const v = useRef(va);
    // const url = "ws://127.0.0.1:9000";
    const validLanguages = monaco?.languages.getLanguages().map(l => l.id);
    console.log({validLanguages, l: monaco?.languages.getLanguages()})

    const compilerLanguages = useMemo(async () => {
        const res = await axiosInstance.get(`${JUDGE0_URL}/languages`, {
            headers: {
                'X-RapidAPI-Key': JUDGE0_KEY,
                'X-RapidAPI-Host': JUDGE0_HOST,
                'Content-Type': 'application/json',
                'content-type': 'application/json'
            }
        })
        return res.data
    }, []);
    
    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        // editorRef.current = editor;
        console.log({editor});

        // //initialize yjs
        // const doc = new Y.Doc();

        // //connect to peers with websocket
        // const provider: WebsocketProvider = new WebsocketProvider(url, "roomId", doc);
        // const type = doc.getText("monaco");

        // //bind yjs binding to monaco binding
        // const binding = new MonacoBinding(type, editorRef.current.getModel()!, new Set([editorRef.current]), provider.awareness);

        // console.log({binding, provider, theme: value});
    }

    function handleEditorChange(value: string, event: editor.IModelContentChangedEvent){
        console.log({event});
        setCode(() => value);
        handleCompile()
    }

    async function handleCompile(){
        try{
            const formdata = {
                // language_id: ,
                source_code: btoa(code),
            }
            const res = await axiosInstance.post(`${JUDGE0_URL}/submissions`, formdata, {
                params: {
                    base64_encoded: true,
                    fields: '*'
                },
                headers: {
                    'X-RapidAPI-Key': JUDGE0_KEY,
                    'X-RapidAPI-Host': JUDGE0_HOST,
                    'Content-Type': 'application/json',
                    'content-type': 'application/json'
                }
            })
        }catch(e: any){
            console.log(e.message);
        }
    }

    console.log(compilerLanguages);


    return (
        <div className="">
            <select value={defaultLanguage} onChange={e => setDefaultLanguage(() => e.target.value)}>
                {
                    validLanguages?.map((l: string, i: number) => (
                        <option value={l} key={i}>{l.toLocaleLowerCase()}</option>
                    ))
                }
            </select>
            <Editor
            height={"100vh"}
            width={"100%"}
            value={code}
            language={defaultLanguage}
            theme={v.current === 'dark' ? "vs-dark" : "vs-light"}
            onChange={handleEditorChange as OnChange}
            onMount={handleEditorDidMount}
            />
        </div>
    )
}


export default CodeRoom;