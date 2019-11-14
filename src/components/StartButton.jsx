import React from 'react';

import {StyledStartButton} from './styledComponents/StyledStrartButton';

const StartButton = ({callback}) => {
	return <StyledStartButton onClick={callback}>Start Game</StyledStartButton>;
};

export default StartButton;
