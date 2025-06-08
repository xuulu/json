import React from "react";
import ReactJsonView from '@microlink/react-json-view'
import type {OnSelectProps} from '@microlink/react-json-view';

export const JsonTree: React.FC<{ data: any,  onChoose?:(select: OnSelectProps) => void }> = ({data,onChoose}) => (
    <>
        <ReactJsonView
            src={data}
            // theme='apathy:inverted'   // 主题
            theme='rjv-default'   // 主题
            collapsed={1}   // 折叠,展开的层数
            quotesOnKeys={true} // 删除引号
            enableClipboard={false} // 复制值
            onSelect={(select)=> {
                if (onChoose) onChoose(select)
            }}
        />
        <br />
    </>
);