import React, { useRef } from 'react';
import { countWords } from '../utils/wordCounter';
import { getLinesArray, countLines } from '../utils/lineCounter';
import { useDiary } from '../hooks/useDiary';
import './DiaryPage.css';
import { typography } from '../../../common/utils/Typography';

const DiaryPage = ({ selectedDate }) => {
    const textareaRef = useRef(null);
    const gutterRef = useRef(null);
    const ghostRef = useRef(null); // Ghost for precision measurement
    const [visualLines, setVisualLines] = React.useState(20); // Gutter lines (min 20)
    const [linesWithTextCount, setLinesWithTextCount] = React.useState(0); // Actual lines with text

    const {
        title, setTitle,
        content, setContent,
        numPagina,
        status,
        saveRecord,
        loading
    } = useDiary(selectedDate);

    // Dynamic metrics calculation
    const wordCount = countWords(content);
    
    // linesWithTextCount is now managed via syncVisualLines status.

    // Sync visual lines with scroll area using a Ghost Measure technique
    const syncVisualLines = React.useCallback(() => {
        if (textareaRef.current && ghostRef.current) {
            const style = window.getComputedStyle(textareaRef.current);
            const lineHeight = parseFloat(style.lineHeight) || 22.4;
            const width = textareaRef.current.clientWidth - 
                          parseFloat(style.paddingLeft) - 
                          parseFloat(style.paddingRight);
            
            // 1. Sync Ghost styles and content
            ghostRef.current.style.width = `${width}px`;
            ghostRef.current.style.fontFamily = style.fontFamily;
            ghostRef.current.style.fontSize = style.fontSize;
            ghostRef.current.style.lineHeight = style.lineHeight;
            ghostRef.current.style.letterSpacing = style.letterSpacing;
            ghostRef.current.style.whiteSpace = 'pre-wrap';
            ghostRef.current.style.wordWrap = 'break-word';
            ghostRef.current.style.padding = '0'; // Minimal for measurement
            
            // 2. Measure actual filled text
            // Adding \u200B (zero-width space) ensures trailing \n is physically measured by the ghost unit
            ghostRef.current.textContent = (content || '') + '\u200B';
            const actualContentHeight = ghostRef.current.clientHeight;
            
            // If the content is strictly empty, we report 0. 
            // If it has at least one character or space, it's at least 1 line.
            const actualLines = (content === '' || content === undefined) ? 0 : Math.round(actualContentHeight / lineHeight);
            setLinesWithTextCount(actualLines);
            
            // 3. For the Gutter look: we count the total visual space taken by paragraphs
            // but we always show at least 20 empty lines for the "tactic" look.
            const totalTextHeight = textareaRef.current.scrollHeight - 
                                   parseFloat(style.paddingTop) - 
                                   parseFloat(style.paddingBottom);
            const totalLinesTotal = Math.max(20, Math.round(totalTextHeight / lineHeight));
            setVisualLines(totalLinesTotal);
        }
    }, [textareaRef, content]);

    React.useEffect(() => {
        syncVisualLines();
        // Also sync on window resize
        window.addEventListener('resize', syncVisualLines);
        return () => window.removeEventListener('resize', syncVisualLines);
    }, [syncVisualLines, content]);

    // Sync scroll between textarea and gutter
    const handleScroll = () => {
        if (textareaRef.current && gutterRef.current) {
            gutterRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const handleSave = () => {
        saveRecord({
            lineas: linesWithTextCount,
            palabras: wordCount
        });
    };

    if (loading) {
        return (
            <div className="diary-page diary-page--loading">
                <div className="diary-page__status" style={{ fontFamily: typography.accent }}>
                    INITIALIZING_DATA_LINK...
                </div>
            </div>
        );
    }

    return (
        <div className="diary-page">
            {/* Header: Metrics, Title and Separators */}
            <div className="diary-page__header">
                {/* Row 1: Log Title */}
                <div className="diary-page__title-container">
                    <input 
                        type="text" 
                        className="diary-page__title-input" 
                        placeholder="IDENTIFY_LOG_TITLE..."
                        style={{ fontFamily: typography.primary }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="diary-page__separator" />

                {/* Row 2: Tactical Metrics & Sync */}
                <div className="diary-page__header-row">
                    <span className="diary-page__metric-tag" style={{ fontFamily: typography.accent }}>
                        PAGE::[PAGE_{numPagina.toString().padStart(3, '0')}]
                    </span>
                    <span className="diary-page__metric-tag" style={{ fontFamily: typography.accent }}>
                        WORDS::[{wordCount.toString().padStart(3, '0')}]
                    </span>
                    <span className="diary-page__metric-tag" style={{ fontFamily: typography.accent }}>
                        LINES::[{linesWithTextCount.toString().padStart(3, '0')}]
                    </span>
                    
                    {/* Tactical Save Action */}
                    <div className="diary-page__actions">
                        <button 
                            className={`diary-page__save-btn diary-page__save-btn--${status.toLowerCase()}`}
                            onClick={handleSave}
                            style={{ fontFamily: typography.accent }}
                        >
                            {status === 'SAVING' ? 'UPLOADING...' : 
                             status === 'SAVED' ? 'SYNC_COMPLETE' : 
                             status === 'ERROR' ? 'LINK_FAILURE' : 'SAVE_DATA'}
                        </button>
                    </div>
                </div>

                <div className="diary-page__separator" />
            </div>
            
            <div className="diary-page__body">
                {/* Line Gutter */}
                <div className="diary-page__gutter" ref={gutterRef} style={{ fontFamily: typography.mono }}>
                    {Array.from({ length: visualLines }).map((_, index) => (
                        <div key={index} className="diary-page__line-number">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>
                    ))}
                </div>

                {/* Writing Area */}
                <textarea 
                    ref={textareaRef}
                    className="diary-page__content-area"
                    placeholder="COMMENCE_LOG_ENTRY..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onScroll={handleScroll}
                    style={{ fontFamily: typography.mono }}
                    spellCheck="false"
                />

                {/* Hidden Ghost Measure Area */}
                <div 
                    ref={ghostRef} 
                    style={{
                        position: 'absolute',
                        visibility: 'hidden',
                        height: 'auto',
                        top: 0,
                        left: 100, // Safe off-screen area
                        zIndex: -1,
                        pointerEvents: 'none',
                        boxSizing: 'content-box',
                        overflow: 'hidden'
                    }}
                />
            </div>
        </div>
    );
};

export default DiaryPage;
