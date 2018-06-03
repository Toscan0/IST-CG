/*------------Limites do campo--------------*/
function addBaseCampo(obj, material, x, y, z){
	'use strict';

	geometry = new THREE.PlaneGeometry(160, 160);

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createCampo(x, y, z){
	'use strict'

	campo = new THREE.Object3D();

	loaderCampo = new THREE.TextureLoader();
	//textureCampo = loaderCampo.load("...");

	//posicao 0 -> fundo em jpeg
	textureCampo.push(loaderCampo.load("js/Objects/Img/fundo2.jpeg"));
	//posicao 1 -> fundo em png
	textureCampo.push(loaderCampo.load("js/Objects/Img/fundo1.png"));
	//posicao 2 -> fundo em jpg
	textureCampo.push(loaderCampo.load("js/Objects/Img/fundo3.jpg"));

	materialCampo = new THREE.MeshBasicMaterial();
	//Imagem inicial de fundo
	
	materialCampo.map = textureCampo[2];

	addBaseCampo(campo, materialCampo, 0, 0, 0);

	scene.add(campo);

	campo.position.x = x;
	campo.position.y = y;
	campo.position.z = z;
}
