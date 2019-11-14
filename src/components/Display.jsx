import React from 'react';

// Styled Component
import {StyledDisplay} from './styledComponents/StyledDisplay';

const Display = ({gameOver, text}) => {
	return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export default Display;
