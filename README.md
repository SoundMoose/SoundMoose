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

## Learning Resources

### Angular 2

Beginner Friendly Introduction:
[Angular 2 Basics - Scotch School](https://school.scotch.io/getting-started-with-angular-2/angular-2-basics)

EggHead Bite Sized Snippets of Angular 2 Wisedom:
[EggHead Web Series: Angular 2](https://egghead.io/courses/introduction-to-reactive-programming)

Angular 2 Documentation Beginner Tutorial:
[TUTORIAL: TOUR OF HEROES](https://angular.io/docs/ts/latest/tutorial/)

Blog post outlining 'Tour of Heroes' Angular 2 Introduction completed using NGRX:
[Angular 2 Tour of Heroes Tutorial With the NGRX Suite](http://bodiddlie.github.io/ng-2-toh-with-ngrx-suite/)

### RxJS

[EggHead Web Series: Introduction to Reactive Programming](https://egghead.io/technologies/angular2)

[André Staltz (@andrestaltz): You will learn RxJS at ng-europe 2016](https://www.youtube.com/watch?v=uQ1zhJHclvs)

### TypeScript
Great introduction:
[All you need to know about Typescript, in 5 minutes](https://learnxinyminutes.com/docs/typescript/)

### Web Audio API
Introduction:
[Web Audio API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)


### ThreeJS
Documentation:
[ThreeJS Documentation - Creating a scene](https://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene)

### Audio Visualization
Blog containing list of great resources:
[Top music visualization resources for web audio API](https://blog.prototypr.io/get-started-with-the-web-audio-api-for-music-visualization-b6f594416a16#.3lixyt4ra)

Youtube Video Series Episode related to Web Audio Visualization
[Learning THREE.js - 11 -- Live Web Audio Visualizations](https://www.youtube.com/watch?v=tdtaihSNfMY)


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
