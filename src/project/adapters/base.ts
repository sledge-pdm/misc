import { ProjectV0 } from '../types/ProjectV0';
import { ProjectV1 } from '../types/ProjectV1';
import { ProjectV2 } from '../types/ProjectV2';
import { Canvas } from './parts/Canvas';
import { HistoryStacks } from './parts/History';
import { ImagePool } from './parts/ImagePool';
import { Layer } from './parts/Layer';
import { ProjectPart } from './parts/Project';
import { SnapshotPart } from './parts/Snapshots';

type Project = ProjectV0 | ProjectV1 | ProjectV2;

export abstract class ProjectAdapter<P extends Project> {
  protected project: P;

  constructor(project: P) {
    this.project = project;
  }

  // basic interface
  abstract getCanvasInfo(): Canvas;
  abstract getLayers(): Layer[];
  abstract getRawBufferOf(layerId: string): Uint8ClampedArray | undefined;
  abstract getProject(): ProjectPart;
  abstract getImagePool(): ImagePool;
  abstract getHistory(): HistoryStacks;
  abstract getSnapshots(): SnapshotPart;

  // TODO: more interfaces
}
