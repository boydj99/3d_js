import * as THREE from 'three'

function center(size, numBoxes, index){
  return (size*(2*index - numBoxes + 1))/2;
}

function drawCubes(size,numBoxes,scene){
  var cube, edges, outline, mesh;
  const material = new THREE.MeshStandardMaterial({
    color: "#ffffff",
  });
  //loop to create boxes
  for(let k = 0; k<numBoxes; k++){
    var z = center(size,numBoxes,k);

    for(let j = 0; j<numBoxes; j++){
      //set y coords for each row
      var y = center(size,numBoxes,j);

      for(let i = 0; i<numBoxes; i++){
        //create hollow cube
        //if on the end faces draw all, start and end of rows draw, top and bottom rows draw 
        if(k == 0 || k == numBoxes-1 || j == 0 || j == numBoxes-1 || i == 0 || i == numBoxes-1){
          cube = new THREE.BoxGeometry(size,size,size);
          //translate coords to center the boxes
          var x = center(size,numBoxes,i);
          cube.translate(x,y,z);
          edges = new THREE.EdgesGeometry(cube);
          outline = new THREE.LineSegments(edges,new THREE.LineBasicMaterial( { color: 0x000000, linejoin: 'round' }));

          mesh = new THREE.Mesh(cube, material);
          
          scene.add(mesh);
          scene.add(outline);
        }
      }
    }
  }
}

export {drawCubes};