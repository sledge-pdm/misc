export interface ProjectPart {
  loadProjectVersion?: {
    sledge: string; // semver
    project: number; // VX
  };

  thumbnailPath: string | undefined;
  isProjectChangedAfterSave: boolean;
  lastSavedPath: string | undefined;
  lastSavedAt: Date | undefined;

  autoSnapshotEnabled?: boolean;
  autoSnapshotInterval?: number; // in seconds
}
