import React from "react";

interface JsonInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const JsonInput: React.FC<JsonInputProps> = ({value, onChange}) => (
    <textarea
        id="json-input"
        name="json-input"
        className="form-control"
        style={{height: "300px", fontFamily: "monospace"}}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="请输入JSON数据（单引号、True、None等自动纠错）"
    />
);