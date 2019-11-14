import React from 'react';

// Styled Components
import {StyledCell} from './styledComponents/StyledCell';

// Utils
import {TETROMINOS} from '../helpers/tetrominos';

const Cell = ({type}) => {
	return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default Cell;
