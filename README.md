<p align="center">
  <a href="#"><img src="https://raw.githubusercontent.com/yafp/media-dupes/master/.github/images/logo/128x128.png" width="128"></a>
</p>

<div align="center">
  <h1>media-dupes</h1>

a minimal content duplicator for common media services like youtube

available for:

![linux](https://raw.githubusercontent.com/yafp/media-dupes/master/.github/images/platform/linux_32x32.png)
![apple](https://raw.githubusercontent.com/yafp/media-dupes/master/.github/images/platform/apple_32x32.png)
![windows](https://raw.githubusercontent.com/yafp/media-dupes/master/.github/images/platform/windows_32x32.png)

[![DeepScan grade](https://deepscan.io/api/teams/8831/projects/11041/branches/160247/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8831&pid=11041&bid=160247)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0c30508f8add43ee8fbb62c2a669e76b)](https://www.codacy.com/manual/yafp/media-dupes?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=yafp/media-dupes&amp;utm_campaign=Badge_Grade)
![GitHub Actions - electron_builder](https://github.com/yafp/media-dupes/workflows/electron_builder/badge.svg)
![GitHub Actions - npm audit](https://github.com/yafp/media-dupes/workflows/npm%20audit/badge.svg)
![GitHub Current Release](https://img.shields.io/github/release/yafp/media-dupes.svg?style=flat)
![GitHub Release Date](https://img.shields.io/github/release-date/yafp/media-dupes.svg?style=flat)
![GitHub Download All releases](https://img.shields.io/github/downloads/yafp/media-dupes/total.svg)
![GitHub Last Commit](https://img.shields.io/github/last-commit/yafp/media-dupes.svg?style=flat)
![GitHub Issues Open](https://img.shields.io/github/issues-raw/yafp/media-dupes.svg?style=flat)
[![GitHub contributors](https://img.shields.io/github/contributors/yafp/media-dupes.svg)](https://github.com/yafp/media-dupes/graphs/contributors/)
[![Merged PRs](https://img.shields.io/github/issues-pr-closed-raw/yafp/media-dupes.svg?label=merged+PRs)](https://github.com/yafp/media-dupes/pulls?q=is:pr+is:merged)
[![GitHub stars](https://img.shields.io/github/stars/yafp/media-dupes)](https://github.com/yafp/media-dupes/stargazers)
![GitHub License](https://img.shields.io/github/license/yafp/media-dupes.svg)
[![jsdoc](https://github.com/yafp/media-dupes/workflows/jsdoc/badge.svg)](https://yafp.github.io/media-dupes/)
![GitHub AV Scan](https://github.com/yafp/media-dupes/workflows/av_scan/badge.svg)


![ui](https://raw.githubusercontent.com/yafp/media-dupes/master/.github/images/screenshots/ui_latest.png)

</div>

# project is discontinued

# about
**media-dupes** can<sup>[1](#footnote1)</sup>:

* download video
* download audio

**media-dupes** is:

* based on `electron`
* using bundled versions of `youtube-dl` and `ffmpeg` to do it's magic
* available for *freebsd*, *linux*, *macOS* and *windows*.
* free and open source

# getting started

### download
You'll find the latest releases [here](https://github.com/yafp/media-dupes/releases).

### install
Please see the [installation instructions](docs/INSTALL.md) for more details.

### updates
**media-dupes** checks on application launch if there is a newer `media-dupes` version available.
Updates must be installed manually as automatic updating of electron applications requires that the builds are code-signed, which i can't provide so far.

**media-dupes** checks as well on application launch if there are updates available for the bundled `youtube-dl` tool.

**Be aware:**

Updating the bundled `youtube-dl` package is only possible if the user has write access to the `media-dupes` installation path (which does not work for all available packages/installation types).

### changelog
Please see the [changelog](docs/CHANGELOG.md) for more details.

### license
Please see the [LICENSE](LICENSE) for more details.

### debugging / verbose / logging
Please see the [verbose](docs/VERBOSE.md) informations for more details.

### privacy
* **media-dupes** is using sentry to collect error reports and do some anonymous usage stats. This helps heavily finding bugs which might occur only in some specific use-cases.
* reporting is enabled by default, but can be disabled in the application settings UI.
* media-dupes is not tracking it's users (i.e. using Google Analytics or similar)
* no ip addresses are stored

Please check [here](docs/SENTRY.md) how **media-dupes** is using sentry and why.

### discussion
If you have question regarding **media-dupes** click [here](https://github.com/yafp/media-dupes/issues) to create an issue

### support / fund
If you want to support the development of **media-dupes** you can fund me on:

* [github](https://github.com/sponsors/yafp)
* [patreon](https://www.patreon.com/yafp)

### disclosure
**media-dupes** is not affiliated with any of the supported apps/services.


# developers
You are always welcome to check and even improve the code.

* Please see the [contributing informations](docs/CONTRIBUTING.md) for more details.
* A list of all contributors can be found [here](docs/CONTRIBUTORS.md).


***

###### footnotes
<a name="footnote1">1</a>: Assuming the provided url is supported by [youtube-dl](https://ytdl-org.github.io/youtube-dl/supportedsites.html).
