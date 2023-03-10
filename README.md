[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-setup-docker.svg?style=flat-square)](https://github.com/crazy-max/ghaction-setup-docker/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-docker--setup--docker-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/docker-setup-docker)
[![CI workflow](https://img.shields.io/github/actions/workflow/status/crazy-max/ghaction-setup-docker/ci.yml?branch=master&label=ci&logo=github&style=flat-square)](https://github.com/crazy-max/ghaction-setup-docker/actions?workflow=ci)
[![Test workflow](https://img.shields.io/github/actions/workflow/status/crazy-max/ghaction-setup-docker/test.yml?branch=master&label=test&logo=github&style=flat-square)](https://github.com/crazy-max/ghaction-setup-docker/actions?workflow=test)
[![Codecov](https://img.shields.io/codecov/c/github/crazy-max/ghaction-setup-docker?logo=codecov&style=flat-square)](https://codecov.io/gh/crazy-max/ghaction-setup-docker)

## About

GitHub Action to set up (download and install) [Docker CE](https://docs.docker.com/engine/).
Works on Linux, macOS and Windows.

![Screenshot](.github/setup-docker-action.png)

___

* [Usage](#usage)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [Contributing](#contributing)
* [License](#license)

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
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name      | Type   | Default               | Description                                                                                       |
|-----------|--------|-----------------------|---------------------------------------------------------------------------------------------------|
| `version` | String | `latest`              | Docker CE version (e.g., `v23.0.1`).                                                              |
| `channel` | String | `stable`              | Docker CE [channel](https://download.docker.com/linux/static/) (e.g, `stable`, `edge` or `test`). |
| `context` | String | `setup-docker-action` | Docker context name.                                                                              |

## Contributing

Want to contribute? Awesome! The most basic way to show your support is to star
the project, or to raise issues. If you want to open a pull request, please
read the [contributing guidelines](.github/CONTRIBUTING.md).

You can also support this project by [**becoming a sponsor on GitHub**](https://github.com/sponsors/crazy-max)
or by making a [PayPal donation](https://www.paypal.me/crazyws) to ensure this
journey continues indefinitely!

Thanks again for your support, it is much appreciated! :pray:

## License

Apache-2.0. See `LICENSE` for more details.
