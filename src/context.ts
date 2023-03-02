import * as core from '@actions/core';

export interface Inputs {
  version: string;
}

export function getInputs(): Inputs {
  return {
    version: core.getInput('version')
  };
}
