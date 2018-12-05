import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';
import FlexColumnDiv from './shared/FlexColumnDiv';
import ButtonBase from './shared/Button';

const ActivityTimer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;

  ${({ multi, theme }) => `
    margin-bottom: ${theme.space.sm};
    
    ${multi ? `
      flex-direction: column;
    ` : `
      flex-direction: row;
    `}
  `}
`;

const Display = styled(FlexColumnDiv)`
  @keyframes blink {
    0%,
    100% { opacity: 1; }
    50% { opacity: 0; }
  }

  ${({ theme, paused }) => `
    font-size: 4rem;
    font-weight: ${theme.fontWeight.bold};
    margin: ${theme.space.sm};
    padding: ${theme.space.sm};

    ${paused ? `animation: 1.5s blink infinite;` : ''}
  `}
`;

const Controls = styled(FlexRowDiv)``;

const ButtonGroup = styled(FlexColumnDiv)``;

const Button = styled(ButtonBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  
  ${({ theme }) => `
    border: 3px solid ${theme.color[`${theme.primary}${theme.main}`]};
    border-radius: ${theme.borderRadius};
    padding: ${theme.space.xs};
    margin: ${theme.space.xs};

    svg {
      fill: ${theme.color[`${theme.primary}${theme.main}`]};
    }
  `}
`;

const SideDisplay = styled(FlexColumnDiv)`
  ${({ active, theme }) => `
    padding: ${theme.space.md};

    ${active ? `
      ${SideDisplayIcon} {
        background: ${theme.color[`${theme.primary}${theme.main}`]};
      }

      ${SideDisplayTime} {
        color: ${theme.color[`${theme.primary}${theme.main}`]};
      }
    ` : ''}
  `}
`;

const SideDisplayIcon = styled.div`
  border-radius: 100%;
  width: 4rem;
  height: 4rem;
  
  ${({ theme }) => `
    background: ${theme.color[`${theme.grey}${theme.light}`]};
    margin: ${theme.space.sm};
    padding: ${theme.space.xs};
  `}
`;

const SideDisplayTime = styled.span`
  color: ${({ theme }) => theme.color[`${theme.grey}${theme.light}`]};
`;

ActivityTimer.Display = Display;
ActivityTimer.Controls = Controls;
ActivityTimer.ButtonGroup = ButtonGroup;
ActivityTimer.Button = Button;
ActivityTimer.SideDisplay = SideDisplay;
ActivityTimer.SideDisplay.Icon = SideDisplayIcon;
ActivityTimer.SideDisplay.Time = SideDisplayTime;

export default ActivityTimer;