export type ImagePoolEntry = {
  id: string;
  webpBuffer?: Uint8Array;
  base: { width: number; height: number };
  transform?: { x: number; y: number; scaleX: number; scaleY: number; rotation?: number; flipX?: boolean; flipY?: boolean };
  opacity?: number;
  visible?: boolean;
  originalPath?: string;
  descriptionName?: string;
};
