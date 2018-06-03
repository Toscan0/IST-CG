//mudar -> luz.visible

/*--Lights--*/
function createDirecionalLight(cor, intens){
	'use strict';
	

	//branco 0xffffff
	dirLight = new THREE.DirectionalLight(cor, intens);
	dirLight.position.set(-300, -300, 75);
    
    //Se quiser que a luz direcional aponte para um determinado ponto
    //Descomente  as proximas duas linhas
    //dirLight.target.position.set(0,0,0);
    //dirLight.target.updateMatrixWorld();
    
    scene.add(dirLight);
    
    //Cria um objeto na posicao da luz direcional
    //scene.add(new THREE.DirectionalLightHelper(dirLight,0.2));
    
    dirLightList.push(dirLight);
}

function addDirecionalLight(){
	'use strict';

	if(gf_dirlight == false){
		dirLight.visible = false;
	}
	else{
		dirLight.visible = true;
	}

}

function createPointLight(color, intens, dis, posX, posY, posZ){
	'use strict';

	whitePoint = new THREE.PointLight(color, intens, dis);
    whitePoint.position.set( posX, posY, posZ);
    scene.add(whitePoint);
    //helper class coloca uma wireframed sphere no local da luz
    //se quiserem que aparaçam descomentem a linha seguinte
    //scene.add(new THREE.PointLightHelper(whitePoint, 2));
    
    pointLightList.push(whitePoint);
}

function addPointLight(i){
	'use strict';

	if(gf_pointLight == false){
		pointLightList[i].visible = false;
	}
	else{
		pointLightList[i].visible = true;
	}
}


function createSpotLight(cor, intens, dis, angulo){
	'use strict';

	spotLight = new THREE.SpotLight(cor, intens, dis, angulo);
    spotLight.position.set(nave.position.x, nave.position.y-3, 6);
  
    spotLight.target.position.set(nave.position.x, nave.position.y+140, 0);
  	
  	scene.add(spotLight);
    scene.add(spotLight.target);

    //Cria um ponto no sitio onde e criado  luz
    //scene.add(new THREE.PointLightHelper(spotLight, 1));
}

function addSpotLight(){
	'use strict';

	if(gf_spotLight == false){
		spotLight.visible = false;
	}
	else{
		spotLight.visible = true;
	}
}