var canvas, ctx, gameControl, gameActive;

      var x = 8;
      
      const CANVAS_BORDER_COLOUR = 'white';
      const CANVAS_BACKGROUND_COLOUR = "black";
      const SNAKE_COLOUR = 'red';
      const SNAKE_BORDER_COLOUR = 'darkgreen';


      window.onload = function() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        document.addEventListener("keydown", keyDownEvent);

        gameControl = startGame(x);
      };

      function startGame(x) {
          gameActive = true;
          document.getElementById("game-status").innerHTML = "<small>Game Started</small>";
          document.getElementById("game-score").innerHTML = "<h1>Keep Playing</h1>";
          return setInterval(draw, 1000 / x);
      }
      
      function pauseGame() {
          clearInterval(gameControl);
          gameActive = false;
          document.getElementById("game-status").innerHTML = "<small>Game Paused - Press Escape to continue</small>";
      }
      
      function endGame(x) {
          clearInterval(gameControl);
          gameActive = false;
          document.getElementById("game-status").innerHTML = "<small>Game Over</small>";
          document.getElementById("game-score").innerHTML = "<h1> Score: " + x + "</h1>";
          startGame(x);
      }

      var gridSize = (tileSize = 27);
      var nextX = (nextY = 0);

      // snake
      var defaultTailSize = 1;
      var tailSize = defaultTailSize;
      var snakeTrail = [];
      var snakeX = (snakeY = 10);

      // apple
      var appleX = (appleY = 15);

      function draw() {
        snakeX += nextX;
        snakeY += nextY;

        if (snakeX < 0) {
          snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
          snakeX = 0;
        }

        if (snakeY < 0) {
          snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
          snakeY = 0;
        }

        if (snakeX == appleX && snakeY == appleY) {
          tailSize++;

          appleX = Math.floor(Math.random() * gridSize);
          appleY = Math.floor(Math.random() * gridSize);
        }

      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = SNAKE_COLOUR;
        ctx.strokestyle = SNAKE_BORDER_COLOUR;
        for (var i = 0; i < snakeTrail.length; i++) {
          ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
          );
          
          ctx.strokeRect(snakeTrail[i].x * tileSize , snakeTrail[i].y* tileSize, tileSize, tileSize);


          if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            if(tailSize > 3) {
                endGame(tailSize);
            }
            tailSize = defaultTailSize;  
          }
        }

        ctx.fillStyle = "darkgreen";
        ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);


        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
          snakeTrail.shift();
        }
      }


      function keyDownEvent(e) {
        // Has up, down, left, right and bottom arrows and WASD
        switch (e.keyCode) {
          case 37:
            nextX = -1;
            nextY = 0;
            break;
          case 38:
            nextX = 0;
            nextY = -1;
            break;
          case 39:
            nextX = 1;
            nextY = 0;
            break;
          case 40:
            nextX = 0;
            nextY = 1;
            break;
          case 65:
            nextX = -1;
            nextY = 0;
            break;
          case 87:
            nextX = 0;
            nextY = -1;
            break;
          case 83:
            nextX = 0;
            nextY = 1;
            break;
          case 68:
            nextX = 1;
            nextY = 0;
            break;
          case 27:
            if(gameActive == true) {
                pauseGame();
            }
            else {
                gameControl = startGame(x);
            }
            break;
        }
      }