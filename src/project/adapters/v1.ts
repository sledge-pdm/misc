import { decodeWebp } from '../../buffer/webp';
import { ProjectV1 } from '../types/ProjectV1';
import { ProjectAdapter } from './base';
import { Canvas } from './parts/Canvas';
import { HistoryStacks } from './parts/History';
import { ImagePool } from './parts/ImagePool';
import { ImagePoolState } from './parts/ImagePoolState';
import { Layer } from './parts/Layer';
import { LayerListState } from './parts/LayerListState';
import { ProjectPart } from './parts/Project';
import { SnapshotPart } from './parts/Snapshots';

export class V1Adapter extends ProjectAdapter<ProjectV1> {
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

    const canvasSize = this.project.canvas.store.canvas;
    if (!canvasSize) return undefined;

    return decodeWebp(buffer.webpBuffer, canvasSize.width, canvasSize.height);
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
