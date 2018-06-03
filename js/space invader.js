/*-----Var Globais---*/
var camera, scene, renderer;
var geometry, mesh;
var clock;
var limite = 80, raio = 5.66;
var t; //t = clock.getDelta();

/*----Var_Invader---*/
var invader, materialInvader, invaderList = [], possibleSpeed = [-15, 15];

/*--Var_Nave--*/
var nave, materialNave;
var aceleracao = 30, velocidade = 0, Vmax = 30, Vmin = -30;

/*--Var_tiro--*/
var tiro, materialTiro, gf_tiros = false, gf_reoladed = true, tiroList = []; 
var velTiro = 50;
/*--Var_camara--*/
var gf_cameraOrtogonal = true, gf_cameraPrespective1 = false, gf_cameraPrespective2 = false;

/*--Var_Campo--*/
var campo, materialCampo;




/*-----------Chamadas no index--------------------------*/
function init() {
	'use strict';
	
	clock = new THREE.Clock();
	clock.start();

	//cria a scene
	createScene();

	//Cria o WebGL Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//Junta o renderer ao body do HTML
	document.body.appendChild(renderer.domElement);

	createCameraOrtogonal();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

function animate(){
	'use strict';

	alternaCamera();
	moveObjects();
		
	render();
	requestAnimationFrame(animate);
}


function createScene() {
	'use strict';

	//Cria uma cena
	scene = new THREE.Scene();
	
	//Cria um eixo auxiliar de tamanho 80
	//descomente as duas linhas seguintes se desejas que este aparace no ecra
	//scene.add(new THREE.AxisHelper(limite)); //eixos postivios
	//scene.add(new THREE.AxisHelper(-limite)); //eixos negativos

	createCampo(0, 0, -3.5);

	//cria uma linha com quatro invaderes, a uma determinada altura
	colocaInvader(0);
	colocaInvader(40);

	sceneAddInvader();
	
	//cria a nave
	createNave(0, -70, 0);
}

function render() {
	'use strict';

	renderer.render(scene, camera);
}