var msg, materialMsg, loaderMsg, textureMsg = [];

function addBaseMsg(obj, material, x, y, z){
	'use strict';

	geometry = new THREE.PlaneGeometry(40, 40);

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createMsg(x, y, z){
	'use strict'

	msg = new THREE.Object3D();

	loaderMsg = new THREE.TextureLoader();

	//posicao 0 -> O jogador perdeu
	textureMsg.push(loaderMsg.load("js/Objects/Img/perdeu.png"));
	//posicao 1 -> O jogador ganhou
	textureMsg.push(loaderMsg.load("js/Objects/Img/ganhou.png"));
	//posicao 2 -> O jogador carregou na pausa
	textureMsg.push(loaderMsg.load("js/Objects/Img/pausa.png"));

	materialMsg = new THREE.MeshBasicMaterial();
	//Imagem inicial de fundo
	//materialMsg.map = textureMsg[0];

	addBaseMsg(msg, materialMsg, 0, 0, 0);

	scene.add(msg);

	msg.position.x = x;
	msg.position.y = y;
	msg.position.z = z;
}