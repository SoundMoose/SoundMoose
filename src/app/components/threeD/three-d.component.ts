
import { Component } from '@angular/core';
import { state } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

import * as THREE from 'three'


@Component({
  selector: 'three-d',
  styleUrls: [ './three-d.component.css' ],
  templateUrl: './three-d.component.html'
})
export class ThreeDComponent {

  private scene: any;
  private camera: any;
  private renderer: any;
  private geometry: any;
  private material: any;
  private mesh: any;

  private audio: any;

  constructor( private audioSrc: AudioStream, private store$: Store<AppStore> ) {

  }

  ngOnInit(){

    var ctx = new AudioContext();
    this.audio = new Audio();
    this.audio.src = '../../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3'
    var audioSrc = ctx.createMediaElementSource(this.audio);
    var analyser = ctx.createAnalyser();
    analyser.smoothingTimeConstant = 0.8;

    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    // // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    this.audio.play();

    var scene, light, light1, camera, renderer;
    var geometry, material1, material2, material3, mesh1, mesh2, mesh3;

    //RENDERER
    var renderer: any = new THREE.WebGLRenderer(
      {
        canvas: <HTMLCanvasElement> document.getElementById("threeDCanvas"),
        antialias: true,
        alpha: true
      }
    );

    renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    // camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

    // SCENE
    scene = new THREE.Scene();

    // LIGHTS - Ambiant light globally illuminates all objects in the scene equally.
    // AmbientLight( color, intensity )
    light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    // A light that gets emitted from a single point in all directions.
    // PointLight( color, intensity, distance, decay )
    // https://threejs.org/docs/?q=pointlight#Reference/Lights/PointLight
    light1 = new THREE.PointLight(0xffffff, 0.5);  // distance default === 0, decay default === 1
    // light.position.set( 50, 50, 50 );
    scene.add(light1);

    // OBJECT
    // BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    geometry = new THREE.BoxGeometry(100, 100, 100); // segmented faces optional. Default is 1.
    // var cubeMaterial = new THREE.MeshPhongMaterial({color:frequencyData[i]*0xff3300});
    material1 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material2 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material3 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    mesh1 = new THREE.Mesh(geometry, material1);
    mesh2 = new THREE.Mesh(geometry, material2);
    mesh3 = new THREE.Mesh(geometry, material3);

    mesh1.position.set(-200, 0, -1000);
    mesh2.position.set(0, 0, -1000);
    mesh3.position.set(200, 0, -1000);

    scene.add(mesh1);
    scene.add(mesh2);
    scene.add(mesh3);

    //RENDER LOOP
    requestAnimationFrame(render);

    function render() {
      analyser.getByteFrequencyData(frequencyData);

      function getDat(arr, startIdx, endIdx) {
        var result = 0;

        for (var i = startIdx; i <= endIdx; i++) {
          result += arr[i];
        }
        return result;
      }

      var getDatBass = getDat(frequencyData, 0, 100);
      var getDatMids = getDat(frequencyData, 200, 300);
      var getDatTreble = getDat(frequencyData, 500, 600);

      // console.log(getDatBass/2000);
      // var adjustment = Math.round(frequencyData[0]/100);
      // var adjustment = Math.round(sumOfAll/10000);
      var colorAdjustmentBass = Math.round(getDatBass/2000);
      var colorAdjustmentMids = Math.round(getDatMids/2000);
      var colorAdjustmentTreble = Math.round(getDatTreble/2000);

      // mesh.material.color.setHex( adjustment*0xff3300 );
      // mesh.material.color.set( color );
      // mesh.material.color.set( colorAdjustment, colorAdjustment, colorAdjustment );
      mesh1.material.color.set( 'rgb(' + colorAdjustmentBass + 10 +',' + colorAdjustmentBass + 10 +',' + colorAdjustmentBass + 10 +')');
      mesh2.material.color.set( 'rgb(' + colorAdjustmentMids + 10 +',' + colorAdjustmentMids + 10 +',' + colorAdjustmentMids + 10 +')');
      mesh3.material.color.set( 'rgb(' + colorAdjustmentTreble + 10 +',' + colorAdjustmentTreble + 10 +',' + colorAdjustmentTreble + 10 +')');

      ///////// Geometry methods: https://threejs.org/docs/#Reference/Core/Geometry
      mesh1.scale.y = getDatBass/2000 + 1;
      mesh2.scale.y = getDatMids/2000 + 1;
      mesh3.scale.y = getDatTreble/2000 + 1;

      mesh1.rotation.y += 0.01;
      mesh2.rotation.y += 0.01;
      mesh3.rotation.y += 0.01;
      // mesh1.rotation.x += 0.01;  // to use in modifying speed, size, or colors

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

  ngOnDestroy() {
    this.audio.pause();
  }
}
