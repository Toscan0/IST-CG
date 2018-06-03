var camera, scene, renderer;
var geometry, materialInvader, materialNave, mesh ,invader, nave;
var aceleracao = 50, velocidade = 0, Vmax = 60, Vmin = -60, clock;

/*-----------------Invader------------------*/
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
	//3.25 = 2.5(metade do tamanho do corpo) + 0.75(metade da largura do braço)
	addArmInvader(invader, materialInvader, 3.25, -2, 2); 
	addArmInvader(invader, materialInvader, -3.25, -2, 2);

	scene.add(invader);

	invader.position.x = x;
	invader.position.y = y;
	invader.position.z = z;
}


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


/*---------------------Jogo---------------*/
//camera ortoganal, vista de cima o campo de jogo 2D
function createCameraOrtogonal(){
	'use strict';

	var rel_asp = window.innerWidth / window.innerHeight;
	if (rel_asp > 1)
		camera = new THREE.OrthographicCamera( -80*rel_asp, 80*rel_asp, 80, -80, - 500, 500 );
	else
		camera = new THREE.OrthographicCamera( -80, 80, 80/rel_asp, -80/rel_asp, - 500, 500 );
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 5;
	camera.lookAt(scene.position);
}

//Camera e, perpestiva
function createCameraPrespective(){
	'use strict';
	

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function colocaInvader(y){
	'use strict';

	createInvader(-50, y, 0);
	createInvader(-25, y, 0);
	createInvader(25, y, 0);
	createInvader(50, y, 0);
}


function createScene() {
	'use strict';

	scene = new THREE.Scene();
	
	//Cria um eixo auxiliar de tamanho 85
	scene.add(new THREE.AxisHelper(80)); //eixos postivios
	scene.add(new THREE.AxisHelper(-80)); //eixos negativos

	//cria uma linha com quatro invaderes, a uma determinada altura
	colocaInvader(0);
	colocaInvader(15);

	//cria a nave
	createNave(0, -25, 0);
}

function render() {
	'use strict';
	renderer.render(scene, camera);
}

function onResize() {
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	var rel_asp = window.innerWidth / window.innerHeight;
	
	if (rel_asp > 1){
		camera.left = -80*rel_asp;
		camera.right = 80*rel_asp;
		camera.top = 80;
		camera.bottom = -80;
	}
	else{
		camera.left = -80;
		camera.right = 80;
		camera.top = 80/rel_asp;
		camera.bottom = -80/rel_asp;
	}
	camera.updateProjectionMatrix();

}

//verifica se alguma tecla foi premida
function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
	//se a tecla 'a' ou 'A' for premida alterna entre os modelos de arame e solidos
	case 65: //A
	case 97: //a
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
			}
		});
		break;
	case 37: // seta esquerda (<-)
		nave.userData.moverEsquerda = true;
		nave.userData.moverDireita = false;		
		break;
	case 39: // seta direita (->)
		nave.userData.moverDireita = true;
		nave.userData.moverEsquerda = false;
		break;
	}
}

//verifica se alguma tecla que estava a ser permida deixou de o ser
function onKeyUp(e){
	'use strict';

	switch (e.keyCode){
	case 37: // seta esquerda (<-)
	case 39: // seta direita (->)
		nave.userData.moverEsquerda = false;
		nave.userData.moverDireita = false;
		break;
	}
	
}

function moveShip(){
	'use strict';

	var t = clock.getDelta();
	
	//andar para a esquerda
	if(nave.userData.moverEsquerda == true){
		if(velocidade <= Vmin){
			velocidade = Vmin
		}
		else{
			velocidade += -aceleracao*t;
		}
	}

	//andar para a direita
	if(nave.userData.moverDireita == true){
		if(velocidade>= Vmax){
			velocidade = Vmax
		}
		else{	
			velocidade += aceleracao*t;
		}
	}
	//atualiza a posicao da nave no eixo do x
	nave.position.x += velocidade*t;
	console.log("Speed: ", velocidade);
	console.log("position:", nave.position.x);
}

function animate(){
	'use strict';
	
	moveShip();
		
	render();
	requestAnimationFrame(animate);
}

function init() {
	'use strict';
	
	clock = new THREE.Clock();
	clock.start();
	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCameraOrtogonal();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}
