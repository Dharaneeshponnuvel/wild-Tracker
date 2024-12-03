import React from 'react';
import './al.css';
const AlphabetFilter = ({ onLetterClick }) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z

    return (
        <div className="alphabet-filter">
            {letters.map(letter => (
                <button key={letter} onClick={() => onLetterClick(letter)}>
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default AlphabetFilter;
