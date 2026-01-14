import { ProjectV0 } from '../types/ProjectV0';
import { ProjectAdapter } from './base';
import { Canvas } from './parts/Canvas';
import { HistoryStacks } from './parts/History';
import { ImagePoolEntry } from './parts/ImagePoolEntry';
import { ImagePoolState } from './parts/ImagePoolState';
import { Layer } from './parts/Layer';
import { LayerListState } from './parts/LayerListState';
import { ProjectPart } from './parts/Project';
import { SnapshotsPart } from './parts/Snapshots';

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

  getProjectInfo(): ProjectPart {
    return {
      ...this.project.projectStore,
      lastSavedPath: undefined,
      // V0 don't have version signature so fallback
      loadProjectVersion: {
        sledge: '0.0.12',
        project: 0,
      },
    };
  }

  getImagePoolEntries(): ImagePoolEntry[] {
    return this.project.imagePool.map((entry) => {
      return {
        ...entry,
        descriptionName: undefined,
        webpBuffer: new Uint8Array(0),
        transform: {
          ...entry.transform,
          rotation: 0,
          flipX: false,
          flipY: false,
        },
        opacity: entry.opacity,
        visible: entry.visible,
      };
    });
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

  getSnapshots(): SnapshotsPart {
    return [];
  }
}
