
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

  private audioCtx: any;
  private audioSrcNode: any;

  private scene: any;
  private camera: any;
  private renderer: any;
  private geometry: any;
  private material: any;
  private mesh: any;

  private audio: any;

  constructor( private audioSrc: AudioStream, private store$: Store<AppStore> ) {
    this.audioCtx = audioSrc.audioCtx;
    this.audioSrcNode = audioSrc.audioSrcNode;
  }

  ngOnInit(){

    // this.audioCtx = new AudioContext();
    // this.audio = new Audio();
    // this.audio.src = '../../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3'
    // this.audioSrcNode = this.audioCtx.createMediaElementSource(this.audioSrc.audioElement);
    var analyser = this.audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    this.audioSrcNode.connect(analyser);
    this.audioSrcNode.connect(this.audioCtx.destination);
    // // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // this.audio.play();

    // scene/environmental variables
    var scene,
        light,
        light1,
        camera,
        renderer;

    // object/animation variables
    var geometry,
        material1,
        material2,
        material3,
        material4,
        material5,
        material6,
        material7,
        material8,
        material9,
        material10,
        mesh1,
        mesh2,
        mesh3,
        mesh4,
        mesh5,
        mesh6,
        mesh7,
        mesh8,
        mesh9,
        mesh10;

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
    geometry = new THREE.BoxGeometry(50, 50, 50); // segmented faces optional. Default is 1.
    // var cubeMaterial = new THREE.MeshPhongMaterial({color:frequencyData[i]*0xff3300});
    material1 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material2 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material3 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material4 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material5 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material6 = new THREE.MeshLambertMaterial({color: 0xffffff}); // for non-shiny surfaces
    material7 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material8 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material9 = new THREE.MeshLambertMaterial({color: 0x1A1A1A}); // for non-shiny surfaces
    material10 = new THREE.MeshLambertMaterial({color: 0xffffff}); // for non-shiny surfaces

    mesh1 = new THREE.Mesh(geometry, material1);
    mesh2 = new THREE.Mesh(geometry, material2);
    mesh3 = new THREE.Mesh(geometry, material3);
    mesh4 = new THREE.Mesh(geometry, material4);
    mesh5 = new THREE.Mesh(geometry, material5);
    mesh6 = new THREE.Mesh(geometry, material6);
    mesh7 = new THREE.Mesh(geometry, material7);
    mesh8 = new THREE.Mesh(geometry, material8);
    mesh9 = new THREE.Mesh(geometry, material9);
    mesh10 = new THREE.Mesh(geometry, material10);

    mesh1.position.set(-450, -150, -1000);
    mesh2.position.set(-350, -150, -1000);
    mesh3.position.set(-250, -150, -1000);
    mesh4.position.set(-150, -150, -1000);
    mesh5.position.set(-50, -150, -1000);
    mesh6.position.set(50, -150, -1000);
    mesh7.position.set(150, -150, -1000);
    mesh8.position.set(250, -150, -1000);
    mesh9.position.set(350, -150, -1000);
    mesh10.position.set(450, -150, -1000);

    scene.add(mesh1);
    scene.add(mesh2);
    scene.add(mesh3);
    scene.add(mesh4);
    scene.add(mesh5);
    scene.add(mesh6);
    scene.add(mesh7);
    scene.add(mesh8);
    scene.add(mesh9);
    scene.add(mesh10);

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
      var getDatMid1 = getDat(frequencyData, 100, 200);
      var getDatMid2 = getDat(frequencyData, 200, 300);
      var getDatMid3 = getDat(frequencyData, 300, 400);
      var getDatMid4 = getDat(frequencyData, 400, 500);
      var getDatMid5 = getDat(frequencyData, 500, 600);
      var getDatMid6 = getDat(frequencyData, 600, 700);
      var getDatMid7 = getDat(frequencyData, 700, 800);
      var getDatMid8 = getDat(frequencyData, 800, 900);
      var getDatTreble = getDat(frequencyData, 900, 1000);

      // console.log(frequencyData.length);
      // console.log(getDatBass/2000);
      // var adjustment = Math.round(frequencyData[0]/100);
      // var adjustment = Math.round(sumOfAll/10000);
      var colorAdjustmentBass = Math.round(getDatBass/3000);
      var colorAdjustmentMid1 = Math.round(getDatMid1/3000);
      var colorAdjustmentMid2 = Math.round(getDatMid2/3000);
      var colorAdjustmentMid3 = Math.round(getDatMid3/3000);
      var colorAdjustmentMid4 = Math.round(getDatMid4/3000);
      var colorAdjustmentMid5 = Math.round(getDatMid5/3000);
      var colorAdjustmentMid6 = Math.round(getDatMid6/3000);
      var colorAdjustmentMid7 = Math.round(getDatMid7/3000);
      var colorAdjustmentMid8 = Math.round(getDatMid8/3000);
      var colorAdjustmentTreble = Math.round(getDatTreble/3000);

      // mesh.material.color.setHex( adjustment*0xff3300 );
      // mesh.material.color.set( color );
      // mesh.material.color.set( colorAdjustment, colorAdjustment, colorAdjustment );
      mesh1.material.color.set('rgb(' + colorAdjustmentBass + 10 +',' + colorAdjustmentBass + 10 +',' + colorAdjustmentBass + 10 +')');
      mesh2.material.color.set('rgb(' + colorAdjustmentMid1 + 10 +',' + colorAdjustmentMid1 + 10 +',' + colorAdjustmentMid1 + 10 +')');
      mesh3.material.color.set('rgb(' + colorAdjustmentMid2 + 10 +',' + colorAdjustmentMid2 + 10 +',' + colorAdjustmentMid2 + 10 +')');
      mesh4.material.color.set('rgb(' + colorAdjustmentMid3 + 10 +',' + colorAdjustmentMid3 + 10 +',' + colorAdjustmentMid3 + 10 +')');
      mesh5.material.color.set('rgb(' + colorAdjustmentMid4 + 10 +',' + colorAdjustmentMid4 + 10 +',' + colorAdjustmentMid4 + 10 +')');
      mesh6.material.color.set('rgb(' + colorAdjustmentMid5 + 10 +',' + colorAdjustmentMid5 + 10 +',' + colorAdjustmentMid5 + 10 +')');
      mesh7.material.color.set('rgb(' + colorAdjustmentMid6 + 10 +',' + colorAdjustmentMid6 + 10 +',' + colorAdjustmentMid6 + 10 +')');
      mesh8.material.color.set('rgb(' + colorAdjustmentMid7 + 10 +',' + colorAdjustmentMid7 + 10 +',' + colorAdjustmentMid7 + 10 +')');
      mesh9.material.color.set('rgb(' + colorAdjustmentMid8 + 10 +',' + colorAdjustmentMid8 + 10 +',' + colorAdjustmentMid8 + 10 +')');
      mesh10.material.color.set('rgb(' + colorAdjustmentTreble + 10 +',' + colorAdjustmentTreble + 10 +',' + colorAdjustmentTreble + 10 +')');

      ///////// Geometry methods: https://threejs.org/docs/#Reference/Core/Geometry
      mesh1.scale.y = getDatBass/3000 + 1;
      mesh2.scale.y = getDatMid1/3000 + 1;
      mesh3.scale.y = getDatMid2/3000 + 1;
      mesh4.scale.y = getDatMid3/3000 + 1;
      mesh5.scale.y = getDatMid4/3000 + 1;
      mesh6.scale.y = getDatMid5/3000 + 1;
      mesh7.scale.y = getDatMid6/3000 + 1;
      mesh8.scale.y = getDatMid7/3000 + 1;
      mesh9.scale.y = getDatMid8/3000 + 1;
      mesh10.scale.y = getDatTreble/3000 + 1;

      mesh1.position.set(-450, getDatBass/120 - 100, -1000);
      mesh2.position.set(-350, getDatMid1/120 - 100, -1000);
      mesh3.position.set(-250, getDatMid2/120 - 100, -1000);
      mesh4.position.set(-150, getDatMid3/120 - 100, -1000);
      mesh5.position.set(-50, getDatMid4/120 - 100, -1000);
      mesh6.position.set(50, getDatMid5/120 - 100, -1000);
      mesh7.position.set(150, getDatMid6/120 - 100, -1000);
      mesh8.position.set(250, getDatMid7/120 - 100, -1000);
      mesh9.position.set(350, getDatMid8/120 - 100, -1000);
      mesh10.position.set(450, getDatTreble/120 - 100, -1000);

      mesh1.rotation.y += 0.01;
      mesh2.rotation.y += 0.01;
      mesh3.rotation.y += 0.01;
      mesh4.rotation.y += 0.01;
      mesh5.rotation.y += 0.01;
      mesh6.rotation.y += 0.01;
      mesh7.rotation.y += 0.01;
      mesh8.rotation.y += 0.01;
      mesh9.rotation.y += 0.01;
      mesh10.rotation.y += 0.01;
      // mesh1.rotation.x += 0.01;  // to use in modifying speed, size, or colors

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

  ngOnDestroy() {
    // this.audio.pause();
  }
}
