# SoundMoose - A Modern Media Platform

[![Build Status](https://travis-ci.org/hrr20-over9000/SoundMoose.svg?branch=master)](https://travis-ci.org/hrr20-over9000/SoundMoose)

## Team

  - __Product Owner__: Stefan Ruijsenaars
  - __Scrum Master__: Howard Xue
  - __Full Stack Engineers__: Doug Vaughn, Calvin Holloway

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 4, 5, 6

## Usage

Fork/Clone this repo, create a branch and hack away! Feel free to create a pull request with any suggested changes or bug-fixes.

### Installing Dependencies

NOTE: You will require API keys in order to make the app run on your local machine. Please contact the team for help getting set up with these!

Once you have your key file, from within the root directory, to build dev version:

```sh
npm install
npm start
```

From within the root directory, to build/serve prod version:

```sh
npm install
npm run build:prod
npm run server:prod
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Style Guide

[Angular 2 Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#naming)

## Server Maintenance
### Note: The below is provided for team reference.

To start the main production server from project root:
```
npm run build:prod
npm run server:prod
```

To start forwarding proxy from project root:
```
node proxy/proxy.js
```

Using a clone of https://github.com/soundcloud/waveformjs with the dependancies and gems installed, to start Ruby Waveform service from /var/waveformjs:
```
bundle exec rackup
```

With Python and Django installed, to start Django REST server within /var/www/soundmoose.com/server/project/ directory:
```
python manage.py runserver 0.0.0.0:8000
```

> Note: for info on how the virtual environment was set up visit http://docs.python-guide.org/en/latest/dev/virtualenvs/

To manage Django server, visit http://138.197.88.233:8000/admin/

To view API information, visit http://138.197.88.233:8000/api/
