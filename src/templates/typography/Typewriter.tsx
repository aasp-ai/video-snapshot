import React, { useMemo } from 'react';
import { useCurrentFrame, useTransform } from 'remotion';

interface TypewriterProps {
    text: string;
    font?: string;
    size?: number;
    color?: string;
    speed?: number;
    cursor?: boolean;
    cursorColor?: string;
    cursorStyle?: 'block' | 'line' | 'underscore';
    startFrame?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    font = 'JetBrains Mono',
    size = 36,
    color = '#00ff88',
    speed = 3,
    cursor = true,
    cursorColor = '#00ff88',
    cursorStyle = 'line',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const charsRevealed = Math.floor((frame - startFrame) / speed);
    const displayedText = text.substring(0, Math.max(0, charsRevealed));

    const cursorOpacity = useTransform(
        frame,
        [startFrame, startFrame + 15, startFrame + 30],
        [1, 0, 1]
    );

    const getCursorStyle = (): React.CSSProperties => {
        switch (cursorStyle) {
            case 'block':
                return {
                    width: size * 0.6,
                    height: size * 0.9,
                    background: cursorColor,
                    marginLeft: 4,
                    opacity: cursorOpacity,
                };
            case 'underscore':
                return {
                    width: size * 0.8,
                    height: 3,
                    background: cursorColor,
                    marginLeft: 4,
                    marginTop: size * 0.6,
                    opacity: cursorOpacity,
                };
            default:
                return {
                    width: 2,
                    height: size * 0.8,
                    background: cursorColor,
                    marginLeft: 4,
                    opacity: cursorOpacity,
                };
        }
    };

    return (
        <div style={{ 
            fontFamily: font, 
            fontSize: size, 
            color, 
            display: 'inline-flex', 
            alignItems: 'center',
            whiteSpace: 'pre-wrap',
        }}>
            <span>{displayedText}</span>
            {cursor && charsRevealed < text.length && (
                <div style={getCursorStyle()} />
            )}
        </div>
    );
};

interface CodeBlockProps {
    code: string;
    language?: string;
    font?: string;
    size?: number;
    backgroundColor?: string;
    lineNumberColor?: string;
    keywordColor?: string;
    stringColor?: string;
    commentColor?: string;
    functionColor?: string;
    startFrame?: number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language = 'typescript',
    font = 'JetBrains Mono',
    size = 20,
    backgroundColor = '#1e1e1e',
    lineNumberColor = '#6e7681',
    keywordColor = '#ff7b72',
    stringColor = '#a5d6ff',
    commentColor = '#8b949e',
    functionColor = '#d2a8ff',
    startFrame = 0,
}) => {
    const frame = useCurrentFrame();

    const lines = code.split('\n');

    const highlightLine = Math.floor((frame - startFrame) / 45);

    const tokenize = (line: string): { text: string; type: 'keyword' | 'string' | 'comment' | 'function' | 'text' }[] => {
        const tokens: { text: string; type: 'keyword' | 'string' | 'comment' | 'function' | 'text' }[] = [];
        let currentText = '';
        let currentType: 'keyword' | 'string' | 'comment' | 'function' | 'text' = 'text';

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (currentType === 'comment') {
                currentText += char;
                if (i === line.length - 1) {
                    tokens.push({ text: currentText, type: currentType });
                }
                continue;
            }

            if (char === '/' && line[i + 1] === '/') {
                if (currentText) tokens.push({ text: currentText, type: currentType });
                currentText = line.substring(i);
                currentType = 'comment';
                tokens.push({ text: currentText, type: currentType });
                break;
            }

            if (char === '"' || char === "'" || char === '`') {
                if (currentText) tokens.push({ text: currentText, type: currentType });
                currentText = char;
                currentType = 'string';
                continue;
            }

            if (currentType === 'string') {
                currentText += char;
                if (char === currentText[0]) {
                    tokens.push({ text: currentText, type: currentType });
                    currentText = '';
                    currentType = 'text';
                }
                continue;
            }

            const keywords = ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 'if', 'else', 'for', 'while', 'class', 'interface', 'type'];
            const isKeyword = keywords.some(kw => line.substring(i).startsWith(kw));

            if (isKeyword && !currentText) {
                currentType = 'keyword';
            }

            if (currentType === 'keyword' && !isKeyword && /[a-zA-Z0-9]/.test(char)) {
                const wordEnd = i + line.substring(i).search(/[^a-zA-Z0-9]/);
                if (wordEnd > i) {
                    const word = line.substring(i, wordEnd);
                    if (tokens.length > 0 && tokens[tokens.length - 1].type === 'keyword' && tokens[tokens.length - 1].text === 'function') {
                        tokens.push({ text: word, type: 'function' });
                        i = wordEnd - 1;
                        currentText = '';
                        currentType = 'text';
                        continue;
                    }
                }
            }

            if (/[a-zA-Z0-9_]/.test(char) || currentText) {
                currentText += char;
            } else {
                if (currentText) tokens.push({ text: currentText, type: currentType });
                currentText = '';
                currentType = 'text';
            }

            if (i === line.length - 1 && currentText) {
                tokens.push({ text: currentText, type: currentType });
            }
        }

        return tokens.filter(t => t.text);
    };

    const getTokenColor = (type: 'keyword' | 'string' | 'comment' | 'function' | 'text') => {
        switch (type) {
            case 'keyword': return keywordColor;
            case 'string': return stringColor;
            case 'comment': return commentColor;
            case 'function': return functionColor;
            default: return '#ffffff';
        }
    };

    return (
        <div style={{ 
            fontFamily: font, 
            fontSize: size, 
            background: backgroundColor, 
            padding: 24, 
            borderRadius: 8,
            overflow: 'hidden',
        }}>
            {lines.map((line, lineIndex) => {
                const isHighlighted = lineIndex === highlightLine;
                const tokens = tokenize(line);

                return (
                    <div 
                        key={lineIndex}
                        style={{ 
                            display: 'flex',
                            background: isHighlighted ? 'rgba(255,255,255,0.05)' : 'transparent',
                            padding: '2px 0',
                        }}
                    >
                        <span style={{ 
                            color: lineNumberColor, 
                            minWidth: 40, 
                            textAlign: 'right', 
                            marginRight: 16,
                            userSelect: 'none',
                        }}>
                            {lineIndex + 1}
                        </span>
                        <span>
                            {tokens.map((token, i) => (
                                <span key={i} style={{ color: getTokenColor(token.type) }}>
                                    {token.text}
                                </span>
                            ))}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
