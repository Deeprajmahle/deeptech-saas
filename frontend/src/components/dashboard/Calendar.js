import React from 'react';

const Calendar = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const currentMonth = 'JANUARY, 2022';
    
    // Generate calendar dates
    const dates = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, 1, 2, 3, 4]
    ];

    const isCurrentDay = (day) => day === 5; // Example: 5th is current day
    const isHighlightedDay = (day) => day === 17; // Example: 17th is highlighted

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <button className="text-gray-600 hover:text-gray-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-lg font-semibold">{currentMonth}</h2>
                <button className="text-gray-600 hover:text-gray-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {days.map((day, index) => (
                    <div key={index} className="text-center text-sm font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {dates.map((week, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`
                                    text-center py-1 text-sm rounded-full
                                    ${isCurrentDay(day) ? 'bg-blue-500 text-white' : ''}
                                    ${isHighlightedDay(day) ? 'bg-green-500 text-white' : ''}
                                    ${!isCurrentDay(day) && !isHighlightedDay(day) ? 'text-gray-700 hover:bg-gray-100' : ''}
                                    ${weekIndex === 4 && day <= 7 ? 'text-gray-400' : ''}
                                    ${weekIndex === 0 && day >= 25 ? 'text-gray-400' : ''}
                                `}
                            >
                                {day}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
