import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';

const StatsNavigation = styled(FlexRowDiv)`
  align-items: stretch;
  width: 100%;

  ${({ theme }) => `
    background: white;
    border-bottom: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
  `}
`;

const NavItem = styled(ButtonBase)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 0;
  width: 100%;
  text-decoration: none;
  
  svg {
    width: 2rem;
    height: 2rem;
  }

  ${({ theme, active }) => `
    padding: ${theme.space.sm};
    svg {
      fill: ${theme.color[`${theme.grey}${theme.main}`]};
    }

    ${active === 'true' ? `
      background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
      svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: ${theme.color[`${theme.primary}${theme.dark}`]};
      }

      ${NavItemLabel} {
        width: auto;
        height: auto;
        color: ${theme.color[`${theme.primary}${theme.dark}`]};
      }
    ` : ''}
  `}
`;

const NavItemLabel = styled.span`
  width: 0;
  height: 0;
  overflow: hidden;

  ${({ theme }) => `
    font-size: ${theme.fontSize.xs};
  `}

`;

StatsNavigation.NavItem = NavItem;
StatsNavigation.NavItem.Label = NavItemLabel;

export default StatsNavigation;