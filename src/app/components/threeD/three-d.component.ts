
import { Component } from '@angular/core';
// import { ChangeDetectionStrategy } from '@angular/core'

// import { AppState } from '../app.service';
// import { PlayerService } from './../../services/player.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';

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

        var ctx = new AudioContext();
        var audio = new Audio();
        audio.src = '../../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3'
        var audioSrc = ctx.createMediaElementSource(audio);
        var analyser = ctx.createAnalyser();

        audioSrc.connect(analyser);
        audioSrc.connect(ctx.destination);
        // // frequencyBinCount tells you how many values you'll receive from the analyser
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        // var cube, cubeMaterial, cubeGeometry;
        // var scene, camera, renderer;
        // var controls, guiControls, datGUI;
        // var axis, grid, color, fov;
        // var spotLight;
        // var stats;
        // var SCREEN_WIDTH, SCREEN_HEIGHT;
        //
        // function init(){
        //     /*creates empty scene object and renderer*/
        //     scene = new THREE.Scene();
        //     camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500);
        //     renderer = new THREE.WebGLRenderer({antialias:true});
        //
        //     renderer.setClearColor(0x000000);
        //     renderer.setSize(window.innerWidth, window.innerHeight);
        //     renderer.shadowMapEnabled= true;
        //     renderer.shadowMapSoft = true;
        //
        //     /*add controls*/
        //     controls = new THREE.OrbitControls( camera, renderer.domElement );
        //     controls.addEventListener( 'change', render );
        //
        //
        //     grid = new THREE.GridHelper(50, 5);
        //     color = new THREE.Color("rgb(255,0,0)");
        //     grid.setColors(color, 0x000000);
        //
        //
        //
        //
        //     var x = 0;
        //     var y = 0;
        //     var z = 0;
        //
        //     for  (var i=0;i < 1000; i++){
        //         cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
        //         cubeMaterial = new THREE.MeshPhongMaterial({color:frequencyData[i]*0xff3300});
        //         cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //         cube.castShadow = true;
        //         cube.receiveShadow = true;
        //         cube.name = frequencyData.length;
        //         cube.position.x = x;
        //
        //         x += 10;
        //
        //         if ( x == 100){
        //             z += 10;
        //             x = 0;
        //         }
        //         else if (z == 100){
        //             x = 0;
        //             y += 10;
        //             z = 0;
        //         }
        //         cube.position.y = y;
        //         cube.position.z = z;
        //         scene.add(cube);
        //
        //     }
        //
        //
        //     camera.position.x = 50;
        //     camera.position.y = 50;
        //     camera.position.z = 50;
        //     camera.lookAt(scene.position);
        //
        //     /*datGUI controls object*/
        //     guiControls = new function(){
        //         this.rotationX  = 0.0;
        //         this.rotationY  = 0.0;
        //         this.rotationZ  = 0.0;
        //
        //         this.lightX = 127;
        //         this.lightY = 152;
        //         this.lightZ = 127;
        //         this.intensity = 3.8;
        //         this.distance = 1000;
        //         this.angle = 1.60;
        //         this.exponent = 2;
        //         this.shadowCameraNear = 2;
        //         this.shadowCameraFar = 434;
        //         this.shadowCameraFov = 46;
        //         this.shadowCameraVisible=false;
        //         this.shadowMapWidth=2056;
        //         this.shadowMapHeight=2056;
        //         this.shadowBias=0.00;
        //         this.shadowDarkness=0.5;
        //         this.target = cube;
        //
        //     }
        //     /*adds spot light with starting parameters*/
        //     spotLight = new THREE.SpotLight(0xffffff);
        //     spotLight.castShadow = true;
        //     spotLight.position.set (20, 35, 40);
        //     spotLight.intensity = guiControls.intensity;
        //     spotLight.distance = guiControls.distance;
        //     spotLight.angle = guiControls.angle;
        //     spotLight.exponent = guiControls.exponent;
        //     spotLight.shadowCameraNear = guiControls.shadowCameraNear;
        //     spotLight.shadowCameraFar = guiControls.shadowCameraFar;
        //     spotLight.shadowCameraFov = guiControls.shadowCameraFov;
        //     spotLight.shadowCameraVisible = guiControls.shadowCameraVisible;
        //     spotLight.shadowBias = guiControls.shadowBias;
        //     spotLight.shadowDarkness = guiControls.shadowDarkness;
        //     scene.add(spotLight);
        //
        //     /*adds controls to scene*/
        //     datGUI = new dat.GUI();
        //
        //     datGUI.add(guiControls, 'rotationX',0,1);
        //     datGUI.add(guiControls, 'rotationY',0,1);
        //     datGUI.add(guiControls, 'rotationZ',0,1);
        //
        //     datGUI.add(guiControls, 'lightX',-60,180);
        //     datGUI.add(guiControls, 'lightY',0,180);
        //     datGUI.add(guiControls, 'lightZ',-60,180);
        //
        //     datGUI.add(guiControls, 'target', ['cube', 'torusKnot','text']).onChange(function(){
        //         if (guiControls.target == 'cube'){
        //             spotLight.target =  cube;
        //         }
        //         else if (guiControls.target == 'torusKnot'){
        //             spotLight.target =  torusKnot;
        //         }
        //         else if (guiControls.target == 'text'){
        //             spotLight.target =  text;
        //         }
        //     });
        //     datGUI.add(guiControls, 'intensity',0.01, 5).onChange(function(value){
        //         spotLight.intensity = value;
        //     });
        //     datGUI.add(guiControls, 'distance',0, 1000).onChange(function(value){
        //         spotLight.distance = value;
        //     });
        //     datGUI.add(guiControls, 'angle',0.001, 1.570).onChange(function(value){
        //         spotLight.angle = value;
        //     });
        //     datGUI.add(guiControls, 'exponent',0 ,50 ).onChange(function(value){
        //         spotLight.exponent = value;
        //     });
        //     datGUI.add(guiControls, 'shadowCameraNear',0,100).name("Near").onChange(function(value){
        //         spotLight.shadowCamera.near = value;
        //         spotLight.shadowCamera.updateProjectionMatrix();
        //     });
        //     datGUI.add(guiControls, 'shadowCameraFar',0,5000).name("Far").onChange(function(value){
        //         spotLight.shadowCamera.far = value;
        //         spotLight.shadowCamera.updateProjectionMatrix();
        //     });
        //     datGUI.add(guiControls, 'shadowCameraFov',1,180).name("Fov").onChange(function(value){
        //         spotLight.shadowCamera.fov = value;
        //         spotLight.shadowCamera.updateProjectionMatrix();
        //     });
        //     datGUI.add(guiControls, 'shadowCameraVisible').onChange(function(value){
        //         spotLight.shadowCameraVisible = value;
        //         spotLight.shadowCamera.updateProjectionMatrix();
        //     });
        //     datGUI.add(guiControls, 'shadowBias',0,1).onChange(function(value){
        //         spotLight.shadowBias = value;
        //         spotLight.shadowCamera.updateProjectionMatrix();
        //     });
        //     datGUI.add(guiControls, 'shadowDarkness',0,1).onChange(function(value){
        //         spotLight.shadowDarkness = value;
        //         spotLight.shadowCamera.updateProjectionMatrix();
        //     });
        //     datGUI.close();
        //
        //     $("#webGL-container").append(renderer.domElement);
        //     /*stats*/
        //     stats = new Stats();
        //     stats.domElement.style.position = 'absolute';
        //     stats.domElement.style.left = '0px';
        //     stats.domElement.style.top = '0px';
        //     $("#webGL-container").append( stats.domElement );
        //     console.log(scene);
        //     fov = camera.fov, zoom = 1.0, inc = -0.01;
        // }
        //
        // function render() {
        //     scene.traverse(function (e){
        //         if (e instanceof THREE.Mesh){
        //             e.rotation.x += frequencyData[50]/1000;
        //             e.rotation.y = frequencyData[e.id]/50;
        //             e.rotation.z += guiControls.rotationZ;
        //             var color = new THREE.Color(1,0,0);
        //             e.material.color.setRGB(frequencyData[e.id]/255,0,0);
        //         }
        //     });
        //     guiControls.intensity = frequencyData[2];
        //     spotLight.position.x = guiControls.lightX;
        //     spotLight.position.y = guiControls.lightY;
        //     spotLight.position.z = guiControls.lightZ;
            // analyser.getByteFrequencyData(frequencyData);
        //     camera.fov = fov * zoom;
        //     camera.updateProjectionMatrix();
        //     zoom += inc;
        //     if ( zoom <= 0.1*(frequencyData[20]/100) || zoom >= 1*(frequencyData[20]/50) ){
        //         inc = -inc;
        //     }
        //     camera.rotation.y = 90 * Math.PI / 180;
        //     camera.rotation.z = frequencyData[20] * Math.PI / 180;
        //     camera.rotation.x = frequencyData[100] * Math.PI / 180;
        // }
        //
        // function animate(){
        //     requestAnimationFrame(animate);
        //     render();
        //
        //     stats.update();
        //     renderer.render(scene, camera);
        // }
        //
        // $(window).resize(function(){
        //
        //
        //     SCREEN_WIDTH = window.innerWidth;
        //     SCREEN_HEIGHT = window.innerHeight;
        //
        //     camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        //     camera.updateProjectionMatrix();
        //
        //     renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        //
        //
        //
        // });
        // init();
        // animate();
        audio.play();












    ////////////////////////////////////////////////////////////////////////////////////////
    var scene, light, light1, camera, renderer;
    var geometry, material, mesh;

    //RENDERER
    var renderer = new THREE.WebGLRenderer(
      {
        canvas: document.getElementById('myCanvas'),
        antialias: true,
        alpha: true
      }
    );

    renderer.setClearColor( 0x000000, 0 );
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
    // var cubeMaterial = new THREE.MeshPhongMaterial({color:frequencyData[i]*0xff3300});
    material = new THREE.MeshLambertMaterial({color: frequencyData[0]*0xff3300}); // for non-shiny surfaces
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -1000);

    scene.add(mesh);

    //RENDER LOOP
    requestAnimationFrame(render);

    // take in array of 1000+ elements, return sum of first 250:
    function getDatBass(arr) {
      var result = 0;
      var counter = 0;

      while (counter < 250) {
        result += arr[counter];
      }
      return result;
    }


    function render() {
        analyser.getByteFrequencyData(frequencyData);

        //make it less crazy
        // var add = (a, b) => a + b;
        // var sumOfAll = frequencyData.reduce(add, 0);
        var sumOfBass = getDatBass(frequencyData);

        // var adjustment = Math.round(frequencyData[0]/100);
        // var adjustment = Math.round(sumOfAll/10000);
        var adjustment = Math.round(sumOfBass/10000);

        // console.log(frequencyData)
        mesh.material.color.setHex( adjustment*0xff3300 );
        mesh.rotation.x += 0.01;  // this is our animation, we should be able to pull out audio spectrum data
        mesh.rotation.y += 0.01;  // to use in modifying speed, size, or colors
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

  }
}
