/*-----------------Invader------------------*/
//Escolhe a velocidade do invader
function randomSpeed(){
	'use strict';
	
	var index = Math.floor((Math.random()*2));
	return  possibleSpeed[index];
}

function addFaceInvader(obj, material, x, y, z){
	'use strict';

	geometry = new THREE.CubeGeometry(5, 4, 5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addArmInvader(obj, material, x, y, z){
	'use strict';

	geometry = new THREE.CubeGeometry(1.5, 4, 1.5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);

}

function createInvader(x, y, z){
	'use strict'

	invader = new THREE.Object3D();
	materialInvader = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true});

	addFaceInvader(invader,materialInvader, 0, 0, 0);
	addArmInvader(invader, materialInvader, 3.25, -2, 0.25); 
	addArmInvader(invader, materialInvader, -3.25, -2, 0.25);
	
	var invPosition = {
		x : x,
		y : y,
		z : z,
	};

	invader.position.x = x;
	invader.position.y = y;
	invader.position.z = z;

	var invaderAux = {
		inv : invader,
		moveXX : true ,
		moveYY : true ,
		speedXX : randomSpeed(),
		speedYY : randomSpeed(),
		position : {x:x, y:y, z:z}
	};
	
	invaderList.push(invaderAux);
}

function sceneAddInvader(){
	'use strict';
	var i;

	for (i=0; i < invaderList.length; i++){
			scene.add(invaderList[i].inv);
	}
}