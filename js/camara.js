/*-----------------Camera---------------*/
//camera ortoganal, vista de cima o campo de jogo 2D
function createCameraOrtogonal(){
	'use strict';

	var rel_asp = window.innerWidth / window.innerHeight;
	if (rel_asp > 1)
		camera = new THREE.OrthographicCamera( -limite*rel_asp, limite*rel_asp, limite, -limite, -500, 500 );
	else
		camera = new THREE.OrthographicCamera( -limite, limite, limite/rel_asp, -limite/rel_asp, -500, 500 );
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 5;
	camera.lookAt(scene.position);
}

//Camera em perpestiva-> camera estatica
function createCameraPrespective1(){
	'use strict';
	

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = -105;
	camera.position.z = 60;
	camera.lookAt(scene.position);
}

//Camera em perpestiva-> camera mexe com a nave
function createCameraPrespective2(posX, posY, posZ){
	'use strict';

	camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = posX;
	camera.position.y = posY;
	camera.position.z = posZ;
	camera.up = new THREE.Vector3(0,0,1);
	camera.lookAt(nave.position);
}

function alternaCamera(){
	'use strict';

	//carregou na tecla 1 -> camera ortogonal ativada
	if((gf_cameraOrtogonal == true) && (gf_cameraPrespective1 == false) && (gf_cameraPrespective2 == false)){
		createCameraOrtogonal();
	}
	//carregou na tecla 2 -> camera em prespetiva1 ativada
	else if((gf_cameraOrtogonal == false) && (gf_cameraPrespective1 == true) && (gf_cameraPrespective2 == false)){
		createCameraPrespective1();
	}
	//carregou na tecla 3 -> camera em prespetiva2 ativada
	else if((gf_cameraOrtogonal == false) && (gf_cameraPrespective1 == false) && (gf_cameraPrespective2 == true)){
		createCameraPrespective2(nave.position.x, -100, 30);
	}
}