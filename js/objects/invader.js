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

function createInvader(x, y, z, met, vX, vY){
	'use strict'

	invader = new THREE.Object3D();
	
	//cor: 0xffffff -> branco
	if(gf_basic == true){
		materialInvader = new THREE.MeshBasicMaterial({ color: 0xffffff});
	}
	else{ //gf_basic == false
		if(met == false){
			materialInvader = new THREE.MeshPhongMaterial({ color: 0xffffff, specular:  0x222222, shininess: 50});
		}
		else{
			materialInvader = new THREE.MeshLambertMaterial({ color: 0xffffff});
		}
	}

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
	
	scene.add(invader);
	if (vX == 0){
		var invaderAux = {
		inv : invader,
		moveXX : true ,
		moveYY : true ,
		speedXX : randomSpeed(),
		speedYY : randomSpeed(),
		position : {x:x, y:y, z:z}
		};
	}else{
		var invaderAux = {
		inv : invader,
		moveXX : true ,
		moveYY : true ,
		speedXX : vX,
		speedYY : vY,
		position : {x:x, y:y, z:z}
		};
	}
	

	invaderList.push(invaderAux);
}


function sceneAddInvader(){
	'use strict';
	var i;

	for (i=0; i < invaderList.length; i++){
			scene.add(invaderList[i].inv);
	}
}

//coloca 4 invaderes numa derteminada altura 'y'
function colocaInvader( y, met){
	'use strict';
	createInvader(-50, y, 0, met, 0, 0);
	createInvader(-25, y, 0, met, 0, 0);
	createInvader(25, y, 0, met, 0, 0);
	createInvader(50, y, 0, met, 0, 0);
}
