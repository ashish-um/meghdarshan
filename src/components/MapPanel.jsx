import React from 'react';
import Panel from './Panel';

const MapPanel = ({ forecastData, showGroundTruth }) => {
  const imageUrl = showGroundTruth ? forecastData?.groundTruthUrl : forecastData?.predictionUrl;
  return (
    <Panel className="flex-grow h-full flex flex-col">
      <div className="text-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Indian Subcontinent</h2>
          <p className="text-sm text-gray-500">INSAT-3DR Satellite View</p>
      </div>
      <div className="relative w-full flex-grow border border-gray-200 rounded-md overflow-hidden bg-gray-100">
        <img
          src="https://placehold.co/800x600/F3F4F6/6B7280?text="
          alt="Map of India"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {forecastData ? (
          <img
            src={imageUrl}
            alt={showGroundTruth ? "Ground Truth Clouds" : "Predicted Clouds"}
            className="absolute inset-0 w-full h-full object-contain animate-fade-in"
          />
        ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Forecast will be displayed here</p>
            </div>
        )}
        {forecastData && <div className="absolute top-2 right-2 bg-white bg-opacity-80 text-black text-xs rounded py-1 px-2 border border-gray-200 shadow-sm">
          Displaying: <span className="font-semibold">{showGroundTruth ? "Ground Truth" : "Prediction"}</span>
        </div>}
      </div>
    </Panel>
  );
};

export default MapPanel;
