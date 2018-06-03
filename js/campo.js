/*------------Limites do campo--------------*/
function addBaseCampo(obj, material, x, y, z){
	'use strict';

	geometry = new THREE.CubeGeometry(160, 160, 1);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);

}

function createCampo(x, y, z){
	'use strict'

	campo = new THREE.Object3D();
	materialCampo = new THREE.MeshBasicMaterial({ color: 0x3d3d42, wireframe: false});

	addBaseCampo(campo, materialCampo, 0, 0, 0);

	scene.add(campo);

	campo.position.x = x;
	campo.position.y = y;
	campo.position.z = z;
}

//coloca 4 invaderes numa derteminada altura 'y'
function colocaInvader(y){
	'use strict';

	createInvader(-50, y, 0);
	createInvader(-25, y, 0);
	createInvader(25, y, 0);
	createInvader(50, y, 0);
}
