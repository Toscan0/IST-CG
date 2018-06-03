function globalPrint(){
	'use strict';

	console.log("---------------Begin Print---------------");
	console.log("t -> ", t);
	
	//objetos
	//invader
	if(invaderList.length > 0){
		console.log("materialInvader -> ", materialInvader);
		console.log("Quantos Invaderes -> ", invaderList.length);
	}
	//nave
	if(naveList.length > 0){
		console.log("materialNave -> ", materialNave);
		console.log("velocidadeNave -> ", velocidade);
		console.log("PosicaoNaveX -> ", nave.position.x);
		console.log("PosicaoNaveY -> ", nave.position.y);
		console.log("PosicaoNaveZ -> ", nave.position.z);
	}
	//tiro
	if(tiroList.length > 0){
		console.log("gf_tiros -> ", gf_tiros);
		console.log("gf_reoladed -> ", gf_reoladed);
		console.log("materialTiro -> ", materialTiro);
	}
	
	//camara
	console.log("gf_cameraOrtogonal -> ", gf_cameraOrtogonal);
	console.log("gf_cameraPrespective1 ->", gf_cameraPrespective1);
	console.log("gf_cameraPrespective2 -> ", gf_cameraPrespective2);
	
	//luzes
	console.log("gf_gouraud -> ", gf_gouraud);
	console.log("gf_basic -> ", gf_basic);
	//luz direcional
	console.log("gf_dirlight -> ", gf_dirlight);
	console.log("dirLight -> ", dirLight);
	//Point light
	console.log("whitePoint -> ", whitePoint);
	console.log("gf_pointLight -> ", gf_pointLight);
	//Spot light
	console.log("spotLight -> ", spotLight);
	console.log("gf_spotLight -> ",gf_spotLight);

	//resultado
	console.log("gf_pause -> ", gf_pause);
	console.log("gf_terminou -> ", gf_terminou);
	if(invaderList.length == 0){
		console.log("O jogador ganhou");
	}
	if(naveList.length == 0){
		console.log("O jogador perdeu");
	}

	console.log("----------------End Print----------------");
}