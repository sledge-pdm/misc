import { Packr } from 'msgpackr';
import { readFile } from 'node:fs/promises';
import { ProjectAdapter } from '../../src/project';

export const packr = new Packr({ useRecords: true, mapsAsObjects: false });

export async function loadAndUnpackProject(projectUrl: URL) {
  const buffer = await readFile(projectUrl);
  const unpacked = packr.unpack(buffer);
  return unpacked;
}

export function projectCommonCheck(adapter: ProjectAdapter<any>): boolean {
  if (adapter.getLayers() === undefined) return false;
  if (adapter.getImagePoolEntries() === undefined) return false;
  if (adapter.getSnapshots() === undefined) return false;

  return true;
}
