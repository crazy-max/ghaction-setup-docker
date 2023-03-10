import * as core from '@actions/core';

export interface Inputs {
  version: string;
  channel: string;
}

export function getInputs(): Inputs {
  return {
    version: core.getInput('version'),
    channel: core.getInput('channel')
  };
}
