WheelEvent
------

[![Join the chat at https://gitter.im/WheelEvent/Lobby](https://badges.gitter.im/WheelEvent/Lobby.svg)](https://gitter.im/WheelEvent/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Stories in Ready](https://badge.waffle.io/wheelEvent/WheelEvent.png?label=ready&title=Ready)](https://waffle.io/wheelEvent/WheelEvent?utm_source=badge)
[![Travis build](https://travis-ci.org/wheelEvent/WheelEvent.svg?branch=master)](https://travis-ci.org/wheelEvent/WheelEvent)
[Private Trello](https://trello.com/b/SlAxc35m/wheelevent)

------


# Table of Contents
- [Quickstart](#quickstart)
- [Contributing](#contributing)
  - [Communication channels](#communication-channels)
  - [Using the issue tracker](#using-the-issue-tracker)
    - [Bug reports](#bug-reports)
    - [Feature Requests](#feature-requests)
  - [Pull Requests](#pull-requests)
    - [Submitting Your Pull Request](#submitting-your-pull-request)

# Quickstart:
```bash
git clone https://github.com/wheelEvent/WheelEvent
cd WheelEvent
npm install -g gulp
npm install -g gulp-cli
npm install
gulp serve
```

See [commands.md](https://github.com/wheelEvent/WheelEvent/blob/master/docs/commands.md) file to see all executable commands.

# Contributing

## Introduction

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Communication channels

Before you now get lost in the repository, here are a few starting points for you to check out. You might find that others have had similar questions or that your question rather belongs in one place than another.

* Chat: https://gitter.im/WheelEvent/Lobby

## Using the issue tracker

The [issue tracker](https://github.com/Dogfalo/materialize/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and [submitting pull requests](#pull-requests), but please respect the following conditions:

* Please **do not** use the issue tracker for personal support requests. [Stack Overflow `materialize`](https://stackoverflow.com/questions/tagged/materialize) tag is the best place to get help or use our [Gitter channel](https://gitter.im/Dogfalo/materialize).

* Please **do not** post comments like "+1" or ":thumbsup:". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)  instead. We reserve the right to delete comments which violate this rule.

* Please **do not** open issues without clearly stating the problem and desired result. [See the bug reports section](#bug-reports) for more information on creating effective issues.

* Please **do** [search for duplicate or closed issues](https://github.com/wheelEvent/WheelEvent/issues?utf8=%E2%9C%93&q=is%3Aissue). Duplicate issues will be closed.

* Please **close your own issue** once it is resolved.

### Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful! Unclear issues with little explanations will be closed.


#### Guidelines for bug reports:

1. **Use the GitHub issue search** - check if the issue has already been reported.

2. **Check if the issue has been fixed** - try to reproduce it using the latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test case](https://css-tricks.com/reduced-test-cases/) using **our** [Codepen template](#code-examples).

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs. Just make sure to fill out the issue template.

### Feature Requests

We like feature requests but make sure that it can be seen within the goals of the project and not just something you need individually. Also you should try and give as much examples and details about the new feature as possible.

## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic help. Thanks for taking the time to contribute.

**Please ask first** before working on any significant pull request, otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

**Do not edit `dist/*` files directly!** Those files are automatically generated. You should edit the
source files in `app/*` instead.

### Submitting Your Pull Request

Adhering to the following process is the best way to get your work included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/WheelEvent.git
   # Navigate to the newly cloned directory
   cd WheelEvent
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/wheelEvent/WheelEvent.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

5. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

6. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `master` branch. Reference any open issue in the description so it is automatically linked. Try and keep your commit history clean and concise. Once you submit your pull request, [Travis CI](https://travis-ci.org/wheelEvent/WheelEvent) will automatically run your tests and will show a checkmark to show that all the tests have passed. Once this is done, we’ll review your tests and code and make comments if there are issues or things we think could be improved. Then once everything looks good we’ll merge the code in!
