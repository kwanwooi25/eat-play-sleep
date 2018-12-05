import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';

const TimeInput = styled(FlexColumnDiv)`
  ${({ small, theme }) => `
    ${small ? `
      ${Button} svg {
        width: 1rem;
        height: 1rem;
      }

      ${Display} {
        font-size: ${theme.fontSize.lg};
      }
    ` : ''}
  `}
`;

const ButtonGroup = styled(FlexRowDiv)``;

const Button = styled(ButtonBase)`
  border-radius: 0;
  flex: 1;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${({ theme }) => `
    color: ${theme.color[`${theme.primary}${theme.light}`]};
    font-size: ${theme.fontSize.xs};
    padding: ${theme.space.xs};
    margin: 0 ${theme.space.xs};

    svg {
      fill: ${theme.color[`${theme.primary}${theme.xlight}`]};
    }
  `}
`;

const Display = styled(FlexRowDiv)`
  align-items: stretch;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => `
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const DisplayNumber = styled(FlexRowDiv)`
  flex: 1;

  ${({ theme, name }) => `
    border-top: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    border-bottom: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    padding: ${theme.space.xs};
    margin: 0 ${theme.space.xs};
    
    ${name !== 'second' ? `
      position: relative;

      &::after {
        content: ':';
        position: absolute;
        right: -${theme.space.sm};
      }
    ` : ''}
  `}
`;

TimeInput.ButtonGroup = ButtonGroup;
TimeInput.Button = Button;
TimeInput.Display = Display;
TimeInput.Display.Number = DisplayNumber;

export default TimeInput;