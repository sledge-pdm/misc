import { ProjectBase } from '../types';
import { Canvas } from './parts/Canvas';
import { HistoryStacks } from './parts/History';
import { ImagePoolEntry } from './parts/ImagePoolEntry';
import { ImagePoolState } from './parts/ImagePoolState';
import { Layer } from './parts/Layer';
import { LayerListState } from './parts/LayerListState';
import { ProjectPart } from './parts/Project';
import { SnapshotsPart } from './parts/Snapshots';

export abstract class ProjectAdapter<P extends ProjectBase> {
  protected project: P;

  constructor(project: P) {
    this.project = project;
  }

  abstract ADAPTER_PROJECT_VERSION: number;

  getVersions():
    | {
        sledge: string;
        project: number;
      }
    | undefined {
    if (this.project.version && this.project.projectVersion) {
      return {
        sledge: this.project.version,
        project: this.project.projectVersion,
      };
    } else {
      // Avoid pretending that projectVersion = this.ADAPTER_PROJECT_VERSION
      return undefined;
    }
  }

  abstract getCanvasInfo(): Canvas;
  abstract getLayers(): Layer[];
  abstract getLayerListState(): LayerListState;
  abstract getRawBufferOf(layerId: string): Uint8ClampedArray | undefined;
  abstract getProjectInfo(): ProjectPart;
  abstract getImagePoolEntries(): ImagePoolEntry[];
  abstract getImagePoolState(): ImagePoolState;
  abstract getHistory(): HistoryStacks;
  abstract getSnapshots(): SnapshotsPart;
}
