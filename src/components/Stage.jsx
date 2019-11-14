import React from 'react';

// Components
import Cell from './Cell';

// Styled Components
import {StyledStage} from './styledComponents/StyledStage';

const Stage = ({stage}) => {
	return (
		<StyledStage width={stage[0].length} height={stage.length}>
			{stage.map(row =>
				row.map((cell, index) => <Cell key={index} type={cell[0]} />)
			)}
		</StyledStage>
	);
};

export default Stage;
