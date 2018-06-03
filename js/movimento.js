/*-----------Movimento---------------*/
function moveObjects(){
    'use strict';

    t = clock.getDelta();
    //pausa ativa
    if(gf_pause == true){
        t = 0;
    }
    moveNave();
    tirosLimiteColision();
    moveInvader();
    invaderInvaderColision();
}


function moveNave(){
    'use strict';

    //andar para a esquerda
    if(nave.userData.moverEsquerda == true){
        if(velocidade <= Vmin){
            velocidade = Vmin
        }
        else{
            velocidade += -aceleracao*t;
        }
    }

    //andar para a direita
    if(nave.userData.moverDireita == true){
        if(velocidade>= Vmax){
            velocidade = Vmax
        }
        else{   
            velocidade += aceleracao*t;
        }
    }

    //verifica se houve colisao entre a nave e um dos limites
    naveLimiteColison();

    //atualiza a posicao da nave no eixo do x
    nave.position.x += velocidade*t;

    //Para imprimir a velocidade e a posicao da Nave na consola
    //descomente as linhas seguintes    
    //console.log("Nave Speed: ", velocidade);
    //console.log("Nave PositionX:", nave.position.x);
    
    //camera em prespetiva2 ativa
    if((gf_cameraOrtogonal == false) && (gf_cameraPrespective1 == false) && (gf_cameraPrespective2 == true)){
        camera.position.x += velocidade*t;
    } 

    spotLight.position.set(nave.position.x, nave.position.y-3, 6);
    spotLight.target.position.set(nave.position.x, nave.position.y+140, 0);
    //spotLight.target.updateMatrixWorld();
}