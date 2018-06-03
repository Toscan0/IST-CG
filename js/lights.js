/*--Lights--*/
function addDirecionalLight(){
	'use strict';

	if(gf_dirlight == true){
		if(dirLightCreate == 1){
			createDirecionalLight();
		}
		dirLightCreate++;
	}
	else{
		dirLightCreate = 0;
		var i;
		for(i = 0; i < dirLightList.length; i++){
			scene.remove(dirLightList[i]);
            dirLightList.splice(i, 1);
		}
	}
}

function createDirecionalLight(){
	'use strict';
	
	//ff6600 b3b300
	//branco 0xffffff
	//o que estava 0xff6600
	dirLight = new THREE.DirectionalLight(0xffffff, 5);
	dirLight.position.set(-300, -300, 75);
    	dirLight.target.position.set(0,0,0);
    	dirLight.target.updateMatrixWorld();
    
    scene.add(dirLight);
    scene.add(new THREE.DirectionalLightHelper(dirLight,0.2));
    
    dirLightList.push(dirLight);
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

function addPointLight(){
	'use strict';

	if(gf_pointLight == true){
		//Cria novos PointLight
		if(pointLightCreate == 1){
			var color = 0xffffff; //white
			var intens = 2;
			var dis = 150;
			var posX = 50;
			var posZ = 100;

			//createPointLight(color, intens, dis, 0, 0, 0);
			createPointLight(color, intens, dis, -posX, 0, posZ);
			createPointLight(color, intens, dis,-posX, 60, posZ);
			createPointLight(color, intens, dis, -posX, -60, posZ);
			createPointLight(color, intens, dis, posX, 0, posZ);
			createPointLight(color, intens, dis, posX, 60, posZ);
			createPointLight(color, intens, dis, posX, -60, posZ);
		}
		pointLightCreate++;
	}
	else{
		//remove os pontosLight anteriores
		pointLightCreate = 0;
		var i;
		for(i=0; i < pointLightList.length; i++){
			scene.remove(pointLightList[i]);
            pointLightList.splice(i, 1);
		}
	}
}
