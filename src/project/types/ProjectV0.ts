import { Size2D } from '../../types/Size';
import { ProjectBase } from './base';

// ProjectV0 Structure
// refer commit 5262df7 for more info

enum LayerType {
  Base,
  Dot,
  Image,
  Automate,
}

enum BlendMode {
  normal = 'Normal',
  multiply = 'Multiply',
  screen = 'Screen',
  overlay = 'Overlay',
  softLight = 'Soft Light',
  hardLight = 'Hard Light',
  linearLight = 'Linear Light',
  vividLight = 'Vivid Light',
}

interface Layer {
  id: string;
  name: string;
  type: LayerType;
  typeDescription: string;
  opacity: number;
  mode: BlendMode;
  enabled: boolean;
  dotMagnification: number;
}

type ImagePoolEntry = {
  id: string;
  originalPath: string; // ユーザーが選択した元のファイルパス
  resourcePath: string; // Tauri リソースフォルダ内のコピー先 URL
  fileName: string; // 表示用のファイル名（ベース名）
  /**
   * 元画像の自然サイズ（px）
   */
  base: { width: number; height: number };
  /**
   * 表示上の位置とスケール。transform-origin は (0,0) 前提。
   */
  transform: { x: number; y: number; scaleX: number; scaleY: number };
  /**
   * 透過度 / 表示
   */
  opacity: number;
  visible: boolean;
};

/**
 *  @deprecated ProjectV0 was used in sledge <= 0.0.12.
 *  !!!DO NOT MODIFY THIS INTERFACE FOR USERS COMPATIBILITY!!!
 */
export interface ProjectV0 extends ProjectBase {
  canvasStore: {
    canvas: Size2D;
  };
  projectStore: {
    thumbnailPath: string | undefined;
    isProjectChangedAfterSave: boolean;
    lastSavedAt: Date | undefined;

    autoSaveEnabled?: boolean;
    autoSaveInterval?: number; // in seconds
  };
  layerListStore: {
    layers: Layer[];
    baseLayer: {
      colorMode: 'transparent' | 'white' | 'black' | 'custom';
      customColor?: string; // カスタムカラーモード用のHEX色
    };
    activeLayerId: string;
    isImagePoolActive: boolean;
  };
  imagePoolStore: {
    selectedEntryId: string | undefined;
    preserveAspectRatio: boolean;
  };
  layerBuffers: Map<string, Uint8ClampedArray>;
  imagePool: ImagePoolEntry[];
}
