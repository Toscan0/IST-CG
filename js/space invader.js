/*  Projeto de CG, G27 => Space Invader
 *	
 *	start chrome --allow-file-access-from-files
 *
 *	if Python 2:
 *		python -m SimpleHTTPServer
 *  if Python 3:
 *  	python -m http.server
 *	
 *	http://localhost:8000/....directoria..../index.html
*/

/*-----Var Globais---*/
var camera, scene, renderer;
var camera2;
var geometry, mesh;
var clock;
var limite = 80, raio = 5.66;
var t = 0; //t = clock.getDelta();

/*----Var_Invader---*/
var invader, materialInvader, invaderList = [], invaderListTemp = [], possibleSpeed = [-15, 15];

/*--Var_Nave--*/
var nave, naveVida, materialNave, materialNave2, naveList =  [];
var aceleracao = 50, velocidade = 0, Vmax = 30, Vmin = -30;
var vidasNave = 3, vidasList = [];

/*--Var_tiro--*/
var tiro, materialTiro, gf_tiros = false, gf_reoladed = true, tiroList = [], tiroListTemp = []; 
var velTiro = 50;

/*--Var_camara--*/
var gf_cameraOrtogonal = true, gf_cameraPrespective1 = false, gf_cameraPrespective2 = false;

/*--Var_Campo--*/
var campo, materialCampo, loaderCampo, textureCampo = [];

/*--Luzes--*/
var gf_gouraud = false, gf_basic = true;
/*--Directional Light--*/
var dirLight, gf_dirlight = true, dirLightList = [];
/*--Point Light--*/
var whitePoint, gf_pointLight = false, pointLightList = [];
/*--Spot Light*/
var spotLight, gf_spotLight = false;

/*--Resultado--*/
var gf_pause = false, gf_terminou = false;

/*-----------Chamadas no index--------------------------*/
function init() {
	'use strict';
	
	clock = new THREE.Clock();
	clock.start();

	//Cria o WebGL Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.autoClear = false;

	//Junta o renderer ao body do HTML
	document.body.appendChild(renderer.domElement);

	//cria uma cena
	createScene();
	
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

function createScene(){
	'use strict';

	//Cria uma cena
	scene = new THREE.Scene();
	//scene2 = new THREE.Scene();
	
	//Cria um eixo auxiliar de tamanho 80
	//descomente as duas linhas seguintes se desejas que este aparace no ecra
	//scene.add(new THREE.AxisHelper(limite)); //eixos postivios
	//scene.add(new THREE.AxisHelper(-limite)); //eixos negativos

	addObjects();
}

function render() {
	'use strict';

	//renderer.clear();

	//renderer.setViewport(window.innerWidth * 0,window.innerHeight * 0, window.innerWidth* 0.5, window.innerHeight*1);
	//ecra de jogo normal
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
	renderer.setScissorTest(true);
	renderer.render(scene, camera);

	//vidas nave
	renderer.setViewport(window.innerWidth * 0.01,window.innerHeight * 0, window.innerWidth*0.14, window.innerHeight*1);
	renderer.setScissor(window.innerWidth * 0.01,window.innerHeight * 0, window.innerWidth*0.14, window.innerHeight*1);
	renderer.setScissorTest(true);
	renderer.render(scene, camera2);

	//pausa
	if((gf_terminou == true) || (gf_pause == true)){
		renderer.setViewport(window.innerWidth*0.15, window.innerHeight*0, window.innerWidth*0.85, window.innerHeight*1);
		renderer.setScissor(window.innerWidth*0.15, window.innerHeight*0, window.innerWidth*0.85, window.innerHeight*1);
		renderer.setScissorTest(true);
		renderer.render(scene, camera3);
	}
}

function animate(){
	'use strict';
	var i;

	render();
	requestAnimationFrame(animate);

	//desliga ou liga as luzes
	addDirecionalLight();
	for(i = 0; i < pointLightList.length; i++){
		//desliga ou liga as luzes
		addPointLight(i);
	}
	//desliga ou liga as luzes
	addSpotLight();

	alternaCamera();
	moveObjects();

	resultado();
}

function addObjects(){
	'use strict';

	createCameraOrtogonal();
	createCameraOrtogonal2();
	createCameraOrtogonal3();

	createMsg(20000, 50, 0);
	createCampo(0, 0, -3.5);

	createInterectiveObjects();
}

function createInterectiveObjects(){
	
	//flags
	gf_tiros = false;
	velocidade = 0;
	vidasNave = 3;

	gf_cameraOrtogonal = true;
	gf_cameraPrespective1 = false;
	gf_cameraPrespective2 = false;
	 
	gf_gouraud = false;
	gf_basic = true;
	/*--Directional Light--*/
	gf_dirlight = true;
	/*--Point Light--*/
	gf_pointLight = false;
	/*--Spot Light*/
	gf_spotLight = false;
	/*--Resultado--*/
	gf_pause = false;
	gf_terminou = false;
	scene.remove(dirLight);
	scene.remove(spotLight);
	for(i = 0; i < pointLightList.length; i++){
		scene.remove(pointLightList[i]);
	}
	
	
	//cria uma linha com quatro invaderes, a uma determinada altura
	colocaInvader(0);
	colocaInvader(40);

	//cria a nave
	createNave(0, -70, 0, false);

	createVidasNave(0x00ff00, -20000, 54.25, 0, false);
	createVidasNave(0x00ff00,-20000, 44.25, 0, false);
	createVidasNave(0x00ff00,-20000, 35, 0, false);
	
	//cria o spotlight
	createSpotLight(0xffffff, 3, 100, Math.PI/4);
	
	//cria a luz direcional
	createDirecionalLight(0xffffff, 5);
	
	//createPointLight(color, intens, dis, 0, 0, 0);
	createPointLight(0xffffff, 2, 150, -50, 0, 100);
	createPointLight(0xffffff, 2, 150,-50, 60, 100);
	createPointLight(0xffffff, 2, 150, -50, -60, 100);
	createPointLight(0xffffff, 2, 150, 50, 0, 100);
	createPointLight(0xffffff, 2, 150, 50, 60, 100);
	createPointLight(0xffffff, 2, 150, 50, -60, 100);
	

}