export interface ProjectSnapshot {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  snapshot: any;
  thumbnail?: {
    packedBuffer: Uint8Array;
    width: number;
    height: number;
  };
}

export type SnapshotsPart = ProjectSnapshot[];
