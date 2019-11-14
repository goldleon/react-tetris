import { useState, useEffect } from 'react';

import { createStage } from '../helpers/gameHelpers';

export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());

	useEffect(() => {
		const updateStage = prevStage => {
			// Fits flush the stage
			const newStage = prevStage.map(row =>
				row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
			);

			// Draw the tetrominos
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`,
						];
					}
				});
			});

			// Check if the player have collided
			if (player.collided) {
				resetPlayer();
			}

			return newStage;
		};

		setStage(prevS => updateStage(prevS));
	}, [player, resetPlayer]);

	return [stage, setStage];
};
