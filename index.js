window.onload=()=>{
    svg = document.querySelector('svg');
    leftPaddle = document.getElementById('leftPaddle');
    rightPaddle = document.getElementById('rightPaddle');
    ball = document.getElementById('ball');
    puntosI = document.getElementById('puntosI');
    puntosD = document.getElementById('puntosD');
    iniciar = document.getElementById('iniciar');

    paddleHeight = parseFloat(leftPaddle.getAttribute('height'));
    paddleWidth = parseFloat(leftPaddle.getAttribute('width'));
    svgHeight = parseFloat(svg.getAttribute('height'));
    svgWidth = parseFloat(svg.getAttribute('width'));
    puntos1=0;
    puntos2=0;

    leftPaddleY = (svgHeight - paddleHeight) / 2;
    rightPaddleY = (svgHeight - paddleHeight) / 2;
    leftPaddleX = (paddleWidth) + 20;
    rightPaddleX = (svgWidth - paddleWidth) - 20;

    // Iniciar la posición de la pelota
    ballX = parseFloat(ball.getAttribute('cx'));
    ballY = parseFloat(ball.getAttribute('cy'));
    ballSpeedX = 3;
    ballSpeedY = 1.5;
    rightPaddleSpeed=1.3;
    jugar=false;

    // Actualizar la posición de la paleta izquierda con el ratón
    svg.addEventListener('mousemove', (e) => {
        leftPaddleY = e.clientY - svg.getBoundingClientRect().top - paddleHeight / 2;
        // Limitar la posición de la paleta izquierda dentro de los límites del tablero
        leftPaddleY = Math.max(0, Math.min(svgHeight - paddleHeight, leftPaddleY));
    });

    iniciar.addEventListener("click", ()=>{
        iniciar.style.display="none"
        setInterval(updateGameArea, 6);
    })

    if (jugar){
        setInterval(updateGameArea, 6);
    };
    
}

            
function updateGameArea() {
    // Mover la paleta derecha para seguir la pelota
    if (rightPaddleY + paddleHeight / 2 < ballY) {
        rightPaddleY += rightPaddleSpeed;
    } else {
        rightPaddleY -= rightPaddleSpeed;
    }

    // Limitar la posición de la paleta derecha dentro de los límites del tablero
    rightPaddleY = Math.max(0, Math.min(svgHeight - paddleHeight, rightPaddleY));

    // Colisión con las paletas izquierda y derecha
    if (
        (ballX < leftPaddleX && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX > rightPaddleX && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX*1.1;
    }

    // Colisión con la parte superior e inferior del SVG
    if (ballY < 10 || ballY > svgHeight - 10) {
        ballSpeedY = -ballSpeedY;
    }

    // Verificar si la pelota se sale por la izquierda
    if (ballX < 0) {
        // Restablecer la posición de la pelota al centro
        ballX = svgWidth / 2;
        ballY = svgHeight / 2;
        rightPaddleY = svgHeight / 2;
        ballSpeedX = 3.5; // Restablecer la velocidad de la pelota
        ballSpeedY = 1;

        // Incrementar el marcador del jugador derecho
        sumarPunto("D");
    }

    // Verificar si la pelota se sale por la derecha
    if (ballX > svgWidth) {
        // Restablecer la posición de la pelota al centro
        ballX = svgWidth / 2;
        ballY = svgHeight / 2;
        rightPaddleY = svgHeight / 2;
        ballSpeedX = 3; // Restablecer la velocidad de la pelota
        ballSpeedY = 1.5;

        // Incrementar el marcador del jugador izquierdo
        sumarPunto("I");
    }

    // Actualizar la posición de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Actualizar la posición de las paletas
    leftPaddle.setAttribute('y', leftPaddleY);
    rightPaddle.setAttribute('y', rightPaddleY);

    // Actualizar la posición de la pelota
    ball.setAttribute('cx', ballX);
    ball.setAttribute('cy', ballY);

}


function sumarPunto(jugador){
    if (jugador=="I"){
        puntos1++;
        puntosI.innerHTML=puntos1;
    }else{
        puntos2++;
        puntosD.innerHTML=puntos2;
    }
}
