import os from 'os';
import path from 'path';
import * as uuid from 'uuid';
import * as core from '@actions/core';
import * as actionsToolkit from '@docker/actions-toolkit';
import {Install} from '@docker/actions-toolkit/lib/docker/install';
import {Docker} from '@docker/actions-toolkit/lib/docker/docker';

import * as context from './context';
import * as stateHelper from './state-helper';

actionsToolkit.run(
  // main
  async () => {
    const input: context.Inputs = context.getInputs();
    const runDir = path.join(os.homedir(), `setup-docker-action-${uuid.v4()}`);

    if (input.context == 'default') {
      throw new Error(`'default' context cannot be used.`);
    }

    const install = new Install({
      runDir: runDir,
      version: input.version,
      channel: input.channel || 'stable',
      contextName: input.context || 'setup-docker-action',
      daemonConfig: input.daemonConfig
    });
    let toolDir;
    if (!(await Docker.isAvailable()) || input.version) {
      await core.group(`Download docker`, async () => {
        toolDir = await install.download();
      });
    }
    if (toolDir) {
      stateHelper.setRunDir(runDir);
      const sockPath = await install.install();
      await core.group(`Setting outputs`, async () => {
        core.info(`sock=${sockPath}`);
        core.setOutput('sock', sockPath);
      });

      if (input.setHost) {
        await core.group(`Setting Docker host`, async () => {
          core.exportVariable('DOCKER_HOST', sockPath);
          core.info(`DOCKER_HOST=${sockPath}`);
        });
      }
    }

    await core.group(`Docker info`, async () => {
      await Docker.printVersion();
      await Docker.printInfo();
    });
  },
  // post
  async () => {
    if (stateHelper.runDir.length == 0) {
      return;
    }
    const install = new Install({
      runDir: stateHelper.runDir
    });
    await install.tearDown();
  }
);
