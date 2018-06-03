/*-----------------key eventes---------------*/
//verifica se alguma tecla foi premida
function onKeyDown(e){
	'use strict';

	var i;
	switch (e.keyCode) {
	//se a tecla 'a' ou 'A' for premida alterna entre os modelos de arame e solidos
	case 65: //A
	case 97: //a
		if(gf_pause == false){
			changeWireframe();
		}
		break;
	//Dispara um tiro
	case 32: // tecla espaco
	case 66: //B
	case 98: //b
	case 32:
		if(gf_pause == false){
			gf_tiros = true;
			disparaTiro(gf_gouraud);
		}
		break;
	//ativa e desativa as estrelinhas(Point Light)
	case 67: //c
	case 99: //c
		if(gf_pause == false){
			if(gf_basic == false){
				gf_pointLight = !gf_pointLight;
			}
		}
		break;
	//Sombreamento Gouraud e Phong
	case 71: //G
	case 103: //g
		if(gf_pause == false){
			gf_gouraud = !gf_gouraud;
			gf_basic = false;		
			changeMaterial();
		}		
		break;
	//ativa/desativa o SpotLight
	case 72: //H
	case 104: //h
		if(gf_pause == false){
			if(gf_basic == false){
				gf_spotLight = !gf_spotLight;
			}
		}
		break;
	case 73:  //I
	case 105: //i
		//imprime os materiais, e as variaveis
		globalPrint();
		break;
	//Ativa/desativa calculo da iluminacao
	case 76: //L
	case 108: //l
		if(gf_pause == false){
			gf_basic = !gf_basic;		
			changeMaterial();
		}
		break;
	//Ativa luz
	case 78: //N
	case 110: //n
		if(gf_pause == false){
			//So e possivel alterar se estivermos em modo Phong/Gouraund
			if(gf_basic == false){
				gf_dirlight = !gf_dirlight;
			}
		}
		break;
	reinicia
	case 82: //R
	case 114: //r
		if(gf_terminou == true){
			 restart();
		}
		break;
	//Pausa
	case 80: //P
	case 112: //p
	case 83: //S
	case 115: //s
		if(gf_terminou == false){
			gf_pause = !gf_pause;
			//estamos em pausa
			if((gf_pause == true) && (gf_terminou == false)){
				materialMsg.map = textureMsg[2];
			}
		}
		break;
	//nave a mover para a esquerda
	case 37: //seta esquerda (<-)
		if(gf_pause == false){
			nave.userData.moverEsquerda = true;
			nave.userData.moverDireita = false;
			//nave.rotation.y = -60;		
		}
		break;
	//nave a mover para a direita
	case 39: //seta direita (->)
		if(gf_pause == false){
			nave.userData.moverDireita = true;
			nave.userData.moverEsquerda = false;
			//nave.rotation.y = 60;
		}
		break;
	//ativa a camera ortogonal
	case 49: //1
		if(gf_pause == false){
			gf_cameraOrtogonal = true;
			gf_cameraPrespective1 = false;
			gf_cameraPrespective2 = false;
		}
		break;
	//ativa a camera em prespetiva1
	case 50: //2
		if(gf_pause == false){
			gf_cameraOrtogonal = false;
			gf_cameraPrespective1 = true;
			gf_cameraPrespective2 = false;
		}
		break;
	//ativa a camera em prespetiva2
	case 51: //3
		if(gf_pause == false){
			gf_cameraOrtogonal = false;
			gf_cameraPrespective1 = false;
			gf_cameraPrespective2 = true;
		}
		break;
	}
}

//verifica se alguma tecla que estava a ser permida deixou de o ser
function onKeyUp(e){
	'use strict';

	switch (e.keyCode){
	//Parou de disparar
	case 32: //tecla espaco
	case 66: //B
	case 98: //b
		gf_reoladed = true;
		break;
	//O utilizador nao esta a carregar nem para a esquerda nem para a direita
	case 37: // seta esquerda (<-)
	case 39: // seta direita (->)
		nave.userData.moverEsquerda = false;
		nave.userData.moverDireita = false;
		nave.rotation.y = 0;
		break;
	}
	
}

function onResize() {
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	var rel_asp = window.innerWidth / window.innerHeight;
	
	if (rel_asp > 1){
		camera.left = -limite*rel_asp;
		camera.right = limite*rel_asp;
		camera.top = limite;
		camera.bottom = -limite;
		camera2.left = -5*rel_asp;
		camera2.right = 5*rel_asp;
		camera2.top = 15;
		camera2.bottom = -15;
	}
	else{
		camera.left = -limite;
		camera.right = limite;
		camera.top = limite/rel_asp;
		camera.bottom = -limite/rel_asp;
		camera2.left = -5;
		camera2.right = 5;
		camera2.top = 15/rel_asp;
		camera2.bottom = -15/rel_asp;
	}
	camera.updateProjectionMatrix();
}

function changeWireframe(){
	'use strict';

	scene.traverse(function (node){
		if (node instanceof THREE.Mesh) {
			node.material.wireframe = !node.material.wireframe;
		}
	});
	//materialNave.wireframe = !materialNave.wireframe
	materialCampo.wireframe = false;
}

function changeMaterial(){
	invaderListTemp = [];
	tiroListTemp = [];
	naveListTemp = [];

	if(naveList.length == 1){
		scene.remove(naveList[0]);
		naveListTemp.push(naveList[0]);
	}
	naveList = [];
	for(i = 0; i < naveListTemp.length; i++){
		createNave(naveListTemp[i].position.x, -70, 0, gf_gouraud);
	}
	
	//INVADER
	for (i=0; i < invaderList.length; i++){
		scene.remove(invaderList[i].inv);
		invaderListTemp.push(invaderList[i]);
	}	
	
	invaderList = [];
	
	for (i=0; i < invaderListTemp.length; i++){
		createInvader(invaderListTemp[i].inv.position.x, 
						invaderListTemp[i].inv.position.y, 
							invaderListTemp[i].inv.position.z, gf_gouraud,
								invaderListTemp[i].speedXX,
									invaderListTemp[i].speedYY)
	}
	
	//TIRO
	for (i=0; i < tiroList.length; i++){
		scene.remove(tiroList[i]);
		tiroListTemp.push(tiroList[i]);
	}	
	
	tiroList = [];
	
	for (i=0; i < tiroListTemp.length; i++){
		createTiro(tiroListTemp[i].position.x, 
						tiroListTemp[i].position.y, 
							tiroListTemp[i].position.z, gf_gouraud)
	}	
}

function restart(){
	'use strict';

	if(naveList.length == 1){
		scene.remove(naveList[0]);
	}
	naveList = [];
	for (i=0; i < invaderList.length; i++){
		scene.remove(invaderList[i].inv);
	}		
	invaderList = [];
	for (i=0; i < tiroList.length; i++){
		scene.remove(tiroList[i]);
	}	
	tiroList = [];

	vidasList = [];
	
	createInterectiveObjects();
}