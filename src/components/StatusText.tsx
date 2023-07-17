import React from "react";

interface StatusProps {
  // 1: ok | 0: is connecting
  status: number;
  content: string;
}

function StatusText({ status, content }: StatusProps) {
  return (
    <div
      className={`domain-status ${
        status === 0 ? "domain-status--isConnecting" : ""
      }`}
    >
      {content}
    </div>
  );
}

export default StatusText;
