import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';

const Main = styled.main`
  display: grid;
  grid-template-rows: ${({ route }) =>
    route === 'stats' ?
    'auto auto 1fr auto' :
    'auto 1fr auto'
  };
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 4rem;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
    padding: ${theme.space.md};
  `}
`;

const HeaderTitle = styled.h3`
  font-size: ${({ theme: { fontSize } }) => fontSize.lg};
`;

const HeaderContent = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.sm};
`;

const Content = styled.div`
  background: ${({ theme }) => theme.color[`${theme.grey}${theme.xlight}`]};
  overflow-y: auto;
  grid-row: 1fr;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomNav = styled(FlexRowDiv)`
  align-items: stretch;
  border-top: 1px solid ${({ theme }) => theme.color[`${theme.primary}${theme.xxlight}`]};
`;

const BottomNavLink = styled(ButtonBase)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  
  ${({ active, disabled, theme }) => `
    padding: ${theme.space.sm};
    
    ${active === 'true' ? `
      background: ${theme.color[`${theme.primary}${theme.xxlight}`]};

      ${BottomNavLinkLabel} {
        width: auto;
        height: auto;
      }
    ` : ``}

    ${disabled ? `
      color: ${theme.color[`${theme.grey}${theme.main}`]};
      cursor: default;

      &:hover {
        background: transparent;
      }
    ` : ``}
  `}
`;

const BottomNavLinkLabel = styled.span`
  width: 0;
  height: 0;
  overflow: hidden;

  ${({ theme }) => `
    font-size: ${theme.fontSize.sm};
  `}
`;

Main.Header = Header;
Main.Header.Title = HeaderTitle;
Main.Header.Content = HeaderContent;
Main.Content = Content;
Main.BottomNav = BottomNav;
Main.BottomNav.Link = BottomNavLink;
Main.BottomNav.Link.Label = BottomNavLinkLabel;

export default Main;