
import { Component } from '@angular/core';
// import { ChangeDetectionStrategy } from '@angular/core'

// import { AppState } from '../app.service';
// import { PlayerService } from './../../services/player.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../../audio-element';

// import { Player } from '../../models/player.model';
// import { AudioControls } from '../../models/audio-controls.model';
// import { Observable } from 'rxjs/Observable';

import { AudioControlsActions } from '../../actions/audio-controls.actions';

import { state } from '@angular/core';

// import WebGLRenderer = THREE.WebGLRenderer;
// import Scene = THREE.Scene;
// import TrackballControls = THREE.TrackballControls;
// import PerspectiveCamera = THREE.PerspectiveCamera;
// import Mesh = THREE.Mesh;

import * as THREE from 'three'

@Component({
//  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'three-d',
  styleUrls: [ './three-d.component.css' ],
  templateUrl: './three-d.component.html'
})
export class ThreeDComponent {
  // trackExists$: Observable<boolean>;
  // showVisualization$: Observable<boolean>;
  // toggleFrequencyOrWaveform: boolean;
  // showEqualizer: boolean;
  private scene: any;
  private camera: any;
  private renderer: any;
  private geometry: any;
  private material: any;
  private mesh: any;

  constructor( private audioSrc: AudioStream, private store$: Store<AppStore> ) {
    // this.trackExists$ = this.store$.select('player')
    //   .map((playerStatus: Player) => playerStatus.currentTrack.duration !== 0);
    //
    // this.showVisualization$ = this.store$.select('player')
    //   .map((playerStatus: Player) => playerStatus.showVisualization);
    //
    // this.store$.select('audiocontrols')
    //   .map((audioControlsStatus: AudioControls) => audioControlsStatus.showEqualizer)
    //   .subscribe(item=> this.showEqualizer = item);
    //
    // this.store$.select('audiocontrols')
    //   .map((audioControlsStatus: AudioControls) => audioControlsStatus.toggleFrequencyOrWaveform)
    //   .subscribe(item=> this.toggleFrequencyOrWaveform = item);
  }

  ngOnInit(){
    var scene, light, light1, camera, renderer;
    var geometry, material, mesh;

    //RENDERER
    var renderer = new THREE.WebGLRenderer(
      {
        canvas: document.getElementById('myCanvas'),
        antialias: true
      }
    );

    renderer.setClearColor(0x00ff00);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    // camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

    //SCENE
    scene = new THREE.Scene();

    //LIGHTS - Ambiant light globally illuminates all objects in the scene equally.
    // AmbientLight( color, intensity )
    light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    // A light that gets emitted from a single point in all directions.
    // PointLight( color, intensity, distance, decay )
    // https://threejs.org/docs/?q=pointlight#Reference/Lights/PointLight
    light1 = new THREE.PointLight(0xffffff, 0.5);  // distance default === 0, decay default === 1
    // light.position.set( 50, 50, 50 );
    scene.add(light1);

    //OBJECT
    // BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    geometry = new THREE.BoxGeometry(100, 100, 100); // segmented faces optional. Default is 1.
    material = new THREE.MeshLambertMaterial({color: 0xF3FFE2}); // for non-shiny surfaces
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -1000);

    scene.add(mesh);

    //RENDER LOOP
    requestAnimationFrame(render);

    function render() {
        mesh.rotation.x += 0.01;  // this is our animation, we should be able to pull out audio spectrum data
        mesh.rotation.y += 0.01;  // to use in modifying speed, size, or colors
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

  }
}
