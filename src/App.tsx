import React, {useState} from "react";
import {JsonInput} from "./components/JsonInput";
import {Toolbar} from "./components/Toolbar";
import {ErrorDisplay} from "./components/ErrorDisplay";
import {JsonTree} from "./components/JsonViewer";
import {
    cleanJsonInput,
    validateJson,
    formatJson,
    compressJson,
    downloadJson,
} from "./utils/jsonUtils";
import type {OnSelectProps} from '@microlink/react-json-view';

const App: React.FC = () => {
    const [rawInput, setRawInput] = useState("");
    const [parsed, setParsed] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [select, setSelect] = useState<OnSelectProps | null>(null);

    const handleFormat = () => {
        if (parsed) {
            setRawInput(formatJson(parsed));
            return;
        }
        const cleaned = cleanJsonInput(rawInput);
        const {data, error} = validateJson(cleaned);
        if (data) {
            setParsed(data);
            setRawInput(formatJson(data));
            setError(null);
        } else {
            setParsed(null);
            setError(error!);
        }
    };

    const handleCompress = () => {
        if (parsed) {
            return setRawInput(compressJson(parsed));
        }
        const cleaned = cleanJsonInput(rawInput);
        const {data, error} = validateJson(cleaned);
        if (data) {
            setParsed(data);
            setRawInput(compressJson(data));
            setError(null);
        } else {
            setParsed(null);
            setError(error!);
        }

    };

    const handleDownload = () => {
        if (parsed) downloadJson(parsed);
    };

    const handleClear = () => {
        setRawInput("");
        setParsed(null);
        setError(null);
    };


    return (
        <div className="container mt-5">
            <h1 className="mb-4">JSON 工具箱 🧰</h1>
            <JsonInput value={rawInput} onChange={setRawInput}/>
            <br/>
            <Toolbar
                onFormat={handleFormat}
                onCompress={handleCompress}
                onDownload={handleDownload}
                onClear={handleClear}
            />
            <ErrorDisplay error={error}/>
            {parsed && (
                <>
                    <hr/>
                    <h3>JSON 树状表</h3>

                    <>
                        {select?.namespace && select.namespace.length > 0 && (
                            <div
                                className="alert alert-info mb-2 sticky-top"
                                style={{maxWidth: "auto", top: 0, zIndex: 1020}}
                                role="alert"
                            >
                                <strong>路径：</strong>
                                {select.namespace.join(" -> ")}
                            </div>
                        )}

                        {select?.name && select?.value && (
                            <div
                                className="alert alert-info mb-0 sticky-top"
                                style={{
                                    wordBreak: "break-all",
                                    whiteSpace: "pre-wrap",
                                    top: 60, // 稍微偏移，避免与路径栏重叠
                                    zIndex: 1010,
                                }}
                                role="alert"
                            >
                                <span style={{color: "red"}}>key：</span>
                                {select.name}
                                <br/>
                                <span style={{color: "red"}}>value：</span>
                                {typeof select.value === "object"
                                    ? JSON.stringify(select.value)
                                    : String(select.value)}
                            </div>
                        )}


                        <JsonTree
                            data={parsed}
                            onChoose={(select) => setSelect(select)}
                        />
                    </>

                </>
            )}
            <br/>
            <br/>
            {/*<div>*/}
            {/*    ©{new Date().getFullYear()} Created by 简心API*/}
            {/*</div>*/}
        </div>
    );
};

export default App;