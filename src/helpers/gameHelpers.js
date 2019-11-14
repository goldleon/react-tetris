export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
    return Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']))
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // 1. check if we're on an actual tetromino cell
            if (player.tetromino[y][x] !== 0) {
                // 2. check that our move is inside the game area height (y)
                // it shouldn't go through the bottom of the play area
                if (
                    !stage[y + player.pos.y + moveY] ||
                    // 3. check that our move is inside the game area's width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. check that the cell we're moving to is not set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }

            }

        }

    }
}