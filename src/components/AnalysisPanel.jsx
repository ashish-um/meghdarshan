import React from 'react';
import { Loader2, BarChart2, Download, FileText } from 'lucide-react';
import Panel from './Panel';
import MetricBar from './MetricBar';

const AnalysisPanel = ({ forecastData, isLoading, showGroundTruth, setShowGroundTruth }) => {
  if (isLoading) {
    return (
      <Panel className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin w-8 h-8 text-green-600 mb-2" />
        <p className="text-gray-500 text-sm">Analyzing...</p>
      </Panel>
    );
  }

  if (!forecastData) {
    return (
      <Panel className="flex flex-col items-center justify-center h-full text-center">
        <BarChart2 className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-gray-500 text-sm">Analysis will appear here once a forecast is generated.</p>
      </Panel>
    );
  }

  return (
    <Panel className="flex flex-col space-y-4 h-full">
      <h2 className="text-md font-semibold text-gray-900 border-b border-gray-200 pb-2">Analysis</h2>
      
      <div>
        <div className="flex space-x-2">
          <button onClick={() => setShowGroundTruth(false)} className={`w-1/2 py-1.5 text-sm rounded-md transition-colors ${!showGroundTruth ? 'bg-green-600 text-white shadow' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Prediction</button>
          <button onClick={() => setShowGroundTruth(true)} className={`w-1/2 py-1.5 text-sm rounded-md transition-colors ${showGroundTruth ? 'bg-green-600 text-white shadow' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Ground Truth</button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Predicted Frames</h3>
        <div className="flex space-x-2">
          {forecastData.predictionFrames.map((frame) => (
            <div key={frame.id} className="text-center flex-1">
              <img src={frame.url} alt={frame.time} className="rounded-md border border-gray-300 w-full h-16 object-cover" />
              <p className="text-xs text-gray-500 mt-1">{frame.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Quantitative Evaluation</h3>
        <div className="space-y-3">
            <MetricBar label="Structural Similarity (SSIM)" value={forecastData.metrics.ssim} max={1} unit="" />
            <MetricBar label="Peak Signal-to-Noise (PSNR)" value={forecastData.metrics.psnr} max={40} unit="dB" />
            <div className="bg-gray-100 p-3 rounded-md text-center">
                <p className="text-xs text-gray-600">Mean Absolute Error (Lower is better)</p>
                <p className="text-2xl font-bold text-gray-800">{forecastData.metrics.mae.toFixed(2)}</p>
            </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Accuracy Verdict</h3>
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
              <p className="font-semibold text-green-800">Excellent Accuracy</p>
              <p className="text-xs text-green-700 mt-1">High viability for operational forecasting.</p>
          </div>
      </div>

      <div className="space-y-2 border-t border-gray-200 pt-3 mt-auto">
        <h3 className="text-sm font-medium text-gray-600">Export & Download</h3>
        <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center text-sm"><Download className="mr-2 w-4 h-4" /><span>Download Prediction (GIF)</span></button>
        <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center text-sm"><FileText className="mr-2 w-4 h-4" /><span>Export Report (PDF)</span></button>
      </div>
    </Panel>
  );
};

export default AnalysisPanel;
