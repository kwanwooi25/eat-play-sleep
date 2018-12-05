import styled from 'styled-components';
import FlexRowDiv from './FlexRowDiv';

const Snackbar = styled(FlexRowDiv)`
  width: 100%;
  position: absolute;
  bottom: 0;
  color: white;
  overflow: hidden;

  ${({ theme, variant, open }) => `
    padding: ${theme.space.md};
    z-index: ${open ? 9999 : -1};

    ${Content} {
      width: 100%;
      border-radius: ${theme.borderRadius};
      padding: ${theme.space.sm} ${theme.space.md};
      box-shadow:
        0 8px 10px 1px rgba(0, 0, 0, .14),
        0 3px 14px 2px rgba(0, 0, 0, .12),
        0 5px 5px -3px rgba(0, 0, 0, .2);

      background: ${variant === 'success' ? `
        ${theme.color[`${theme.success}${theme.main}`]};
      ` : variant === 'error' ? `
        ${theme.color[`${theme.error}${theme.main}`]};
      ` : `
        ${theme.color[`${theme.grey}${theme.xdark}`]};
      `}

      transform: ${open ? 'translateY(0)' : 'translateY(200%)'};
    }
      
  `}
`;

const Content = styled.span``;

Snackbar.Content = Content;

export default Snackbar;