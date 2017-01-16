
import { Component } from '@angular/core';
import { state } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../audio-element';
import { AudioControlsActions } from '../../actions/audio-controls.actions';

import * as THREE from 'three';
import * as ThreeOrbitControls from 'three-orbit-controls';

@Component({
  selector: 'three-d-frequencyBars',
  templateUrl: './three-d-frequencyBars.component.html'
})
export class ThreeDFrequencyBarsComponent {

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
        ambientLight,
        pointLight,
        lightCrazyTime,
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

    camera.position.set( 0, 100, 1500 );
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

    /////////////////////////// LIGHTS //////////////////////////////
    /////////////////////////////////////////////////////////////////
    // -Ambiant light globally illuminates all objects in the scene equally.
    //      AmbientLight( color, intensity )
    // -Point light gets emitted from a single point in all directions.
    //      PointLight( color, intensity, distance, decay )
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    pointLight = new THREE.PointLight(0xffffff, 0.5, -50, 10);  // distance default === 0, decay default === 1

    scene.add(ambientLight);
    scene.add(pointLight);

    /////////////////////////// Objects /////////////////////////////
    /////////////////////////////////////////////////////////////////
    // BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
    geometry = new THREE.BoxGeometry(50, 50, 50); // segmented faces optional. Default is 1.
    // geometry.castShadow = true;
    // geometry.receiveShadow = true;
    // shinyMaterial = new THREE.MeshPhongMaterial({color:0x1A1A1A});

    // for non-shiny surfaces use MeshLambertMaterial
    material1 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material2 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material3 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material4 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material5 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material6 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material7 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material8 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material9 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});
    material10 = new THREE.MeshLambertMaterial({color: 0x1A1A1A});

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

    var zPosition = 0

    mesh1.position.set(-450, 0, zPosition);
    mesh2.position.set(-350, 0, zPosition);
    mesh3.position.set(-250, 0, zPosition);
    mesh4.position.set(-150, 0, zPosition);
    mesh5.position.set(-50, 0, zPosition);
    mesh6.position.set(50, 0, zPosition);
    mesh7.position.set(150, 0, zPosition);
    mesh8.position.set(250, 0, zPosition);
    mesh9.position.set(350, 0, zPosition);
    mesh10.position.set(450, 0, zPosition);

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

      var totalSum = getDatBass + getDatMid1 + getDatMid2 + getDatMid3 + getDatMid4 + getDatMid5 + getDatMid6 + getDatMid7 + getDatMid8 + getDatTreble;

      //////////////////////// Animate Color //////////////////////
      var colorOffset = 50;

      var colorAdjBass = Math.round(getDatBass/150) + colorOffset;
      var colorAdjMid1 = Math.round(getDatMid1/150) + colorOffset;
      var colorAdjMid2 = Math.round(getDatMid2/150) + colorOffset;
      var colorAdjMid3 = Math.round(getDatMid2/150) + colorOffset;
      var colorAdjMid4 = Math.round(getDatMid4/150) + colorOffset;
      var colorAdjMid5 = Math.round(getDatMid5/150) + colorOffset;
      var colorAdjMid6 = Math.round(getDatMid6/150) + colorOffset;
      var colorAdjMid7 = Math.round(getDatMid7/150) + colorOffset;
      var colorAdjMid8 = Math.round(getDatMid8/150) + colorOffset;
      var colorAdjTreble = Math.round(getDatTreble/150) + colorOffset;

      // mesh.material.color.setHex( adjment*0xff3300 );
      // mesh.material.color.set( color );
      // mesh.material.color.set( colorAdjment, colorAdjment, colorAdjment );
      var colorString1 = 'rgb('+colorAdjBass+','+colorAdjBass+','+colorAdjBass+')';
      var colorString2 = 'rgb('+colorAdjMid1+','+colorAdjMid1+','+colorAdjMid1+')';
      var colorString3 = 'rgb('+colorAdjMid2+','+colorAdjMid2+','+colorAdjMid2+')';
      var colorString4 = 'rgb('+colorAdjMid3+','+colorAdjMid3+','+colorAdjMid3+')';
      var colorString5 = 'rgb('+colorAdjMid4+','+colorAdjMid4+','+colorAdjMid4+')';
      var colorString6 = 'rgb('+colorAdjMid5+','+colorAdjMid5+','+colorAdjMid5+')';
      var colorString7 = 'rgb('+colorAdjMid6+','+colorAdjMid6+','+colorAdjMid6+')';
      var colorString8 = 'rgb('+colorAdjMid7+','+colorAdjMid7+','+colorAdjMid7+')';
      var colorString9 = 'rgb('+colorAdjMid8+','+colorAdjMid8+','+colorAdjMid8+')';
      var colorString10 = 'rgb('+colorAdjTreble+','+colorAdjTreble+','+colorAdjTreble+')';

      mesh1.material.color.set(colorString1);
      mesh2.material.color.set(colorString2);
      mesh3.material.color.set(colorString3);
      mesh4.material.color.set(colorString4);
      mesh5.material.color.set(colorString5);
      mesh6.material.color.set(colorString6);
      mesh7.material.color.set(colorString7);
      mesh8.material.color.set(colorString8);
      mesh9.material.color.set(colorString9);
      mesh10.material.color.set(colorString10);

      /////////////////////// Animate Position //////////////////////

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

      var zPosition = 0;
      ////////////// position stated as (x, y, z)
      mesh1.position.set(-450, getDatBass/120 - 100, zPosition);
      mesh2.position.set(-350, getDatMid1/120 - 100, zPosition);
      mesh3.position.set(-250, getDatMid2/120 - 100, zPosition);
      mesh4.position.set(-150, getDatMid3/120 - 100, zPosition);
      mesh5.position.set(-50, getDatMid4/120 - 100, zPosition);
      mesh6.position.set(50, getDatMid5/120 - 100, zPosition);
      mesh7.position.set(150, getDatMid6/120 - 100, zPosition);
      mesh8.position.set(250, getDatMid7/120 - 100, zPosition);
      mesh9.position.set(350, getDatMid8/120 - 100, zPosition);
      mesh10.position.set(450, getDatTreble/120 - 100, zPosition);

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
      // mesh1.rotation.x += 0.01;  // rotate about x to spin vertically

      /////////////////////// Animate Light //////////////////////
      ambientLight.intensity = totalSum / 400000;  // strobe effect?
      // pointLight.intensity = totalSum / 100000;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }

}
