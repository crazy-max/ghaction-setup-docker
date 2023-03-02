import * as context from './context';
import * as core from '@actions/core';
import * as actionsToolkit from '@docker/actions-toolkit';

import {Install} from '../../../docker_org/actions/docker-actions-toolkit/lib/docker/install';
import {Context} from '../../../docker_org/actions/docker-actions-toolkit/lib/context';
import {Docker} from '../../../docker_org/actions/docker-actions-toolkit/lib/docker/docker';

actionsToolkit.run(
  // main
  async () => {
    const input: context.Inputs = context.getInputs();
    const install = new Install();

    let toolDir;
    if (!(await Docker.isAvailable()) || input.version) {
      await core.group(`Download docker`, async () => {
        toolDir = await install.download(input.version || 'latest');
      });
    }
    if (toolDir) {
      await install.install(toolDir, Context.tmpDir(), input.version);
    }

    await core.group(`Docker info`, async () => {
      await Docker.printVersion();
      await Docker.printInfo();
    });
  }
);
