import {useRef, useEffect} from "react";
import {Editor, OnChange, useMonaco} from "@monaco-editor/react";
import * as Y from "yjs";
import {WebsocketProvider} from "y-websocket";
import {MonacoBinding} from "y-monaco";
import {editor} from "monaco-editor";


import useLocalStorage from "../../hooks/useLocalStorage";


const CodeRoom = () => {
    const monaco = useMonaco();
    const {value, clear, setItem} = useLocalStorage("theme");
    const editorRef = useRef<editor.IStandaloneCodeEditor>();
    const v = useRef(value);
    const url = "ws://127.0.0.1:9000";
    const validLanguages = useRef();

    useEffect(() => {}, [value]);
    console.log(monaco?.languages.getLanguages());
    
    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        editorRef.current = editor;

        //initialize yjs
        const doc = new Y.Doc();

        //connect to peers with websocket
        const provider: WebsocketProvider = new WebsocketProvider(url, "roomId", doc);
        const type = doc.getText("monaco");

        //bind yjs binding to monaco binding
        const binding = new MonacoBinding(type, editorRef.current.getModel()!, new Set([editorRef.current]), provider.awareness);

        console.log({binding, provider, theme: value});
    }

    function handleEditorChange(value: string, event: editor.IModelContentChangedEvent){
        console.log({event, value});
    }

    console.log(v);


    return (
        <div className="">
            <Editor
            height={"100vh"}
            language="rust"
            defaultLanguage="cpp"
            defaultValue={""}
            theme={value === 'dark' ? "vs-dark" : "vs-light"}
            onChange={handleEditorChange as OnChange}
            onMount={handleEditorDidMount}
            />
        </div>
    )
}


export default CodeRoom;