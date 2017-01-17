
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

    // shadows for point light animation
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.BasicShadowMap;

    // SCENE
    scene = new THREE.Scene();

    ////////////////////////// Camera ///////////////////////////////
    /////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    // camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

    camera.position.set( 0, 100, 500 );
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
      [ 0.25, 0xffffff, 1, 2 ],
      [ 0.5, 0xADBBC2, 1, 1 ],
      [ 0.75, 0x767676, 0.75, 1 ],
      [ 1, 0x2E2E2E, 0.5, 1 ],
      [ 1.25, 0x000833, 0.8, 1 ],
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

      var totalSum = getDat(frequencyData, 0, 1000) / 100000;
      if (totalSum > 1) {
        totalSum = 1;
      }
      if (totalSum < 0.1) {
        totalSum = 0.1;
      }

      //////////////////////////////// Animate ///////////////////////////////
      //
      // var i, line, vertex1, vertex2, material, p,
      // parameters = [
      //   [ 0.25, 0xff7700, 1, 2 ],
      //   [ 0.5, 0xff9900, 1, 1 ],
      //   [ 0.75, 0xffaa00, 0.75, 1 ],
      //   [ 1, 0xffaa00, 0.5, 1 ],
      //   [ 1.25, 0x000833, 0.8, 1 ],
      //   [ 3.0, 0xaaaaaa, 0.75, 2 ],
      //   [ 3.5, 0xffffff, 0.5, 1 ],
      //   [ 4.5, 0xffffff, 0.25, 1 ],
      //   [ 5.5, 0xffffff, 0.125, 1 ]
      // ];
      //
      // _.forEach(geometry.vertices, function(particle, index){
      //
      //   for( i = 0; i < parameters.length; ++ i ) {
      //     p = parameters[ i ];
      //     material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ], linewidth: p[ 3 ] } );
      //     line = new THREE.LineSegments( geometry, material );
      //     line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
      //     line.originalScale = p[ 0 ];
      //     line.rotation.y = Math.random() * Math.PI;
      //     line.updateMatrix();
      //     scene.add( line );
      //   }
      // });
      //
      // geometry.verticesNeedUpdate = true;
      // geometry.colorsNeedUpdate = true;


       ////////////// animate motion
				var time = Date.now() * 0.0001;
				for ( var i = 0; i < scene.children.length; i ++ ) {
					var object = scene.children[ i ];
					if ( object instanceof THREE.Line ) {
						object.rotation.y = time * ( i < 4 ? ( i + 1 ) : - ( i + 1 ) );
						if ( i < 5 ) {
              object.scale.x =
              object.scale.y =
              object.scale.z =
              object.originalScale * totalSum * (i/5+1) * (1 + 0.5 * Math.sin( 7*time ));
            }
					}
				}

      ///////////////////////////// Re-Render Canvas ////////////////////////

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

}
