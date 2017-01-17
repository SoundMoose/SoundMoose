
import { Component } from '@angular/core';
import { state } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

import * as THREE from 'three';
import * as ThreeOrbitControls from 'three-orbit-controls';

import * as _ from 'lodash'

@Component({
  selector: 'three-d-sphere',
  templateUrl: './three-d-sharedCanvas.component.html'
})
export class ThreeDSphereComponent {

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

  constructor( private audioSrc: AudioStream, private store$: Store<AppStore> ) {
    this.audioCtx = audioSrc.audioCtx;
    this.audioSrcNode = audioSrc.audioSrcNode;
  }

  ngOnInit(){

    // scene/environmental variables
		var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight,
  		r = 450,
      windowHalfX = window.innerWidth / 2,
  		windowHalfY = window.innerHeight / 2,
      camera,
      scene,
      renderer;

    var context = this;

    ////////////////////// Audio Set Up /////////////////////////////
    /////////////////////////////////////////////////////////////////
    // this.audioSrcNode.frequencyAnalyser.smoothingTimeConstant = 1;
    var frequencyData = new Uint8Array(this.audioSrc.frequencyAnalyser.frequencyBinCount);


    ////////////////////// Renderer and Scene ///////////////////////
    /////////////////////////////////////////////////////////////////
    var renderer: any = new THREE.WebGLRenderer(
      {
        canvas: <HTMLCanvasElement> document.getElementById("threeDCanvas"),
        antialias: true,
        alpha: true
      }
    );

    renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight-5); // -5 to keep from showing scroll bar on right

    // SCENE
    scene = new THREE.Scene();

    ////////////////////////// Camera ///////////////////////////////
    /////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
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
    function createGeometry() {
			var geometry = new THREE.Geometry();
			for ( i = 0; i < 1500; i ++ ) {
				var vertex1 = new THREE.Vector3();
				vertex1.x = Math.random() * 2 - 1;
				vertex1.y = Math.random() * 2 - 1;
				vertex1.z = Math.random() * 2 - 1;
				vertex1.normalize();
				vertex1.multiplyScalar( r );
				vertex2 = vertex1.clone();
				vertex2.multiplyScalar( Math.random() * 0.09 + 1 );
				geometry.vertices.push( vertex1 );
				geometry.vertices.push( vertex2 );
			}
			return geometry;
		}

    var i, line, vertex1, vertex2, material, p,
    parameters = [
      [ 0.25, 0xb70000, 1, 2 ], // inner most sphere
      [ 0.5, 0xffffff, 1, 1 ],
      [ 0.75, 0xADBBC2, 0.75, 1 ],
      [ 1, 0x767676, 0.5, 1 ],
      [ 1.25, 0x2E2E2E, 0.8, 1 ], // outer most sphere
      [ 3.0, 0xaaaaaa, 0.75, 2 ],
      [ 3.5, 0xffffff, 0.5, 1 ],
      [ 4.5, 0xffffff, 0.25, 1 ],
      [ 5.5, 0xffffff, 0.125, 1 ]
    ];

    var geometry = createGeometry();

		for( i = 0; i < parameters.length; ++ i ) {
			p = parameters[ i ];
			material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ], linewidth: p[ 3 ] } );
			line = new THREE.LineSegments( geometry, material );
			line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
			line.originalScale = p[ 0 ];
			line.rotation.y = Math.random() * Math.PI;
			line.updateMatrix();
			scene.add( line );
		}

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

      var getDatBass = getDat(frequencyData, 0, 200) / 50000;
      var getDatMid1 = getDat(frequencyData, 200, 400) / 40000;
      var getDatMid2 = getDat(frequencyData, 400, 600) / 30000;
      var getDatMid3 = getDat(frequencyData, 600, 800) / 20000;
      var getDatTreble = getDat(frequencyData, 800, 1000) / 10000;

      var totalSum = getDat(frequencyData, 0, 1000) / 100000;
      // if (totalSum > 1) { totalSum = 1; }
      if (totalSum < 0.3) { totalSum = 0.3; }

      // if (getDatBass > 1) { getDatBass = 1; }
      if (getDatBass < 0.3) { getDatBass = 0.3; }

      // if (getDatMid1 > 1) { getDatMid1 = 1; }
      if (getDatMid1 < 0.3) { getDatMid1 = 0.3; }

      // if (getDatMid2 > 1) { getDatMid2 = 1; }
      if (getDatMid2 < 0.3) { getDatMid2 = 0.3; }

      // if (getDatMid3 > 1) { getDatMid3 = 1; }
      if (getDatMid3 < 0.3) { getDatMid3 = 0.3; }

      // if (getDatTreble > 1) { getDatTreble = 1; }
      if (getDatTreble < 0.3) { getDatTreble = 0.3; }

      //////////////////////////////// Animate ///////////////////////////////

				var time = Date.now() * 0.0001;
				for ( var i = 0; i < scene.children.length; i ++ ) {
					var object = scene.children[ i ];
					if ( object instanceof THREE.Line ) {
						object.rotation.y = time * ( i < 4 ? ( i + 1 + totalSum ) : - ( i + 1  + totalSum ) );
						if ( i === 0 ) {
              object.scale.x =
              object.scale.y =
              object.scale.z =
              object.originalScale * getDatBass * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ));
            } else if ( i === 1 ) {
              object.scale.x =
              object.scale.y =
              object.scale.z =
              object.originalScale * getDatMid1 * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ));
            } else if ( i === 2 ) {
              object.scale.x =
              object.scale.y =
              object.scale.z =
              object.originalScale * getDatMid2 * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ));
            } else if ( i === 3 ) {
              object.scale.x =
              object.scale.y =
              object.scale.z =
              object.originalScale * getDatMid3 * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ));
            } else if ( i === 4 ) {
              object.scale.x =
              object.scale.y =
              object.scale.z =
              object.originalScale * getDatTreble * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ));
            }
					}
				}

      ///////////////////////////// Re-Render Canvas ////////////////////////

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

}
