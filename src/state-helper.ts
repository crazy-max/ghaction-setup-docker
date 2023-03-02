import * as core from '@actions/core';

export const runDir = process.env['STATE_rundir'] || '';

export function setRunDir(runDir: string) {
  core.saveState('rundir', runDir);
}
