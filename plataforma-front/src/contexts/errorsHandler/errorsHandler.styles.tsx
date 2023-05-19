import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ErrorContainer = styled('div')`
  z-index: 1101;
  position: fixed;
  top: 0;
  

  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 5px auto;

  left: 50%;
  transform: translate(-50%, 0);

  width: 420px;
  max-width: 90%;
`;

export const ErrorCard = styled(Alert)`
  margin-top: 10px;
`