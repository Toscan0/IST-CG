/*---------------Nave------------------------*/
function addBaseNave(obj, material, x, y ,z){
	'use strict'

	geometry = new THREE.CubeGeometry(10, 3, 5);
	mesh = new THREE.Mesh(geometry, material);
	obj.add(mesh);
}

function addMediumNave(obj, material, x, y, z){
	'use strict'

	geometry = new THREE.CubeGeometry(6, 3, 5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function addTopNave(obj, material, x, y, z){
	'use strict'

	geometry = new THREE.CylinderGeometry(1, 3, 5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function createNave(x, y, z){
	'use strict'

	nave = new THREE.Object3D();
	materialNave = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true});
	nave.userData = {moverEsquerda: false, moverDireita: false};

	addBaseNave(nave, materialNave, 0, 0, 0);
	addMediumNave(nave, materialNave, 0, 3, 0);
	addTopNave(nave, materialNave, 0, 7, 0);

	scene.add(nave);
	
	nave.position.x = x;
	nave.position.y = y;
	nave.position.z = z;	
}