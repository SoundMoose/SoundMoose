
import { Component } from '@angular/core';
import { state } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

import * as THREE from 'three';
// import * as THREE from 'three-canvas-renderer';
import * as ThreeOrbitControls from 'three-orbit-controls';

import * as _ from 'lodash'

@Component({
  selector: 'three-d-terrain',
  templateUrl: './three-d-sharedCanvas.component.html'
})
export class ThreeDTerrainComponent {

  private audioCtx: any;
  private audioSrcNode: any;

  private scene: any;
  private camera: any;
  private renderer: any;
  private geometry: any;
  private material: any;
  private mesh: any;
  private OrbitControls: any;

  private audio: any;
  private controls: any;

  // private SEPARATION: number;
  // private AMOUNTX: number;
  // private AMOUNTY: number;
  // private particles: number;
  // private particle: number;
  // private count: number;
  // private windowHalfX: number;
  // private windowHalfY: number;

  constructor( private audioSrc: AudioStream, private store$: Store<AppStore> ) {
    this.audioCtx = audioSrc.audioCtx;
    this.audioSrcNode = audioSrc.audioSrcNode;

    // this.SEPARATION = 100;
    // this.AMOUNTX = 50;
    // this.AMOUNTY = 50;
    //
		// this.particles = 0;
    // this.particle = 0;
    // this.count = 0;
		// this.windowHalfX = window.innerWidth / 2;
		// this.windowHalfY = window.innerHeight / 2;

  }

  ngOnInit(){

    // scene/environmental variables
    var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
		var container, stats;
		var camera, scene, renderer;
		var particles, particle, count = 0;
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

    var context = this;

    ////////////////////// Audio Set Up /////////////////////////////
    /////////////////////////////////////////////////////////////////
    // this.audioSrcNode.frequencyAnalyser.smoothingTimeConstant = 1;
    var frequencyData = new Uint8Array(this.audioSrc.frequencyAnalyser.frequencyBinCount);


    ////////////////////// Renderer and Scene ///////////////////////
    /////////////////////////////////////////////////////////////////
    // var renderer: any = new THREE.CanvasRenderer(
    //   {
    //     canvas: <HTMLCanvasElement> document.getElementById("threeDCanvas"),
    //     antialias: true,
    //     alpha: true
    //   }
    // );

    // renderer.setClearColor( 0x000000, 0 );
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight-5); // -5 to keep from showing scroll bar on right

    // shadows for point light animation
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.BasicShadowMap;

    // SCENE
    scene = new THREE.Scene();

    ////////////////////////// Camera ///////////////////////////////
    /////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    // camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

    camera.position.set( 0, 100, 1000 );
    // scene.add(camera);

    // update on resize: renderer size, aspect ratio and projection matrix
    window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        renderer.setSize(WIDTH, HEIGHT-5); // -5 to keep from showing scroll bar on right

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    //////////////// Orbit Controls - In Development ////////////////
    /////////////////////////////////////////////////////////////////
    var OrbitControls = ThreeOrbitControls(THREE);
    this.controls = new OrbitControls(camera, renderer.domElement);

    ///////////////////////// Particles /////////////////////////////
    /////////////////////////////////////////////////////////////////
    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial( {
      color: 0xffffff,
      program: function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.fill();
      }
    } );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
			for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
				particle = particles[ i ++ ] = new THREE.Sprite( material );
				particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
				particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
				scene.add( particle );
			}
		}

    container = document.createElement( 'div' );
		document.body.appendChild( container );
    renderer = new THREE.CanvasRenderer();
    console.log(renderer);
    renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
    ///////////////////////// Render Loop ///////////////////////////
    /////////////////////////////////////////////////////////////////
    requestAnimationFrame(render);

    function render() {

      //////////////////////// Generate New Data ////////////////////
      context.audioSrc.frequencyAnalyser.getByteFrequencyData(frequencyData);

      ///////// Helper function to sum up portions of the data array
      function getDat(arr, startIdx, endIdx) {
        var result = 0;
        for (var i = startIdx; i <= endIdx; i++) {
          result += arr[i];
        }
        return result;
      }

      var totalSum = getDat(frequencyData, 0, 1000) / 100000;
      if (totalSum > 1) {
        totalSum = 1;
      }

      //////////////////////////////// Animate ///////////////////////////////

      // var i = 0;
			// for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
			// 	for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			// 		particle = particles[ i++ ];
			// 		particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
			// 			( Math.sin( ( iy + count ) * 0.5 ) * 50 );
			// 		particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
			// 			( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
			// 	}
			// }
      // count += 0.1;
      //
      ///////////////////////////// Re-Render Canvas ////////////////////////

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

}
