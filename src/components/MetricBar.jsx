import React from 'react';

const MetricBar = ({ label, value, max, unit }) => {
    const percentage = (value / max) * 100;
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">{label}</span>
                <span className="text-sm font-bold text-green-700">{value.toFixed(2)} {unit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default MetricBar;
