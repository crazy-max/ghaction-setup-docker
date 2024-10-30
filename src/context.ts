import * as core from '@actions/core';
import {InstallSource} from '@docker/actions-toolkit/lib/docker/install';
import {parse} from 'csv-parse/sync';

export interface Inputs {
  source: InstallSource;
  daemonConfig?: string;
  context: string;
  setHost: boolean;
}

export function getInputs(): Inputs {
  const rawVersion = core.getInput('version') || 'latest';
  const source = parseSource(rawVersion);
  const channel = core.getInput('channel');
  if (channel && source.type === 'archive') {
    source.channel = channel;
  }

  return {
    source: source,
    daemonConfig: core.getInput('daemon-config'),
    context: core.getInput('context'),
    setHost: core.getBooleanInput('set-host')
  };
}

function parseSource(input: string): InstallSource {
  let [type, version, channel, tag] = ['archive', 'latest', 'stable', 'latest'];

  const fields = parse(input, {
    relaxColumnCount: true,
    skipEmptyLines: true
  })[0];
  for (const field of fields) {
    const parts = field
      .toString()
      .split(/(?<=^[^=]+?)=/)
      .map(item => item.trim());

    switch (parts[0]) {
      case 'type':
        type = parts[1];
        break;
      case 'version':
        version = parts[1];
        break;
      case 'channel':
        channel = parts[1];
        break;
      case 'tag':
        tag = parts[1];
        break;
      default:
        if (fields.length === 1) {
          version = parts[0];
          break;
        }
        throw new Error(`Invalid field: ${parts[0]}`);
    }
  }

  if (!type) {
    throw new Error(`Invalid type: ${type}`);
  }
  if (!channel) {
    throw new Error(`Invalid channel: ${channel}`);
  }
  if (!version) {
    throw new Error(`Invalid version: ${version}`);
  }
  if (!tag) {
    throw new Error(`Invalid tag: ${tag}`);
  }

  let src: InstallSource;
  switch (type) {
    case 'archive':
      src = {
        type: 'archive',
        version: version,
        channel: channel
      };
      break;
    case 'image':
      src = {
        type: 'image',
        tag: tag
      };
      break;
    default:
      throw new Error(`Invalid version: ${input}`);
  }

  return src;
}
