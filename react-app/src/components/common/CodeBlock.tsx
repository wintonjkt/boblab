import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@carbon/react';
import { Copy, Checkmark } from '@carbon/icons-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  title,
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-language">{title || language}</span>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={copied ? Checkmark : Copy}
          iconDescription={copied ? 'Copied' : 'Copy code'}
          onClick={handleCopy}
          hasIconOnly={false}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 4px 4px',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;

// Made with Bob
