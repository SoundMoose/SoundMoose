
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

  constructor( private audioSrc: AudioStream, private store$: Store<AppStore> ) {

  }

  ngOnInit(){

    var ctx = new AudioContext();
    var audio = new Audio();
    audio.src = '../../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3'
    var audioSrc = ctx.createMediaElementSource(audio);
    var analyser = ctx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    // // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    audio.play();

    var scene, light, light1, camera, renderer;
    var geometry, material, mesh;

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
    material = new THREE.MeshLambertMaterial({color: frequencyData[0]*0xff3300}); // for non-shiny surfaces
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -1000);

    scene.add(mesh);

    //RENDER LOOP
    requestAnimationFrame(render);

    function render() {
        analyser.getByteFrequencyData(frequencyData);

        // take in frequency data array of elements, return sum of first 150:
        function getDatBass(arr) {
          var result = 0;
          var counter = 0;

          while (counter < 100) {
            result += arr[counter];
            counter++
          }
          return result;
        }
        //make it less crazy
        // var add = (a, b) => a + b;
        // var sumOfAll = frequencyData.reduce(add, 0);
        var sumOfBass = getDatBass(frequencyData);

        // var adjustment = Math.round(frequencyData[0]/100);
        // var adjustment = Math.round(sumOfAll/10000);
        var adjustment = Math.round(sumOfBass/2000);

        // console.log(frequencyData)
        mesh.material.color.setHex( adjustment*0xff3300 );
        mesh.scale.y = sumOfBass/2000;
        mesh.rotation.x += 0.01;  // this is our animation, we should be able to pull out audio spectrum data
        mesh.rotation.y += 0.01;  // to use in modifying speed, size, or colors
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

  }
}
