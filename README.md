[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-setup-docker.svg?style=flat-square)](https://github.com/crazy-max/ghaction-setup-docker/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-docker--setup--docker-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/docker-setup-docker)
[![CI workflow](https://img.shields.io/github/actions/workflow/status/crazy-max/ghaction-setup-docker/ci.yml?branch=master&label=ci&logo=github&style=flat-square)](https://github.com/crazy-max/ghaction-setup-docker/actions?workflow=ci)
[![Test workflow](https://img.shields.io/github/actions/workflow/status/crazy-max/ghaction-setup-docker/test.yml?branch=master&label=test&logo=github&style=flat-square)](https://github.com/crazy-max/ghaction-setup-docker/actions?workflow=test)
[![Codecov](https://img.shields.io/codecov/c/github/crazy-max/ghaction-setup-docker?logo=codecov&style=flat-square)](https://codecov.io/gh/crazy-max/ghaction-setup-docker)

## About

GitHub Action to set up [Docker CE](https://docs.docker.com/engine/). Works on
Linux, macOS and Windows.

![Screenshot](.github/setup-docker-action.png)

___

* [Usage](#usage)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [Contributing](#contributing)

## Usage

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
        uses: crazy-max/ghaction-setup-docker@v1
        with:
          version: 23.0.1
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name      | Type   | Description                         |
|-----------|--------|-------------------------------------|
| `version` | String | Docker CE version (e.g., `23.0.1`). |

## Contributing

Want to contribute? Awesome! You can find information about contributing to
this project in the [CONTRIBUTING.md](/.github/CONTRIBUTING.md)
