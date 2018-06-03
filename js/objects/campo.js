/*------------Limites do campo--------------*/
function addBaseCampo(obj, material, x, y, z){
	'use strict';

	geometry = new THREE.CubeGeometry(40, 40, 1);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}

function createCampo(x, y, z, met){
	'use strict'
	
	scene.remove(campo);
	campo = new THREE.Object3D();

	//cor: 0x3d3d42 -> cizento
	if(gf_basic == true){
		materialCampo = new THREE.MeshBasicMaterial({ color: 0x3d3d42});
	}
	else{
		if(met == false){
			materialCampo = new THREE.MeshPhongMaterial({ color: 0x3d3d42, specular:  0x050505, shininess: 1});
		}
		else{
			materialCampo = new THREE.MeshLambertMaterial({ color: 0x3d3d42});
		}
	}


	//1 quadrante
	/*addBaseCampo(campo, materialCampo, 20, 20, 0);
	addBaseCampo(campo, materialCampo, 60, 20, 0);
	addBaseCampo(campo, materialCampo, 20, 60, 0);
	addBaseCampo(campo, materialCampo, 60, 60, 0);

	//2 quadrante
	addBaseCampo(campo, materialCampo, -20, 20, 0);
	addBaseCampo(campo, materialCampo, -60, 20, 0);
	addBaseCampo(campo, materialCampo, -20, 60, 0);
	addBaseCampo(campo, materialCampo, -60, 60, 0);

	//3 quadrante
	addBaseCampo(campo, materialCampo, -20, -20, 0);
	addBaseCampo(campo, materialCampo, -60, -20, 0);
	addBaseCampo(campo, materialCampo, -20, -60, 0);
	addBaseCampo(campo, materialCampo, -60, -60, 0);

	//4 quadrante
	addBaseCampo(campo, materialCampo, 20, -20, 0);
	addBaseCampo(campo, materialCampo, 60, -20, 0);
	addBaseCampo(campo, materialCampo, 20, -60, 0);
	addBaseCampo(campo, materialCampo, 60, -60, 0);*/

	scene.add(campo);

	campo.position.x = x;
	campo.position.y = y;
	campo.position.z = z;
}
