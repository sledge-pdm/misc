import { describe, expect, it } from 'vitest';
import { getProjectAdapter, getProjectVersion } from '../../src/project';
import { loadAndUnpackProject, projectCommonCheck } from './utils';

describe('v0 project io', () => {
  it('v0_nagumo', async () => {
    const project = await loadAndUnpackProject(new URL('./v0_nagumo.sledge', import.meta.url));

    expect(getProjectVersion(project)).toBe(0);

    const adapter = getProjectAdapter(project);
    if (adapter === undefined) throw new Error("Couldn't create adapter.");
    expect(projectCommonCheck(adapter)).toBeTruthy();

    expect(adapter?.getCanvasInfo().size.width).toBe(1024);
    expect(adapter?.getCanvasInfo().size.height).toBe(1024);
    expect(adapter?.getLayers().length).toBe(3);
  });
});
