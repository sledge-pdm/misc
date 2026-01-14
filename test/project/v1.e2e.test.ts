import { describe, expect, it } from 'vitest';
import { getProjectAdapter, getProjectVersion } from '../../src/project';
import { loadAndUnpackProject, projectCommonCheck } from './utils';

describe('v0 project io', () => {
  it('festa', async () => {
    const project = await loadAndUnpackProject(new URL('./v1_festa.sledge', import.meta.url));
    expect(getProjectVersion(project)).toBe(1);

    console.log(project);

    const adapter = getProjectAdapter(project);
    if (adapter === undefined) throw new Error("Couldn't create adapter.");
    expect(projectCommonCheck(adapter)).toBeTruthy();

    expect(adapter.getVersions()?.sledge).toBe('0.1.5');
    expect(adapter.getVersions()?.project).toBe(1);

    expect(adapter.getCanvasInfo().size.width).toBe(1064);
    expect(adapter.getCanvasInfo().size.height).toBe(1249);
    expect(adapter.getLayers().length).toBe(10);

    expect(adapter.getImagePoolEntries().length).toBe(2);
    const entry0 = adapter.getImagePoolEntries()[0];
    expect(entry0).toBeDefined();
    expect(entry0.base.width).toBe(765);
    expect(entry0.base.height).toBe(928);
    expect(adapter.getImagePoolImageOf(entry0.id)).toBeDefined;
  });

  it('sledgechan', async () => {
    const project = await loadAndUnpackProject(new URL('./v1_sledgechan.sledge', import.meta.url));
    expect(getProjectVersion(project)).toBe(1);

    console.log(project);

    const adapter = getProjectAdapter(project);
    if (adapter === undefined) throw new Error("Couldn't create adapter.");
    expect(projectCommonCheck(adapter)).toBeTruthy();

    expect(adapter.getVersions()?.sledge).toBe('0.1.5');
    expect(adapter.getVersions()?.project).toBe(1);

    expect(adapter.getCanvasInfo().size.width).toBe(767);
    expect(adapter.getCanvasInfo().size.height).toBe(995);
    expect(adapter.getLayers().length).toBe(10);

    expect(adapter.getHistory().undoStack.length).toBe(50);

    expect(adapter.getSnapshots().length).toBe(2);
    const snapshot0 = adapter.getSnapshots()[0];
    expect(snapshot0.name).toBe('2025/10/21 18:01:40');

    const snapshot0Adapter = getProjectAdapter(snapshot0.snapshot);
    expect(snapshot0Adapter?.getCanvasInfo().size.width).toBe(704);
    expect(snapshot0Adapter?.getCanvasInfo().size.height).toBe(1197);
  });
});
