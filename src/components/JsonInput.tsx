import React from "react";

interface JsonInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const JsonInput: React.FC<JsonInputProps> = ({value, onChange}) => {

    return (
        <textarea
            style={{
                height: "300px",
                fontFamily: "monospace",
                whiteSpace: "pre-line",  // 支持换行显示
            }}
            id="json-input"
            name="json-input"
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
            `Ctrl + D 收藏本网站，防止迷路
            请输入JSON数据（单引号、None等自动纠错）
            `}
        />
    )
};