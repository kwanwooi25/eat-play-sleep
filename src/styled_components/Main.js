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
  width: 100%;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
  `}
`;

const HeaderWrapper = styled(FlexRowDiv)`
  justify-content: space-between;
  width: 100%;
  min-height: 4rem;
  margin: auto;

  ${({ theme }) => `
    max-width: ${theme.breakPoints.sm};
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
  grid-row: 1fr;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;

  ${({ theme }) => `
    max-width: ${theme.breakPoints.sm};
  `}
`;

const BottomNav = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color[`${theme.primary}${theme.xxlight}`]};
`;

const BottomNavWrapper = styled(FlexRowDiv)`
  align-items: stretch;
  margin: auto;

  ${({ theme }) => `
    max-width: ${theme.breakPoints.sm};
  `}
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
Main.Header.Wrapper = HeaderWrapper;
Main.Header.Title = HeaderTitle;
Main.Header.Content = HeaderContent;
Main.Content = Content;
Main.Content.Wrapper = ContentWrapper;
Main.BottomNav = BottomNav;
Main.BottomNav.Wrapper = BottomNavWrapper;
Main.BottomNav.Link = BottomNavLink;
Main.BottomNav.Link.Label = BottomNavLinkLabel;

export default Main;