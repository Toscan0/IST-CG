/*-------------------Colisoes-------------*/
function intersect(a, b) {
    'use strict';

    return  (a.position.x - 4 <= b.position.x + 4 && a.position.x + 4 >= b.position.x - 4) && 
    (a.position.y - 4 <= b.position.y + 2 && a.position.y + 2 >= b.position.y - 4);
}
   
function intersectBala(bala, alien){
    'use strict';
       
  // get box closest point to sphere center by clamping
  var x = Math.max(alien.position.x - 4, Math.min(bala.position.x, alien.position.x + 4));
  var y = Math.max(alien.position.y - 4, Math.min(bala.position.y, alien.position.y + 2));
  var z = Math.max(alien.position.z - 3, Math.min(bala.position.z, alien.position.z + 3));
 
  // this is the same as isPointInsideSphere
  var distance = Math.sqrt((x - bala.position.x) * (x - bala.position.x) +
                           (y - bala.position.y) * (y - bala.position.y) +
                           (z - bala.position.z) * (z - bala.position.z));
   
  return distance < 0.7;
}

function tirosLimiteColision(){
    'use strict';

     var j, e;

        for (j=0; j < tiroList.length; j++){
            tiroList[j].position.y += velTiro*t;;
            //Para imprimir a posicao da Nave na consola
            //descomente as linhas seguintes
            //console.log("Tiro PositionX:", tiro.position.x);
            //console.log("Tiro PositionY:", tiro.position.y);
 
            //ve se o tiro ja saiu do campo, se sim elimina-o
            if(tiroList[j].position.y > limite){
                scene.remove(tiroList[j]);
                //na posicacao j remove um elemento
                tiroList.splice(j, 1);
                break;
            }
            for (e = 0; e < invaderList.length; e++){
                if (intersectBala(tiroList[j], invaderList[e].inv)){
                scene.remove(tiroList[j]);
                //na posicacao j remove um elemento
                tiroList.splice(j, 1);  
                scene.remove( invaderList[e].inv);
                //na posicacao j remove um elemento
                invaderList.splice(e, 1);
                break;
                }
                 
            }
        }
}

//ve os limites laterais com as naves
function naveLimiteColison(){
    'use strict';

    //bateu no limite direito
    if(nave.position.x >= (limite-5)){
        nave.position.x = (limite-5.1);
        velocidade = 0;
        nave.userData.moverDireita = false;
        nave.userData.moverEsquerda = false;
    }
    
    //bateu no limite Esquerdo
    if(nave.position.x <= (-limite+5)){
        nave.position.x = -(limite-5.1);
        velocidade = 0;
        nave.userData.moverDireita = false;
        nave.userData.moverEsquerda = false;
    }
}

//Move os invaderes e ve os limites laterais com os invaderes
function moveInvader(){
    'use strict';

    var i;

    for(i = 0; i < invaderList.length; i++){
        invaderList[i].inv.position.x +=  invaderList[i].speedXX*t;
        invaderList[i].inv.position.y +=  invaderList[i].speedYY*t;

        //limite lateral direito
        if(invaderList[i].inv.position.x >= limite-4.1){
            invaderList[i].speedXX = -invaderList[i].speedXX;
        }
        //limite lateral esquerdo
        if(invaderList[i].inv.position.x <= -limite+4.1){
            invaderList[i].speedXX = -invaderList[i].speedXX;
        }
        //limite lateral superior
        if(invaderList[i].inv.position.y >= limite-1.5){
            invaderList[i].speedYY = -invaderList[i].speedYY;
        }
        //limite lateral inferior
        //os aliens so se movimentam nos quadrantes com eixoYY positivo
        if(invaderList[i].inv.position.y <= -20+1.5){
            invaderList[i].speedYY = -invaderList[i].speedYY;
        }
    }
}

function invaderInvaderColision(){
    'use strict';

    var i, e;
    for (i = 0; i < invaderList.length - 1; i++){
        for (e = i + 1; e < invaderList.length; e++){
            if(intersect(invaderList[i].inv, invaderList[e].inv)){
                invaderList[i].speedXX = -invaderList[i].speedXX;
                invaderList[i].speedYY = -invaderList[i].speedYY;
                if (invaderList[i].speedYY < 0){
                    invaderList[i].inv.position.y -= 0.1;   
                }
                else{
                    invaderList[i].inv.position.y += 0.1;   
                }
                if (invaderList[i].speedXX < 0){
                    invaderList[i].inv.position.x -= 0.1;                       
                }else{
                    invaderList[i].inv.position.x += 0.1;                       
                }
                 
                invaderList[e].speedXX = -invaderList[e].speedXX;
                invaderList[e].speedYY = -invaderList[e].speedYY;
                if (invaderList[e].speedYY < 0){
                    invaderList[e].inv.position.y -= 0.1;   
                }else{
                    invaderList[e].inv.position.y += 0.1;   
                }
                if (invaderList[e].speedXX < 0){
                    invaderList[e].inv.position.x -= 0.1;                       
                }else{
                    invaderList[e].inv.position.x += 0.1;                       
                }
            }    
        }
    }
}



