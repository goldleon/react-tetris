import {
	useState,
	useCallback
} from 'react';

import {
	randomTetromino,
	TETROMINOS
} from '../helpers/tetrominos';
import {
	STAGE_WIDTH,
	checkCollision
} from '../helpers/gameHelpers';

export const usePlayer = () => {
	const [player, setPlayer] = useState({
		pos: {
			x: 0,
			y: 0
		},
		tetromino: TETROMINOS[0].shape,
		collided: false,
	});

	const rotate = (matrix, direction) => {
		// transform the rows to columns
		const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]))
		// Reverse each row to get a rotated matrix
		if (direction > 0) return rotatedTetro.map(row => row.reverse())

		return rotatedTetro.reverse()
	}

	const playerRotate = (stage, direction) => {
		const prevPlayer = JSON.parse(JSON.stringify(player))
		prevPlayer.tetromino = rotate(prevPlayer.tetromino, direction);

		const pos = prevPlayer.pos.x
		let offset = 1;
		while (checkCollision(prevPlayer, stage, {
			x: 0,
			y: 0
		})) {
			prevPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1))
			if (offset > prevPlayer.tetromino[0].length) {
				rotate(prevPlayer.tetromino, -direction);
				prevPlayer.pos.x = pos;
				return;
			}

		}

		setPlayer(prevPlayer)
	}

	const updatePlayerPos = ({
		x,
		y,
		collided
	}) => {
		setPlayer(prevState => ({
			...prevState,
			pos: {
				x: (prevState.pos.x += x),
				y: (prevState.pos.y += y),
			},
			collided,
		}));
	};

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: {
				x: (STAGE_WIDTH / 2) - 2,
				y: 0
			},
			tetromino: randomTetromino().shape,
			collided: false,
		});
	}, []);

	return [player, updatePlayerPos, resetPlayer, playerRotate];
};