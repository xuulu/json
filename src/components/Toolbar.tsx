import React from "react";

interface Toolbar {
  onFormat: () => void;
  onCompress: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export const Toolbar: React.FC<Toolbar> = ({ onFormat, onCompress, onDownload, onClear }) => (
  <div className="btn-group mb-2" role="group">
    {/*<button className="btn btn-primary me-2" onClick={onFormat}>解析</button>*/}
    <button className="btn btn-primary me-2" onClick={onFormat}>格式化</button>
    <button className="btn btn-secondary" onClick={onCompress}>压缩</button>
    <button className="btn btn-success" onClick={onDownload}>下载</button>
    <button className="btn btn-danger" onClick={onClear}>清空</button>
  </div>
);