import { useState } from "react";
import "./index.css";

export default function App() {
  const [floorArea, setFloorArea] = useState(150);
  const [pitch, setPitch] = useState(30);
  const [eaves, setEaves] = useState(600);

  const pitchFactors = [
    { angle: 0, factor: 1.0 },
    { angle: 10, factor: 1.02 },
    { angle: 15, factor: 1.04 },
    { angle: 20, factor: 1.06 },
    { angle: 25, factor: 1.1 },
    { angle: 30, factor: 1.15 },
    { angle: 35, factor: 1.2 },
    { angle: 40, factor: 1.25 },
    { angle: 45, factor: 1.3 },
  ];

  const getPitchFactor = () => {
    const closest = pitchFactors.reduce((prev, curr) =>
      Math.abs(curr.angle - pitch) < Math.abs(prev.angle - pitch) ? curr : prev
    );
    return closest.factor;
  };

  const getEavesFactor = () => {
    if (eaves <= 400) return 1.05;
    if (eaves <= 600) return 1.1;
    return 1.15;
  };

  const roofArea = (floorArea * getPitchFactor() * getEavesFactor()).toFixed(2);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h1>Kowhai Roof Restorations</h1>
      <p>Use this to estimate your roof size before purchasing a GrabOne voucher</p>

      <label>Floor Area (m²):</label>
      <input type="number" value={floorArea} onChange={(e) => setFloorArea(parseFloat(e.target.value))} />

      <label>Roof Pitch (°):</label>
      <input type="range" min="0" max="45" step="1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} />
      <div>{pitch}°</div>

      <label>Eaves Overhang (mm):</label>
      <input type="range" min="0" max="1000" step="50" value={eaves} onChange={(e) => setEaves(parseFloat(e.target.value))} />
      <div>{eaves} mm</div>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Estimated Roof Area: <span style={{ color: 'green' }}>{roofArea} m²</span>
      </div>
    </div>
  );
}
