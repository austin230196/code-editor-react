import {useRef, useMemo, useState} from "react";
import {Editor, OnChange, useMonaco} from "@monaco-editor/react";
import * as Y from "yjs";
import {WebsocketProvider} from "y-websocket";
import {MonacoBinding} from "y-monaco";
import {editor} from "monaco-editor";


import useLocalStorage from "../../hooks/useLocalStorage";
import Output from "./components/Output";
import { compileCode, getCodeOutput, getCompilers } from "../../services/apis/judge0";



function Panel({run}: {run: () => void}){
    return (
        <div className="fixed bottom-0 left-0 right-0 z-1000 p-2 flex items-center gap-5">
            <button onClick={run} className="rounded-md bg-green-500 px-10 py-3 text-sm text-bold">Run</button>
        </div>
    )
}


const CodeRoom = () => {
    const monaco = useMonaco();
    const {value: va, clear, setItem} = useLocalStorage("theme");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState(null);
    // const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const [defaultLanguage, setDefaultLanguage] = useState("rust");
    const v = useRef(va);
    // const url = "ws://127.0.0.1:9000";
    const validLanguages = monaco?.languages.getLanguages();
    console.log({validLanguages})

    const compilerLanguages = useMemo(async () => {
        try{
            const res = await getCompilers();
            console.log({res});
            if(!res.success) return [];
            return res.data
        }catch(e: any){
            console.log({e})
        }
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
    }

    async function handleCompile(){
        try{
            //to get the compiler to use 
            //check the language and then sort the language compiler available
            let languageId: number = 0;
            let lang =  (await compilerLanguages).find((l: {name: string, id: number}) => l.name.toLocaleLowerCase().includes(defaultLanguage));
            console.log({lang});
            languageId = lang.id;
            // let lang = defaultLanguage. 
            const res = await compileCode(languageId, btoa(code));
            console.log({res});
            if(res.token){
                const out = await getCodeOutput(res.token);
                setOutput(() => out);
            }
        }catch(e: any){
            console.log(e.message);
        }
    }

    // console.log(compilerLanguages);


    return (
        <div className="">
            <select value={defaultLanguage} onChange={e => setDefaultLanguage(() => e.target.value)}>
                {
                    validLanguages?.map((l: any, i: number) => (
                        <option value={l.id} key={i}>{l.id.toLocaleLowerCase()}</option>
                    ))
                }
            </select>
            {output ? <Output output={output} /> : null}
            <Editor
                height={"100vh"}
                width={"100%"}
                value={code}
                language={defaultLanguage}
                theme={v.current === 'dark' ? "vs-dark" : "vs-light"}
                onChange={handleEditorChange as OnChange}
                onMount={handleEditorDidMount}
            />
            <Panel run={handleCompile} />
        </div>
    )
}


export default CodeRoom;