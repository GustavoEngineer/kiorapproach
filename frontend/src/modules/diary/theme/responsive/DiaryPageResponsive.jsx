import React, { useRef } from 'react';
import { countWords } from '../../utils/wordCounter';
import { useDiary } from '../../hooks/useDiary';
import './DiaryPageResponsive.css';
import '../../../../common/components/TacticalScrollContainer.css';
import { typography } from '../../../../common/utils/Typography';

const DiaryPageResponsive = ({ selectedDate }) => {
    const textareaRef = useRef(null);
    const gutterRef = useRef(null);
    const ghostRef = useRef(null);
    const [visualLines, setVisualLines] = React.useState(20);
    const [linesWithTextCount, setLinesWithTextCount] = React.useState(0);

    const {
        title, setTitle,
        content, setContent,
        numPagina,
        status,
        saveRecord,
        loading
    } = useDiary(selectedDate || new Date());

    const wordCount = countWords(content);

    const syncVisualLines = React.useCallback(() => {
        if (textareaRef.current && ghostRef.current) {
            const style = window.getComputedStyle(textareaRef.current);
            const lineHeight = parseFloat(style.lineHeight) || 22.4;
            const width = textareaRef.current.clientWidth - 
                          parseFloat(style.paddingLeft) - 
                          parseFloat(style.paddingRight);
            
            ghostRef.current.style.width = `${width}px`;
            ghostRef.current.style.fontFamily = style.fontFamily;
            ghostRef.current.style.fontSize = style.fontSize;
            ghostRef.current.style.lineHeight = style.lineHeight;
            ghostRef.current.style.letterSpacing = style.letterSpacing;
            ghostRef.current.style.whiteSpace = 'pre-wrap';
            ghostRef.current.style.wordWrap = 'break-word';
            ghostRef.current.style.padding = '0';
            
            ghostRef.current.textContent = (content || '') + '\u200B';
            const actualContentHeight = ghostRef.current.clientHeight;
            
            const actualLines = (content === '' || content === undefined) ? 0 : Math.round(actualContentHeight / lineHeight);
            setLinesWithTextCount(actualLines);
            
            const totalTextHeight = textareaRef.current.scrollHeight - 
                                   parseFloat(style.paddingTop) - 
                                   parseFloat(style.paddingBottom);
            const totalLinesTotal = Math.max(20, Math.round(totalTextHeight / lineHeight));
            setVisualLines(totalLinesTotal);
        }
    }, [textareaRef, content]);

    React.useEffect(() => {
        syncVisualLines();
        window.addEventListener('resize', syncVisualLines);
        return () => window.removeEventListener('resize', syncVisualLines);
    }, [syncVisualLines, content]);

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
            <div className="diary-page-responsive diary-page-responsive--loading">
                <div className="diary-page-responsive__status" style={{ fontFamily: typography.accent }}>
                    INIT_LINK...
                </div>
            </div>
        );
    }

    return (
        <div className="diary-page-responsive">
            <div className="diary-page-responsive__header">
                <div className="diary-page-responsive__title-container">
                    <input 
                        type="text" 
                        className="diary-page-responsive__title-input" 
                        placeholder="LOG_TITLE..."
                        style={{ fontFamily: typography.primary }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="diary-page-responsive__metrics">
                    <div className="diary-page-responsive__metric-group">
                        <span className="diary-page-responsive__metric-tag" style={{ fontFamily: typography.accent }}>
                            P::{numPagina.toString().padStart(2, '0')}
                        </span>
                        <span className="diary-page-responsive__metric-tag" style={{ fontFamily: typography.accent }}>
                            W::{wordCount.toString().padStart(3, '0')}
                        </span>
                        <span className="diary-page-responsive__metric-tag" style={{ fontFamily: typography.accent }}>
                            L::{linesWithTextCount.toString().padStart(3, '0')}
                        </span>
                    </div>
                    
                    <button 
                        className={`diary-page-responsive__save-btn diary-page-responsive__save-btn--${status.toLowerCase()}`}
                        onClick={handleSave}
                        style={{ fontFamily: typography.accent }}
                    >
                        {status === 'SAVING' ? 'SYNC...' : 
                         status === 'SAVED' ? 'OK' : 
                         status === 'ERROR' ? 'FAIL' : 'SAVE'}
                    </button>
                </div>
            </div>
            
            <div className="diary-page-responsive__body">
                <div className="diary-page-responsive__gutter" ref={gutterRef} style={{ fontFamily: typography.mono }}>
                    {Array.from({ length: visualLines }).map((_, index) => (
                        <div key={index} className="diary-page-responsive__line-number">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>
                    ))}
                </div>

                <textarea 
                    ref={textareaRef}
                    className="diary-page-responsive__content-area tactical-scroll"
                    placeholder="ENTER_LOG..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onScroll={handleScroll}
                    style={{ fontFamily: typography.mono }}
                    spellCheck="false"
                />

                <div 
                    ref={ghostRef} 
                    style={{
                        position: 'absolute',
                        visibility: 'hidden',
                        height: 'auto',
                        top: 0,
                        left: -1000,
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

export default DiaryPageResponsive;
