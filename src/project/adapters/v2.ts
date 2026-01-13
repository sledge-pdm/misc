import { gzipInflate } from '../../buffer/gzip';
import { toUint8ClampedArray } from '../../buffer/RawPixelData';
import { ProjectV2 } from '../types/ProjectV2';
import { ProjectAdapter } from './base';
import { Canvas } from './parts/Canvas';
import { HistoryStacks } from './parts/History';
import { ImagePool } from './parts/ImagePool';
import { ImagePoolState } from './parts/ImagePoolState';
import { Layer } from './parts/Layer';
import { LayerListState } from './parts/LayerListState';
import { ProjectPart } from './parts/Project';
import { SnapshotPart } from './parts/Snapshots';

export class V2Adapter extends ProjectAdapter<ProjectV2> {
  getCanvasInfo(): Canvas {
    return {
      size: this.project.canvas.store.canvas,
    };
  }

  getLayers(): Layer[] {
    return this.project.layers.store.layers;
  }

  getRawBufferOf(layerId: string): Uint8ClampedArray | undefined {
    const buffer = this.project.layers.buffers.get(layerId);
    if (!buffer) return undefined;

    return toUint8ClampedArray(gzipInflate(buffer.deflatedBuffer));
  }

  getLayerListState(): LayerListState {
    return {
      ...this.project.layers.store,
    };
  }

  getProject(): ProjectPart {
    return {
      ...this.project.project.store,
    };
  }

  getImagePool(): ImagePool {
    return {
      entries: this.project.imagePool.store.entries,
      selectedEntryId: this.project.imagePool.store.selectedEntryId,
      preserveAspectRatio: this.project.imagePool.store.preserveAspectRatio,
    };
  }

  getImagePoolState(): ImagePoolState {
    return {
      ...this.project.imagePool.store,
    };
  }

  getHistory(): HistoryStacks {
    return {
      undoStack: this.project.history.undoStack,
      redoStack: this.project.history.redoStack,
    };
  }

  getSnapshots(): SnapshotPart {
    return {
      store: this.project.snapshots.store,
    };
  }
}
