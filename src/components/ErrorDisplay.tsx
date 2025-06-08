import React from "react";

export const ErrorDisplay: React.FC<{ error: string | null }> = ({ error }) => {
  if (!error) return null;
  return <div className="alert alert-danger mt-2">❌ {error}</div>;
};