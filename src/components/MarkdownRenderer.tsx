import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple, clean markdown-to-elements renderer
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockLines: string[] = [];
  let keyIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block check
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div key={`code-${keyIndex++}`} className="my-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-xs shadow-lg">
            {codeBlockLanguage && (
              <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2 text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
                <span>{codeBlockLanguage}</span>
                <span className="text-[10px] text-zinc-600">code snippet</span>
              </div>
            )}
            <pre className="overflow-x-auto p-4 text-zinc-200 leading-relaxed">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLanguage = '';
        codeBlockLines = [];
      } else {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${keyIndex++}`} className="text-3xl font-extrabold tracking-tight text-zinc-100 mt-8 mb-4 border-b border-zinc-800 pb-3">
          {line.replace('# ', '')}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${keyIndex++}`} className="text-xl font-bold tracking-tight text-zinc-100 mt-8 mb-3">
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${keyIndex++}`} className="text-base font-semibold text-zinc-200 mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    // Horizontal Rule
    if (line.trim() === '---') {
      elements.push(<hr key={`hr-${keyIndex++}`} className="my-8 border-zinc-800" />);
      continue;
    }

    // List item
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.slice(2);
      elements.push(
        <li key={`li-${keyIndex++}`} className="text-xs sm:text-sm text-zinc-300 ml-4 list-disc space-y-1 my-1">
          {formatInline(text)}
        </li>
      );
      continue;
    }

    // Numbered list item
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      elements.push(
        <div key={`num-${keyIndex++}`} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 my-1.5 ml-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 shrink-0">{numberedMatch[1]}.</span>
          <div>{formatInline(numberedMatch[2])}</div>
        </div>
      );
      continue;
    }

    // Paragraph
    if (line.trim() !== '') {
      elements.push(
        <p key={`p-${keyIndex++}`} className="text-xs sm:text-sm text-zinc-300 leading-relaxed my-3">
          {formatInline(line)}
        </p>
      );
    }
  }

  return <div className="prose-custom max-w-none">{elements}</div>;
}

function formatInline(text: string): React.ReactNode {
  // Regex parsing for bold **text**, inline `code`, and [links](url)
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /(\*\*(.*?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold
      parts.push(<strong key={match.index} className="font-semibold text-zinc-100">{match[2]}</strong>);
    } else if (match[3]) {
      // Code
      parts.push(
        <code key={match.index} className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[11px] text-indigo-300 border border-zinc-700/50">
          {match[3]}
        </code>
      );
    } else if (match[4] && match[5]) {
      // Link
      parts.push(
        <a key={match.index} href={match[5]} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/40 font-medium">
          {match[4]}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
