import {beforeEach, describe, expect, test} from '@jest/globals';

import * as context from '../src/context';

describe('getInputs', () => {
  beforeEach(() => {
    process.env = Object.keys(process.env).reduce((object, key) => {
      if (!key.startsWith('INPUT_')) {
        object[key] = process.env[key];
      }
      return object;
    }, {});
  });

  // prettier-ignore
  test.each([
    [
      0,
      new Map<string, string>([
        ['version', 'v24.0.8'],
        ['set-host', 'false'],
      ]),
      {
        version: 'v24.0.8',
        channel: '',
        context: '',
        daemonConfig: '',
        setHost: false
      } as context.Inputs
    ],
    [
      1,
      new Map<string, string>([
        ['version', 'v24.0.0-rc.4'],
        ['channel', 'test'],
        ['context', 'foo'],
        ['daemon-config', `{"debug":true,"features":{"containerd-snapshotter":true}}`],
        ['set-host', 'false'],
      ]),
      {
        version: 'v24.0.0-rc.4',
        channel: 'test',
        context: 'foo',
        daemonConfig: `{"debug":true,"features":{"containerd-snapshotter":true}}`,
        setHost: false
      } as context.Inputs
    ],
    [
      2,
      new Map<string, string>([
        ['set-host', 'true'],
      ]),
      {
        version: 'latest',
        channel: '',
        context: '',
        daemonConfig: '',
        setHost: true
      } as context.Inputs
    ]
  ])(
    '[%d] given %p as inputs, returns %p',
    async (num: number, inputs: Map<string, string>, expected: context.Inputs) => {
      inputs.forEach((value: string, name: string) => {
        setInput(name, value);
      });
      const res = await context.getInputs();
      expect(res).toEqual(expected);
    }
  );
});

// See: https://github.com/actions/toolkit/blob/master/packages/core/src/core.ts#L67
function getInputName(name: string): string {
  return `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
}

function setInput(name: string, value: string): void {
  process.env[getInputName(name)] = value;
}
