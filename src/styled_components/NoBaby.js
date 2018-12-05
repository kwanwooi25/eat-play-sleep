import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import ButtonBase from './shared/Button';

const NoBaby = styled(FlexColumnDiv)`
  height: 100%;
  margin: auto;
`;

const Button = styled(ButtonBase.Primary)`
  border-radius: 100%;
  width: 5rem;
  height: 5rem;

  ${({ theme: { space } }) => `
    margin: ${space.md};
    padding: ${space.xs};
  `}
`;

const Message = styled.p`
  text-align: center;
  margin: 0;
  margin-bottom: ${({ theme: { space } }) => space.sm};
`;

NoBaby.Button = Button;
NoBaby.Message = Message;

export default NoBaby;