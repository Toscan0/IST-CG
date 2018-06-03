/*-----------------key eventes---------------*/
//verifica se alguma tecla foi premida
function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
	//se a tecla 'a' ou 'A' for premida alterna entre os modelos de arame e solidos
	case 65: //A
	case 97: //a
		scene.traverse(function (node){
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        materialCampo.wireframe = false;
		//materialNave.wireframe = !materialNave.wireframe;
		//materialInvader.wireframe = !materialInvader.wireframe;
		break;
	//Dispara um tiro
	case 66: //B
	case 98: //b
		gf_tiros = true;
		disparaTiro();
		break;
	//nave a mover para a esquerda
	case 37: //seta esquerda (<-)
		nave.userData.moverEsquerda = true;
		nave.userData.moverDireita = false;		
		break;
	//nave a mover para a direita
	case 39: //seta direita (->)
		nave.userData.moverDireita = true;
		nave.userData.moverEsquerda = false;
		break;
	//ativa a camera ortogonal
	case 49: //1
		gf_cameraOrtogonal = true;
		gf_cameraPrespective1 = false;
		gf_cameraPrespective2 = false;
		break;
	//ativa a camera em prespetiva1
	case 50: //2 
		gf_cameraOrtogonal = false;
		gf_cameraPrespective1 = true;
		gf_cameraPrespective2 = false;
		break;
	//ativa a camera em prespetiva2
	case 51: //3
		gf_cameraOrtogonal = false;
		gf_cameraPrespective1 = false;
		gf_cameraPrespective2 = true;
		break;
	}
}

//verifica se alguma tecla que estava a ser permida deixou de o ser
function onKeyUp(e){
	'use strict';

	switch (e.keyCode){
	//Parou de disparar
	case 66: //B
	case 98: //b
		gf_reoladed = true;
		break;
	//O utilizador nao esta a carregar nem para a esquerda nem para a direita
	case 37: // seta esquerda (<-)
	case 39: // seta direita (->)
		nave.userData.moverEsquerda = false;
		nave.userData.moverDireita = false;
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
	}
	else{
		camera.left = -limite;
		camera.right = limite;
		camera.top = limite/rel_asp;
		camera.bottom = -limite/rel_asp;
	}
	camera.updateProjectionMatrix();
}