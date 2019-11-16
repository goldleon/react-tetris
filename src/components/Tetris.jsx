import React, {useState} from 'react';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Styled Components
import {
	StyledTetrisWrapper,
	StyledTetris,
} from './styledComponents/StyledTetris';

// Hooks
import {useInterval} from '../hooks/useInterval';
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';

// Helpers
import {createStage, checkCollision} from '../helpers/gameHelpers';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	const movePlayer = dir => {
		if (!checkCollision(player, stage, {x: dir, y: 0}))
			updatePlayerPos({x: dir, y: 0});
	};

	const startGame = () => {
		// Reset Everything
		setDropTime(1000);
		setStage(createStage());
		resetPlayer();
		setGameOver(false);
	};

	const drop = () => {
		if (!checkCollision(player, stage, {x: 0, y: 1}))
			updatePlayerPos({x: 0, y: 1, collided: false});
		// Game Over
		else {
			if (player.pos.y < 1) {
				console.log('Game Over !!!');
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x: 0, y: 0, collided: true});
		}
	};

	const keyUp = ({keyCode}) => {
		if (!gameOver) {
			if (keyCode === 40) {
				setDropTime(1000);
			}
		}
	};

	const dropPlayer = () => {
		setDropTime(null);
		drop();
	};

	const move = ({keyCode}) => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				dropPlayer();
			} else if (keyCode === 38) {
				playerRotate(stage, 1);
			}
		}
	};

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper
			role="button"
			tabIndex="0"
			onKeyDown={e => move(e)}
			onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text={'Game Over'} />
					) : (
						<div>
							<Display text="Score" />
							<Display text="Rows" />
							<Display text="Level" />
						</div>
					)}

					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
