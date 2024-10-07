import React, { useState, useRef } from 'react';
import { CheckSquare, Calendar, UserPlus, Trash2, ArrowRight, Download } from 'lucide-react';

const GetShitDoneFast = () => {
  const [tasks, setTasks] = useState({
    do: [], schedule: [], delegate: [], eliminate: []
  });
  const matrixRef = useRef(null);

  const quadrants = [
    { key: 'do', title: 'Do It Now', subtitle: 'Important and urgent', icon: CheckSquare, color: 'bg-green-100' },
    { key: 'schedule', title: 'Schedule It', subtitle: 'Important but not urgent', icon: Calendar, color: 'bg-blue-100' },
    { key: 'delegate', title: 'Delegate It', subtitle: 'Not important but urgent', icon: UserPlus, color: 'bg-yellow-100' },
    { key: 'eliminate', title: 'Eliminate It', subtitle: 'Not important and not urgent', icon: Trash2, color: 'bg-red-100' }
  ];

  const addTask = (quadrant, task) => {
    setTasks(prev => ({...prev, [quadrant]: [...prev[quadrant], task]}));
  };

  const downloadAsPNG = () => {
    const svg = matrixRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "get-shit-done-fast.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Get Sh*t Done Fast</h1>
      <div className="relative">
        <svg ref={matrixRef} width="800" height="600" className="w-full h-auto">
          <rect width="800" height="600" fill="white" />
          <g transform="translate(50, 50)">
            <line x1="0" y1="500" x2="700" y2="500" stroke="black" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="500" stroke="black" strokeWidth="2" />
            
            <text x="-40" y="250" transform="rotate(-90 -40 250)" className="text-sm">Importance</text>
            <text x="350" y="540" className="text-sm">Urgency</text>
            
            <text x="-30" y="10" className="text-xs">High</text>
            <text x="-30" y="490" className="text-xs">Low</text>
            <text x="10" y="520" className="text-xs">High</text>
            <text x="680" y="520" className="text-xs">Low</text>

            {quadrants.map(({ key, title, subtitle, color }, index) => {
              const x = index % 2 * 350;
              const y = Math.floor(index / 2) * 250;
              return (
                <g key={key} transform={`translate(${x}, ${y})`}>
                  <rect width="350" height="250" fill={color.replace('bg-', '').replace('-100', '')} />
                  <text x="10" y="30" className="text-lg font-bold">{title}</text>
                  <text x="10" y="50" className="text-xs">{subtitle}</text>
                  <foreignObject x="10" y="60" width="330" height="180">
                    <div xmlns="http://www.w3.org/1999/xhtml">
                      <ul className="list-disc list-inside">
                        {tasks[key].map((task, i) => (
                          <li key={i} className="text-sm">{task}</li>
                        ))}
                      </ul>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="grid grid-cols-2 gap-1 absolute top-0 left-0 right-0 bottom-0">
          {quadrants.map(({ key, title, subtitle, icon: Icon, color }) => (
            <div key={key} className={`p-4 ${color}`}>
              <div className="flex items-center mb-2">
                <Icon className="mr-2" size={20} />
                <h2 className="text-lg font-bold">{title}</h2>
              </div>
              <p className="text-xs mb-3">{subtitle}</p>
              <input
                type="text"
                placeholder="Add task..."
                className="w-full p-2 rounded border bg-white bg-opacity-50"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addTask(key, e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
              <ul className="mt-2">
                {tasks[key].map((task, index) => (
                  <li key={index} className="text-sm mt-1">{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <button 
          onClick={downloadAsPNG}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Download className="mr-2" size={20} />
          Download as PNG
        </button>
        <p className="text-sm text-gray-600">
          Created by <a href="https://www.linkedin.com/in/himanshuraikwar/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Himanshu Raikwar</a>
        </p>
      </div>
    </div>
  );
};

export default GetShitDoneFast;