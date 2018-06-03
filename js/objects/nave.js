var vertices = [//base da nave
 new THREE.Vector3(-5,-1.5,-2.5),
 new THREE.Vector3(-5,1.5,-2.5),
 new THREE.Vector3(5,-1.5,-2.5),
 new THREE.Vector3(5,1.5,-2.5),
 new THREE.Vector3(-5,-1.5,2.5),
 new THREE.Vector3(-5,1.5,2.5),
 new THREE.Vector3(5,-1.5,2.5),
 new THREE.Vector3(5,1.5,2.5),

//medium nave
 new THREE.Vector3(-3,-1.5,-2.5),
 new THREE.Vector3(-3,1.5,-2.5),
 new THREE.Vector3(3,-1.5,-2.5),
 new THREE.Vector3(3,1.5,-2.5),
 new THREE.Vector3(-3,-1.5,2.5),
 new THREE.Vector3(-3,1.5,2.5),
 new THREE.Vector3(3,-1.5,2.5),
 new THREE.Vector3(3,1.5,2.5),

//top nave
 new THREE.Vector3(-0.5, -1.5, -0.5),
 new THREE.Vector3(-0.5, 1.5, -0.5),
 new THREE.Vector3(0.5, -1.5, -0.5),
 new THREE.Vector3(0.5, 1.5, -0.5),
 new THREE.Vector3(-0.5, -1.5, 0.5),
 new THREE.Vector3(-0.5, 1.5, 0.5),
 new THREE.Vector3(0.5, -1.5, 0.5),
 new THREE.Vector3(0.5, 1.5, 0.5)];

var triangles;

/*---------------Nave------------------------*/
function addNave(obj, material, x, y ,z, vx, vy, vz){
	'use strict'

	geometry = new THREE.Geometry();

	geometry.vertices = vertices;

	geometry.faces.push(new THREE.Face3(vx, vy, vz));

	geometry.computeFaceNormals();
    geometry.mergeVertices();
    
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createNave(x, y, z, met){
	'use strict'

	nave = new THREE.Object3D();

	//cor: 0x00ff00 -> verde
	if(gf_basic == true){
		materialNave = new THREE.MeshBasicMaterial({color:0x00ff00});
	}
	else{
		if(met == false){
			materialNave = new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x222222, shininess: 30});
		}
		else{
			materialNave = new THREE.MeshLambertMaterial({color: 0x00ff00});
		}
	}	

	nave.userData = {moverEsquerda: false, moverDireita: false};

	// ---------------- BASE DA NAVE -------------------
	addNave(nave, materialNave, 0, 0, 0, 0, 1, 2);
	addNave(nave, materialNave, 0, 0, 0, 1, 3, 2);
	addNave(nave, materialNave, 0, 0, 0, 1, 3, 2); //extra for wireframe transverse

	addNave(nave, materialNave, 0, 0, 0, 4, 6, 5);
	addNave(nave, materialNave, 0, 0, 0, 5, 6, 7);

	addNave(nave, materialNave, 0, 0, 0, 1, 0, 4);
	addNave(nave, materialNave, 0, 0, 0, 1, 4, 5);

	addNave(nave, materialNave, 0, 0, 0, 0, 2, 4);
	addNave(nave, materialNave, 0, 0, 0, 4, 2, 6);

	addNave(nave, materialNave, 0, 0, 0, 2, 3, 6);
	addNave(nave, materialNave, 0, 0, 0, 6, 3, 7);

	addNave(nave, materialNave, 0, 0, 0, 3, 1, 5);
	addNave(nave, materialNave, 0, 0, 0, 3, 5, 7);

	// -------------- PARTE MÉDIA DA NAVE ----------------
	addNave(nave, materialNave, 0, 3, 0, 8, 9, 10);
	addNave(nave, materialNave, 0, 3, 0, 10, 9, 11);

	addNave(nave, materialNave, 0, 3, 0, 13, 12, 14);
	addNave(nave, materialNave, 0, 3, 0, 13, 14, 15);

	addNave(nave, materialNave, 0, 3, 0, 11, 9, 13);
	addNave(nave, materialNave, 0, 3, 0, 11, 13, 15);

	addNave(nave, materialNave, 0, 3, 0, 9, 8, 12);
	addNave(nave, materialNave, 0, 3, 0, 9, 12, 13);

	addNave(nave, materialNave, 0, 3, 0, 10, 11, 14);
	addNave(nave, materialNave, 0, 3, 0, 14, 11, 15);

	//Topo da nave
	addNave(nave, materialNave, 0, 6, 0, 16, 17, 18);
	addNave(nave, materialNave, 0, 6, 0, 18, 17, 19);

	addNave(nave, materialNave, 0, 6, 0, 21, 20, 22);
	addNave(nave, materialNave, 0, 6, 0, 21, 22, 23);

	addNave(nave, materialNave, 0, 6, 0, 19, 17, 21);
	addNave(nave, materialNave, 0, 6, 0, 19, 21, 23);

	addNave(nave, materialNave, 0, 6, 0, 17, 16, 20);
	addNave(nave, materialNave, 0, 6, 0, 17, 20, 21);

	addNave(nave, materialNave, 0, 6, 0, 18, 19, 22);
	addNave(nave, materialNave, 0, 6, 0, 22, 19, 23);
	
	scene.add(nave);
	
	nave.position.x = x;
	nave.position.y = y;
	nave.position.z = z;

	naveList.push(nave);	
}
