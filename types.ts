export interface Territory {
  id: string; // Region Code
  name: string;
  multiplier: number;
  rate: number;
  isGlazed: boolean;
  owner?: string;
}

export interface UserStats {
  balance: number;
  glazeRate: number; // per second
  pnl: number;
  glazeCount: number;
}

export interface GlobeFeature {
  type: "Feature";
  id: string;
  properties: {
    name: string;
  };
  geometry: any; // GeometryObject from TopoJSON
}

export interface GeoJSON {
  type: "FeatureCollection";
  features: GlobeFeature[];
}

export enum Tab {
  MINE = 'MINE',
  STATS = 'STATS',
  INFO = 'INFO'
}