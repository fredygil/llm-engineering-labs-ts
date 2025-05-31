
import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="h-full">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 font-mono text-sm border-none outline-none resize-none bg-gray-900 text-gray-100"
        style={{
          fontSize: '14px',
          lineHeight: '1.5',
          tabSize: 4
        }}
        placeholder="Write your Python code here..."
        spellCheck={false}
      />
    </div>
  );
};
