import React, { useRef } from 'react';
import { countWords } from '../utils/wordCounter';
import { getLinesArray, countLines } from '../utils/lineCounter';
import { useDiary } from '../hooks/useDiary';
import './DiaryPage.css';
import { typography } from '../../../common/utils/Typography';

const DiaryPage = ({ selectedDate }) => {
    const textareaRef = useRef(null);
    const gutterRef = useRef(null);

    const {
        title, setTitle,
        content, setContent,
        numSesion,
        status,
        saveRecord,
        loading
    } = useDiary(selectedDate);

    // Dynamic metrics calculation
    const wordCount = countWords(content);
    const lines = getLinesArray(content);
    const lineCount = countLines(content);

    // Sync scroll between textarea and gutter
    const handleScroll = () => {
        if (textareaRef.current && gutterRef.current) {
            gutterRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const handleSave = () => {
        saveRecord({
            lineas: lineCount,
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
                        SESSION::[RECORD_{numSesion.toString().padStart(2, '0')}]
                    </span>
                    <span className="diary-page__metric-tag" style={{ fontFamily: typography.accent }}>
                        WORDS::[{wordCount.toString().padStart(3, '0')}]
                    </span>
                    <span className="diary-page__metric-tag" style={{ fontFamily: typography.accent }}>
                        LINES::[{lineCount.toString().padStart(3, '0')}]
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
                    {lines.map((_, index) => (
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
            </div>
        </div>
    );
};

export default DiaryPage;
