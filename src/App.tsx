import React, {useState, useEffect, useCallback} from "react";
import {JsonInput} from "./components/JsonInput";
import {Toolbar} from "./components/Toolbar";
import {ErrorDisplay} from "./components/ErrorDisplay";
import {JsonTree} from "./components/JsonViewer";
import {
    validateJson,
    formatJson,
    compressJson,
    downloadJson,
} from "./utils/jsonUtils";
import type {OnSelectProps} from "@microlink/react-json-view";

const App: React.FC = () => {
    const [rawInput, setRawInput] = useState("");                     // 用户原始输入
    const [parsed, setParsed] = useState<any>(null);                  // 解析后的 JSON 对象
    const [error, setError] = useState<string | null>(null);         // 错误提示
    const [selected, setSelected] = useState<OnSelectProps | null>(null); // 被选中的值

    // 输入变更时校验 JSON
    useEffect(() => {
        if (!rawInput.trim()) {
            setParsed(null);
            setError(null);
            return;
        }

        const {data, error} = validateJson(rawInput);
        setParsed(data ?? null);
        setError(error ?? null);
        console.log(data)
    }, [rawInput]);

    // 格式化 JSON
    const handleFormat = useCallback(() => {
        parsed ? setRawInput(formatJson(parsed)) : setError("请输入有效的 JSON 数据，再进行格式化");
    }, [parsed]);

    // 压缩 JSON
    const handleCompress = useCallback(() => {
        parsed ? setRawInput(compressJson(parsed)) : setError("请输入有效的 JSON 数据，再进行压缩");
    }, [parsed]);

    // 下载 JSON 文件
    const handleDownload = useCallback(() => {
        parsed
            ?
            downloadJson(parsed)
            :
            setError("请输入有效的 JSON 数据，再进行下载");
    }, [parsed]);

    // 清空所有状态
    const handleClear = useCallback(() => {
        setRawInput("");
        setParsed(null);
        setError(null);
        setSelected(null);
    }, []);

    // 展示选中的路径与键值信息
    const renderSelectedInfo = () => {
        if (!selected) return <div className="alert alert-success mt-2">点击 value 数据查看路径</div>;

        const path = selected.namespace?.join(" → ");
        const key = selected.name;
        const value = selected.value?.toString();

        return (
            <>
                {path && (
                    <div className="alert alert-info mb-2 sticky-top" style={{top: 0, zIndex: 1020}}>
                        <strong>路径：</strong>{path}
                    </div>
                )}
                {key && value !== undefined && (
                    <div className="alert alert-info mb-0 sticky-top text-break"
                         style={{top: path ? 60 : 0, zIndex: 1010}}>
                        <span style={{color: "red"}}>key：</span> {key}
                        <br/>
                        <span style={{color: "red"}}>value：</span>{" "}
                        {
                            value.startsWith('http://') || value.startsWith('https://')
                                ? <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
                                : value
                        }
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="container mt-5">
            <JsonInput value={rawInput} onChange={setRawInput}/>

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
                    {renderSelectedInfo()}
                    <JsonTree data={parsed} onChoose={setSelected}/>
                </>
            )}
        </div>
    );
};

export default App;