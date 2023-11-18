[![GitHub release](https://img.shields.io/github/release/docker/setup-docker-action.svg?style=flat-square)](https://github.com/docker/setup-docker-action/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-docker--setup--docker-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/docker-setup-docker)
[![CI workflow](https://img.shields.io/github/actions/workflow/status/docker/setup-docker-action/ci.yml?branch=master&label=ci&logo=github&style=flat-square)](https://github.com/docker/setup-docker-action/actions?workflow=ci)
[![Test workflow](https://img.shields.io/github/actions/workflow/status/docker/setup-docker-action/test.yml?branch=master&label=test&logo=github&style=flat-square)](https://github.com/docker/setup-docker-action/actions?workflow=test)
[![Codecov](https://img.shields.io/codecov/c/github/docker/setup-docker-action?logo=codecov&style=flat-square)](https://codecov.io/gh/docker/setup-docker-action)

## About

GitHub Action to set up (download and install) [Docker CE](https://docs.docker.com/engine/).
Works on Linux, macOS and Windows.

> **Note**
>
> This action is useful if you want to pin against a specific Docker version or
> set up a custom daemon configuration or if Docker is not available on your
> runner. If you're using [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)
> on Linux or Windows, Docker is already up and running, so it might not be
> necessary to use this action.

![Screenshot](.github/setup-docker-action.png)

___

* [Usage](#usage)
  * [Quick start](#quick-start)
  * [Daemon configuration](#daemon-configuration)
  * [Define custom `colima start` arguments (macOS)](#define-custom-colima-start-arguments-macos)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [Contributing](#contributing)
* [License](#license)

## Usage

### Quick start

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Set up Docker
        uses: docker/setup-docker-action@v2
```

### Daemon configuration

You can [configure the Docker daemon](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file)
using the `daemon-config` input. In the following example, we configure the
Docker daemon to enable debug and the [containerd image store](https://docs.docker.com/storage/containerd/)
feature:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Set up Docker
        uses: docker/setup-docker-action@v2
        with:
          daemon-config: |
            {
              "debug": true,
              "features": {
                "containerd-snapshotter": true
              }
            }
```

### Define custom `colima start` arguments (macOS)

You can define custom [`colima start` arguments](https://github.com/abiosoft/colima#customizing-the-vm)
using the `COLIMA_START_ARGS` environment variable to customize the VM:

```yaml
name: ci

on:
  push:

jobs:
  docker:
    runs-on: macos-latest
    steps:
      -
        name: Set up Docker
        uses: docker/setup-docker-action@v2
        env:
          COLIMA_START_ARGS: --cpu 4 --memory 8 --disk 32
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name            | Type   | Default               | Description                                                                                                                 |
|-----------------|--------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `version`       | String | `latest`              | Docker CE version (e.g., `v24.0.6`).                                                                                        |
| `channel`       | String | `stable`              | Docker CE [channel](https://download.docker.com/linux/static/) (e.g, `stable`, `edge` or `test`).                           |
| `daemon-config` | String |                       | [Docker daemon JSON configuration](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file) |
| `context`       | String | `setup-docker-action` | Docker context name.                                                                                                        |

## Contributing

Want to contribute? Awesome! You can find information about contributing to
this project in the [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## License

Apache-2.0. See `LICENSE` for more details.
