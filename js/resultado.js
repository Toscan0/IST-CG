/* Resultado */
function resultado(){
	'use strict';

	if(invaderList.length == 0){
		gf_pause = true;
		gf_terminou = true;
		materialMsg.map = textureMsg[1];
	}

	//perdeu
	if(naveList.length == 0){
		gf_pause = true;
		gf_terminou = true;
		materialMsg.map = textureMsg[0];
	}
}