import React, { useState } from 'react';
import { Square, Settings, Layers, Play, Loader2 } from 'lucide-react';
import Panel from './Panel';

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

const ControlsPanel = ({ onGenerate, isLoading, onRegionSelect, isRegionSelected }) => {
  const [region, setRegion] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('14:00');
  const [channels, setChannels] = useState({ vis: true, ir: true, wv: false });

  const handleRegionChange = (e) => {
      setRegion(e.target.value);
      onRegionSelect(e.target.value !== '');
  }

  const handleChannelChange = (e) => {
      setChannels(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  }

  return (
    <Panel className="flex flex-col h-full">
      <h2 className="text-md font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Forecasting Controls</h2>
      
      <div className="space-y-4 flex-grow">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Region of Interest</label>
          <div className="flex space-x-2">
            <select
              value={region}
              onChange={handleRegionChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">-- Select a Region --</option>
              {MOCK_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="p-2 bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-md" title="Draw Bounding Box">
              <Square size={20}/>
            </button>
          </div>
        </div>

        {isRegionSelected && (
            <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Start Date & Time</label>
                  <div className="flex space-x-2">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-1/2 p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"/>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-1/2 p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"/>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center"><Settings size={16} className="mr-2"/>Model Configuration</h3>
                  <div className="space-y-2">
                      <div>
                          <label className="text-xs font-medium text-gray-500">Forecast Horizon</label>
                          <select className="w-full p-1.5 mt-1 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500">
                              <option>1 Hour (2 frames)</option>
                              <option>2 Hours (4 frames)</option>
                              <option>3 Hours (6 frames)</option>
                          </select>
                      </div>
                      <div>
                          <label className="text-xs font-medium text-gray-500">Model Version</label>
                          <select className="w-full p-1.5 mt-1 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500">
                              <option>Megh-D v1.2 (Stable)</option>
                              <option>Megh-D v1.3 (Experimental)</option>
                          </select>
                      </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center"><Layers size={16} className="mr-2"/>Data Channels</h3>
                  <div className="space-y-1 text-sm">
                      <label className="flex items-center"><input type="checkbox" name="vis" checked={channels.vis} onChange={handleChannelChange} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" /> <span className="ml-2 text-gray-700">Visible (VIS)</span></label>
                      <label className="flex items-center"><input type="checkbox" name="ir" checked={channels.ir} onChange={handleChannelChange} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" /> <span className="ml-2 text-gray-700">Infrared (IR)</span></label>
                      <label className="flex items-center"><input type="checkbox" name="wv" checked={channels.wv} onChange={handleChannelChange} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" /> <span className="ml-2 text-gray-700">Water Vapor (WV)</span></label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Input Sequence</h3>
                  <div className="flex space-x-2">
                    {MOCK_INPUT_FRAMES.map((frame) => (
                        <div key={frame.id} className="text-center">
                        <img src={frame.url} alt={frame.time} className="rounded-md border border-gray-300" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        <p className="text-xs text-gray-500 mt-1">{frame.time}</p>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        )}
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={() => onGenerate({ region, dateTime: `${date}T${time}` })}
          disabled={isLoading || !isRegionSelected}
          className="w-full py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
        >
          {isLoading ? <><Loader2 className="animate-spin mr-2 w-5 h-5" />Generating...</> : <><Play className="mr-2 w-5 h-5" />Generate Forecast</>}
        </button>
      </div>
    </Panel>
  );
};

export default ControlsPanel;
