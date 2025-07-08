import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import MapPanel from './components/MapPanel';
import AnalysisPanel from './components/AnalysisPanel';

// --- MOCK DATA ---
const MOCK_REGIONS = [
  "Bay of Bengal (Cyclone Path)",
  "Western Ghats (Monsoon)",
  "North Indian Plains",
  "Eastern Coast",
];

const MOCK_INPUT_FRAMES = [
  { id: 1, time: 'T-90m', url: 'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms-2/2024/07/p-1-91150527-Hurricane-Beryl-tracker-Live-maps-and-real-time-tools-show-path-of-historic-storm.jpg' },
  { id: 2, time: 'T-60m', url: 'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms-2/2024/07/p-1-91150527-Hurricane-Beryl-tracker-Live-maps-and-real-time-tools-show-path-of-historic-storm.jpg' },
  { id: 3, time: 'T-30m', url: 'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms-2/2024/07/p-1-91150527-Hurricane-Beryl-tracker-Live-maps-and-real-time-tools-show-path-of-historic-storm.jpg' },
  { id: 4, time: 'T-0', url: 'https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms-2/2024/07/p-1-91150527-Hurricane-Beryl-tracker-Live-maps-and-real-time-tools-show-path-of-historic-storm.jpg' },
];

const MOCK_FORECAST_DATA = {
  predictionFrames: [
    { id: 1, time: 'T+30m', url: 'https://www.tallahassee.com/gcdn/authoring/authoring-images/2024/09/26/PTCN/75396686007-2-pm-hurricane-helene-radar-sept-26-2024.jpg?width=1200&disable=upscale&format=pjpg&auto=webp' },
    { id: 2, time: 'T+60m', url: 'https://www.tallahassee.com/gcdn/authoring/authoring-images/2024/09/26/PTCN/75396686007-2-pm-hurricane-helene-radar-sept-26-2024.jpg?crop=1998,1125,x0,y399&width=660&height=371&format=pjpg&auto=webp' },
  ],
  metrics: {
    ssim: 0.88,
    psnr: 32.5,
    mae: 14.21,
  },
  groundTruthUrl: 'https://www.bostonglobe.com/resizer/_jt5BrvZA8IOoJA5LtLY60U_wG8=/300x0/arc-anglerfish-arc2-prod-bostonglobe/public/NHM2IMAM6RC2HAL3G4754IYW6I.gif',
  predictionUrl: 'https://cdn.mos.cms.futurecdn.net/Ld9oNLeHnJyqxvQdBegTfF.gif',
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [showGroundTruth, setShowGroundTruth] = useState(false);
  const [isRegionSelected, setIsRegionSelected] = useState(false);

  const handleGenerateForecast = (params) => {
    if (!params.region) {
        alert("Please select a region first.");
        return;
    }
    console.log("Generating forecast for:", params);
    setIsLoading(true);
    setForecastData(null);
    setTimeout(() => {
      setForecastData(MOCK_FORECAST_DATA);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
      <Header />
      <main className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-61px)]">
        <div className="lg:col-span-3 h-full">
          <ControlsPanel onGenerate={handleGenerateForecast} isLoading={isLoading} onRegionSelect={setIsRegionSelected} isRegionSelected={isRegionSelected}/>
        </div>
        <div className="lg:col-span-6 h-full">
          <MapPanel forecastData={forecastData} showGroundTruth={showGroundTruth} />
        </div>
        <div className="lg:col-span-3 h-full">
          <AnalysisPanel
            forecastData={forecastData}
            isLoading={isLoading}
            showGroundTruth={showGroundTruth}
            setShowGroundTruth={setShowGroundTruth}
          />
        </div>
      </main>
    </div>
  );
}
