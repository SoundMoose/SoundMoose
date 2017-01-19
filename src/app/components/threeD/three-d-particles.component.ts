import { Component } from '@angular/core';
import { state } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as THREE from 'three';
import * as ThreeOrbitControls from 'three-orbit-controls';
import * as _ from 'lodash'

import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

@Component({
  selector: 'three-d-particles',
  templateUrl: './three-d-sharedCanvas.component.html'
})
export class ThreeDParticlesComponent {

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
    var scene,
        camera,
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

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

    var material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: THREE.VertexColors
    });

    var geometry = new THREE.Geometry();
    var x, y, z;
    _.times(1000, function(n){
      x = (Math.random() * 800) - 400;
      y = (Math.random() * 800) - 400;
      z = (Math.random() * 800) - 400;

      geometry.vertices.push(new THREE.Vector3(x, y, z));
      geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    });

    var pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);


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

      _.forEach(geometry.vertices, function(particle, index){
        var dX, dY, dZ;
        dX = (Math.random() * 2 - 1) * totalSum * 5;
        dY = (Math.random() * 2 - 1) * totalSum * 5;
        dZ = (Math.random() * 2 - 1) * totalSum * 5;

        particle.add(new THREE.Vector3(dX, dY, dZ));
        geometry.colors[index] = new THREE.Color(Math.random() * totalSum, Math.random() * totalSum, Math.random() * totalSum);
      });
      geometry.verticesNeedUpdate = true;
      geometry.colorsNeedUpdate = true;

      ///////////////////////////// Re-Render Canvas ////////////////////////

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }
}
