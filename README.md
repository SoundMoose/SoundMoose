# SoundMoose

[![Build Status](https://travis-ci.org/SoundMoose/SoundMoose.svg?branch=master)]

## About

[SoundMoose](http://www.soundmoose.com) is a non-commercial music platform where you can listen to and discover new music. Create an account to access saved playlists, add tracks to your favorites, and play a "Guess the song" game with your friends!

Our code is based on TypeScript, Angular 2, nrgx/store, Ruby, and Django. For audio and animations, we use Web Audio API and ThreeJS.

All source code is available under the MIT license.

Many thanks to Last.fm, YouTube, Spotify, and SoundCloud for generously providing us with API access!

## Special thanks to

  - Stefan Ruijsenaars
  - Howard Xue
  - Doug Vaughn
  - Calvin Holloway

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

## Screenshots

![Main Page](Screenshots/screenshot1.png)


![Track Details](Screenshots/screenshot2.png)


![3D Experiments](Screenshots/recording-spheres.gif)


![3D Experiments](Screenshots/recording-frequencyBars.gif)
