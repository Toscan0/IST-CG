/*------------------Tiro-----------------*/
function addTiro(obj, material, x, y, z){
	'use strict'

	geometry = new THREE.SphereGeometry(.75, 5, 5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}


function createTiro(x, y , z, met){
	'use strict';

	tiro =  new THREE.Object3D();

	//Cor: 0x0000ff -> azul
	if(gf_basic == true){
		materialTiro = new THREE.MeshBasicMaterial({ color: 0x0000ff});
	}
	else{
		if(met == false){
			materialTiro = new THREE.MeshPhongMaterial({ color: 0x0000ff, specular:  0x222222, shininess: 5 });
		}
		else{
			materialTiro = new THREE.MeshLambertMaterial({ color: 0x0000ff});
		}
	}

	//tiro.userData

	addTiro(tiro, materialTiro, 0, 0, 0);

	scene.add(tiro);

	tiro.position.x = x;
	tiro.position.y = y;
	tiro.position.z = z;

	tiroList.push(tiro);
}

function disparaTiro(met){
	'use strict';

	//Cada vez que carrega no 'B' a nave so dispara um tiro
	if(gf_reoladed == true){
		createTiro(nave.position.x, nave.position.y + 9 ,0, met);
	}
	gf_reoladed = false;
}