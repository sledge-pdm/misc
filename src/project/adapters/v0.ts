import { ProjectV0 } from '../types/ProjectV0';
import { ProjectAdapter } from './base';
import { Canvas } from './parts/Canvas';
import { HistoryStacks } from './parts/History';
import { ImagePool } from './parts/ImagePool';
import { ImagePoolState } from './parts/ImagePoolState';
import { Layer } from './parts/Layer';
import { LayerListState } from './parts/LayerListState';
import { ProjectPart } from './parts/Project';
import { SnapshotPart } from './parts/Snapshots';

export class V0Adapter extends ProjectAdapter<ProjectV0> {
  getCanvasInfo(): Canvas {
    return {
      size: this.project.canvasStore.canvas,
    };
  }

  getLayers(): Layer[] {
    return this.project.layerListStore.layers.map((l) => {
      return {
        ...l,
        cutFreeze: false,
      } as Layer;
    });
  }

  getRawBufferOf(layerId: string): Uint8ClampedArray | undefined {
    return this.project.layerBuffers.get(layerId);
  }

  getLayerListState(): LayerListState {
    return {
      ...this.project.layerListStore,
      selectionEnabled: false,
      selected: new Set(),
    };
  }

  getProject(): ProjectPart {
    return {
      ...this.project.projectStore,
      lastSavedPath: undefined,
    };
  }

  getImagePool(): ImagePool {
    return {
      entries: this.project.imagePool,
      selectedEntryId: this.project.imagePoolStore.selectedEntryId,
      preserveAspectRatio: this.project.imagePoolStore.preserveAspectRatio,
    };
  }

  getImagePoolState(): ImagePoolState {
    return {
      ...this.project.imagePoolStore,
    };
  }

  getHistory(): HistoryStacks {
    return {
      undoStack: [],
      redoStack: [],
    };
  }

  getSnapshots(): SnapshotPart {
    return {
      store: undefined,
    };
  }
}
