import * as THREE from 'three'
import { pi } from 'mathjs';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import HelvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';

//center coord based on box size, numboxes, and which box position in the cube
function center(size, numBoxes, pos){
  return (size*(2*pos - numBoxes + 1))/2;
}

function testLetters(letter,numBoxes){
  var arr = [];   
  for(let i = 0; i<numBoxes; i++){
    arr[i] = [];
    for(let j = 0; j<numBoxes; j++){
      arr[i][j] = String(j);
    }
  }
  return arr;
}

function drawLetters(boxSize,numBoxes,scene){
  const buffer = 0.5;

  var front = testLetters("F",numBoxes);
  var back = testLetters("B",numBoxes);
  var top = testLetters("T",numBoxes);
  var bottom = testLetters("B",numBoxes);
  var left = testLetters("L",numBoxes);
  var right = testLetters("R",numBoxes);
  //TODO: input actual word search

  //var for text
  var text, textMesh, x, y, z;
  const textSize = boxSize/2
  const loader = new FontLoader();
  const font = loader.parse(HelvetikerFont);
  const textMat = new THREE.MeshStandardMaterial({
    color: "#000000",
  });

  //back
  z = center(boxSize,numBoxes,0); //0 pos for back face
  for(let i = 0; i<numBoxes; i++){
    y = center(boxSize,numBoxes,i);
    for(let j = 0; j<numBoxes; j++){
      x = center(boxSize,numBoxes,j);
      //text 
      text = new TextGeometry(back[i][j], {
        font: font,
        size: textSize,
        height: 0
      });

      textMesh = new THREE.Mesh(text, textMat);
      textMesh.position.z = z - boxSize/2 - buffer; 
      textMesh.position.x = x+textSize/2; 
      textMesh.position.y = y-textSize/2; 
      textMesh.rotation.y = pi;
      scene.add(textMesh)
    }
  }
  //front
  z = center(boxSize,numBoxes,numBoxes-1); //numBoxes-1 pos for front face
  for(let i = 0; i<numBoxes; i++){
    y = center(boxSize,numBoxes,i);
    for(let j = 0; j<numBoxes; j++){
      x = center(boxSize,numBoxes,j);
      //text 
      text = new TextGeometry(front[i][j], {
        font: font,
        size: textSize,
        height: 0
      });

      textMesh = new THREE.Mesh(text, textMat);
      textMesh.position.z = z + boxSize/2 + buffer; 
      textMesh.position.x = x-textSize/2; 
      textMesh.position.y = y-textSize/2; 
      scene.add(textMesh)
    }
  }

  //bottom
  y = center(boxSize,numBoxes,0); //0 for bottom face
  for(let i = 0; i<numBoxes; i++){
    z = center(boxSize,numBoxes,i);
    for(let j = 0; j<numBoxes; j++){
      x = center(boxSize,numBoxes,j);
      //text 
      text = new TextGeometry(bottom[i][j], {
        font: font,
        size: textSize,
        height: 0
      });

      textMesh = new THREE.Mesh(text, textMat);
      textMesh.position.z = z-textSize/2; 
      textMesh.position.x = x-textSize/2; 
      textMesh.position.y = y-boxSize/2-1; 
      textMesh.rotation.x = pi/2
      scene.add(textMesh)
    }
  }

  //top
  y = center(boxSize,numBoxes,numBoxes-1); //numBoxes-1 pos for top face
  for(let i = 0; i<numBoxes; i++){
    z = center(boxSize,numBoxes,i);
    for(let j = 0; j<numBoxes; j++){
      x = center(boxSize,numBoxes,j);
      //text 
      text = new TextGeometry(top[i][j], {
        font: font,
        size: textSize,
        height: 0
      });

      textMesh = new THREE.Mesh(text, textMat);
      textMesh.position.z = z+textSize/2; 
      textMesh.position.x = x-textSize/2; 
      textMesh.position.y = y+boxSize/2+1; 
      textMesh.rotation.x = -pi/2
      scene.add(textMesh)
    }
  }

  //left
  x = center(boxSize,numBoxes,0); //0 pos for left face
  for(let i = 0; i<numBoxes; i++){
    y = center(boxSize,numBoxes,i);
    for(let j = 0; j<numBoxes; j++){
      z = center(boxSize,numBoxes,j);
      //text 
      text = new TextGeometry(left[i][j], {
        font: font,
        size: textSize,
        height: 0
      });

      textMesh = new THREE.Mesh(text, textMat);
      textMesh.position.z = z-textSize/2;
      textMesh.position.x = x-boxSize/2-1; 
      textMesh.position.y = y-textSize/2; 
      textMesh.rotation.y = -pi/2
      scene.add(textMesh)
    }
  }

  //right
  x = center(boxSize,numBoxes,numBoxes-1); //numBoxes-1 pos for right face
  for(let i = 0; i<numBoxes; i++){
    y = center(boxSize,numBoxes,i);
    for(let j = 0; j<numBoxes; j++){
      z = center(boxSize,numBoxes,j);
      //text 
      text = new TextGeometry(right[i][j], {
        font: font,
        size: textSize,
        height: 0
      });

      textMesh = new THREE.Mesh(text, textMat);
      textMesh.position.z = z+textSize/2;
      textMesh.position.x = x+boxSize/2+1; 
      textMesh.position.y = y-textSize/2; 
      textMesh.rotation.y = pi/2
      scene.add(textMesh)
    }
  }
}

function drawCubes(boxSize,numBoxes,scene){
  //var for cubes
  var cube, edges, outline, cubeMesh;
  const cudeMat = new THREE.MeshStandardMaterial({
    color: "#ffffff",
  });

  //loop to create boxes
  for(let k = 0; k<numBoxes; k++){
    var z = center(boxSize,numBoxes,k);

    for(let j = 0; j<numBoxes; j++){
      //set y coords for each row
      var y = center(boxSize,numBoxes,j);

      for(let i = 0; i<numBoxes; i++){
        //create hollow cube
        //if on the end faces draw all, start and end of rows draw, top and bottom rows draw 
        if(k == 0 || k == numBoxes-1 || j == 0 || j == numBoxes-1 || i == 0 || i == numBoxes-1){
          cube = new THREE.BoxGeometry(boxSize,boxSize,boxSize);
          //translate coords to center the boxes
          var x = center(boxSize,numBoxes,i);
          cube.translate(x,y,z);
          //outline each box
          edges = new THREE.EdgesGeometry(cube);
          outline = new THREE.LineSegments(edges,new THREE.LineBasicMaterial( { color: 0x000000, linejoin: 'round' }));
          cubeMesh = new THREE.Mesh(cube, cudeMat);

          scene.add(cubeMesh);
          scene.add(outline);
        }
      }
    }
  }
}

function drawWordSearch(boxSize,numBoxes,scene){
  drawCubes(boxSize,numBoxes,scene);
  drawLetters(boxSize,numBoxes,scene);
}

export {drawWordSearch};