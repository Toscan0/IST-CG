/*------------------Tiro-----------------*/
function addTiro(obj, material, x, y, z){
	'use strict'

	geometry = new THREE.SphereGeometry(1, 10, 10);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}


function createTiro(x, y , z){
	'use strict';

	tiro =  new THREE.Object3D();
	materialTiro = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true}); //0x0000ff -> azul
	//tiro.userData

	addTiro(tiro, materialTiro, 0, 0, 0);

	scene.add(tiro);

	tiro.position.x = x;
	tiro.position.y = y;
	tiro.position.z = z;

	tiroList.push(tiro);
}

function disparaTiro(){
	'use strict';

	//Cada vez que carrega no 'B' a nave so dispara um tiro
	if(gf_reoladed == true){
		createTiro(nave.position.x, nave.position.y + 9 ,0);
	}
	gf_reoladed = false;
}