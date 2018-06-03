/*-----Var Globais---*/
var camera, scene, renderer;
var geometry, mesh;
var clock;
var limite = 80, raio = 5.66;
var t; //t = clock.getDelta();
var gf_gouraud = false, gf_basic = true;
/*----Var_Invader---*/
var invader, materialInvader, invaderList = [], invaderListTemp = [], possibleSpeed = [-15, 15];

/*--Var_Nave--*/
var nave, materialNave, naveList =  [];;
var aceleracao = 50, velocidade = 0, Vmax = 30, Vmin = -30;

/*--Var_tiro--*/
var tiro, materialTiro, gf_tiros = false, gf_reoladed = true, tiroList = [], tiroListTemp = []; 
var velTiro = 50;

/*--Var_camara--*/
var gf_cameraOrtogonal = true, gf_cameraPrespective1 = false, gf_cameraPrespective2 = false;

/*--Var_Campo--*/
var campo, materialCampo;

/*--Luzes--*/
/*--Directional Light--*/
var dirLight, gf_dirlight = true, dirLightCreate = 0, dirLightList = [];
/*--Point Light--*/
var redPoint, gf_pointLight = false, pointLightCreate = 0, pointLightList = [];

/*--Resultado--*/
var gf_pause = false;

/*--Controlos--*/
var controls;

/*-----------Chamadas no index--------------------------*/
function init() {
	'use strict';
	
	clock = new THREE.Clock();
	clock.start();

	//cria uma cena
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

	// Add the orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -1.5);	
}

function animate(){
	'use strict';

	render();
	requestAnimationFrame(animate);
	//se estiver a falso e porque o somrebamento Phong ou gouraud esta ligado
	if(gf_basic == false){
		//cria luzes ambiente
		addDirecionalLight();
		//cria pontos de luz
		addPointLight();
	}
	alternaCamera();
	moveObjects();

	controls.update();
}


function createScene() {
	'use strict';

	//Cria uma cena
	scene = new THREE.Scene();
	
	//Cria um eixo auxiliar de tamanho 80
	//descomente as duas linhas seguintes se desejas que este aparace no ecra
	//scene.add(new THREE.AxisHelper(limite)); //eixos postivios
	//scene.add(new THREE.AxisHelper(-limite)); //eixos negativos

	createCampo(0, 0, -3.5, false);

	//cria uma linha com quatro invaderes, a uma determinada altura
	colocaInvader(0);
	colocaInvader(40);
	//sceneAddInvader();
	//cria a nave
	createNave(0, -70, 0, false);
}

function render() {
	'use strict';

	renderer.render(scene, camera);
}


function printSombr(){
	'use strict';

	console.log("-----------------Begin Print-----------------");
	console.log(">>>gf_pointLight:", gf_pointLight);
	console.log(">>>gf_dirlight:", gf_dirlight);
	console.log(">>>gf_basic:", gf_basic);
	console.log(">>>gf_gouraud:", gf_gouraud);
	console.log("matCampo:", materialCampo);
	if(invaderList.length > 0){
		//so imprime o ultimo invader
		console.log("matInv:", materialInvader);
	}
	if(naveList.length > 0){
		console.log("matNave:", materialNave);
	}
	if(tiroList.length > 0){
		//so imprime o ultimo tiro
		console.log("matTiro:", materialTiro);
	}
	console.log("------------------End Print------------------");
}