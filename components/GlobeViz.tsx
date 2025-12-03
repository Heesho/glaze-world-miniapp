import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { feature, merge } from 'topojson-client';
import { Territory, GlobeFeature } from '../types';
import { MOCK_TERRITORY_DATA, COLORS, REGION_MAPPING } from '../constants';

interface GlobeVizProps {
  onSelectTerritory: (t: Territory) => void;
  selectedId: string | null;
  glazingId: string | null;
}

// Switched to 50m resolution to include small countries like Djibouti, Gambia, etc.
const WORLD_ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const GlobeViz: React.FC<GlobeVizProps> = ({ onSelectTerritory, selectedId, glazingId }) => {
  const [geography, setGeography] = useState<GlobeFeature[]>([]);
  const [baseLand, setBaseLand] = useState<any>(null);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  
  // Pointer state for drag interaction
  const pointerRef = useRef<{ isDown: boolean; lastX: number; lastY: number }>({
    isDown: false,
    lastX: 0,
    lastY: 0
  });

  // Load Map Data & Merge
  useEffect(() => {
    fetch(WORLD_ATLAS_URL)
      .then(res => res.json())
      .then(data => {
        const rawCountries = data.objects.countries;
        
        // 1. Create Base Land Layer
        const landFeature = feature(data, data.objects.land);
        setBaseLand(landFeature);

        // 2. Create merged features for Risk regions
        const mergedFeatures: GlobeFeature[] = [];
        
        Object.entries(REGION_MAPPING).forEach(([regionKey, countryIds]) => {
            // Robust filtering: Check both integer parsing and direct value
            const regionGeometries = rawCountries.geometries.filter((g: any) => {
                const idNum = parseInt(g.id);
                // Check if ID matches our list (handle string/number differences)
                return countryIds.includes(idNum);
            });

            if (regionGeometries.length > 0) {
                const mergedGeometry = merge(data, regionGeometries);
                
                mergedFeatures.push({
                    type: "Feature",
                    id: regionKey,
                    properties: { name: MOCK_TERRITORY_DATA[regionKey]?.name || regionKey },
                    geometry: mergedGeometry
                });
            }
        });

        setGeography(mergedFeatures);
      })
      .catch(err => console.error("Failed to load globe data", err));
  }, []);

  // Projection Setup
  const projection = useMemo(() => {
    return d3.geoOrthographic()
      .scale(220) // Increased scale for larger appearance
      .translate([0, 0])
      .rotate(rotation);
  }, [rotation]);

  const pathGenerator = useMemo(() => {
    return d3.geoPath().projection(projection);
  }, [projection]);

  // --- Pointer Event Handlers for Rotation ---
  
  const handlePointerDown = (e: React.PointerEvent) => {
    // Capture pointer to ensure drag continues even if mouse leaves the element
    (e.target as Element).setPointerCapture(e.pointerId);
    pointerRef.current = {
      isDown: true,
      lastX: e.clientX,
      lastY: e.clientY
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerRef.current.isDown) return;
    
    // Calculate Delta
    const dx = e.clientX - pointerRef.current.lastX;
    const dy = e.clientY - pointerRef.current.lastY;
    
    // Update Rotation State
    // sensitivity: 0.5 deg per pixel
    setRotation(r => {
        const newLambda = r[0] + dx * 0.5;
        const newPhi = Math.max(-90, Math.min(90, r[1] - dy * 0.5));
        return [newLambda, newPhi, r[2]];
    });
    
    // Update last position
    pointerRef.current.lastX = e.clientX;
    pointerRef.current.lastY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    pointerRef.current.isDown = false;
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  // Dimensions - Increased for larger render area
  const width = 450;
  const height = 450;

  if (geography.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-pink-500 font-mono animate-pulse">
        <span className="mr-2">[INITIALIZING MAP DATA]</span>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full flex justify-center items-center overflow-hidden touch-none cursor-move select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }} // Critical for preventing scroll on mobile while dragging
    >
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-pink-600 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

      <svg 
        viewBox={`-${width/2} -${height/2} ${width} ${height}`}
        className="w-full max-w-[600px] touch-none"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 0, 153, 0.1))' }}
      >
        {/* Globe Background */}
        <circle r={projection.scale()} fill="#050505" stroke="#171717" strokeWidth="2" />
        
        {/* Graticule */}
        <path 
          d={pathGenerator(d3.geoGraticule10() as any) || undefined} 
          fill="none" 
          stroke="#1f2937" 
          strokeWidth="0.3" 
          className="opacity-20 pointer-events-none"
        />

        {/* 1. Base Land Layer (Fills any gaps) */}
        {baseLand && (
          <path 
            d={pathGenerator(baseLand) || undefined}
            fill="#111111"
            stroke="none"
          />
        )}

        {/* 2. Interactive Risk Sectors */}
        <g>
          {geography.map((feature, i) => {
            const isSelected = selectedId === feature.id;
            const isGlazing = glazingId === feature.id;
            const territoryData = MOCK_TERRITORY_DATA[feature.id];
            const isControlled = territoryData?.owner === "Heeshilio Frost";

            const d = pathGenerator(feature as any);
            
            if (!d) return null;

            let fill = "#1c1c1c";
            let stroke = "#000000";
            let strokeWidth = "1";
            let zIndex = 0;
            
            // Ownership Logic
            if (isControlled) {
                fill = COLORS.primary; // Pink for owned
            }

            // Selection Logic
            if (isSelected) {
                stroke = "#ffffff";
                strokeWidth = "2"; // Thicker white border
                zIndex = 10;
                // Note: fill stays determined by ownership (pink if owned, dark if not)
            }
            
            // Glazing Animation
            if (isGlazing) {
                fill = "#ffffff";
                stroke = "#ffffff";
                zIndex = 11;
            }

            return (
              <path
                key={feature.id || i}
                d={d}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                className="transition-colors duration-200 ease-out hover:fill-gray-800"
                style={{
                    filter: isSelected ? 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' : 'none',
                    zIndex: zIndex,
                    cursor: 'pointer'
                }}
                onClick={(e) => {
                    // Stop propagation to prevent drag from interfering immediately (though pointer events handle this well)
                    e.stopPropagation();
                    const mockData = MOCK_TERRITORY_DATA[feature.id] || { name: feature.properties.name, multiplier: 1.0, rate: 0.1, owner: undefined };
                    onSelectTerritory({
                        id: feature.id,
                        name: mockData.name,
                        multiplier: mockData.multiplier,
                        rate: mockData.rate,
                        isGlazed: false,
                        owner: mockData.owner
                    });
                }}
              />
            );
          })}
        </g>
        
        {/* Atmosphere Overlay */}
        <circle r={projection.scale()} fill="url(#grad1)" className="pointer-events-none" />
        <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="85%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: 0 }} />
                <stop offset="100%" style={{ stopColor: "rgb(255, 0, 153)", stopOpacity: 0.15 }} />
            </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GlobeViz;