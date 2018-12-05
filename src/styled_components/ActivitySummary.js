import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';
import Box from './shared/Box';

const ActivitySummary = styled.div`
  width: 100%;
`;

const Header = styled(FlexRowDiv)`
  justify-content: space-between;
  padding: ${({ theme: { space } }) => space.sm};
`;

const HeaderButton = styled(ButtonBase.Primary)`
  width: 3rem;
  height: 3rem;

  &:disabled {
    cursor: default;

    ${({ theme }) => `
      background: ${theme.color[`${theme.grey}${theme.main}`]};
    `}
  }

  ${({ theme }) => `
    &:first-child {
      margin-right: ${theme.space.sm};
    }
    &:last-child {
      margin-left: ${theme.space.sm};
    }
  `}
`;

const Content = styled(Box)`
  width: 95%;
  margin: 0 auto;
`;

const ContentItem = styled(FlexRowDiv)`
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${({ theme, name }) => name ? `
    margin-bottom: ${theme.space.sm};

    ${IconContainer} {
      background: ${theme.color[`${theme[`${name}Color`]}${theme.main}`]};
    }
  ` : ''}
`;

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    padding: ${theme.space.xs};
  `}
`;

const ContentItemDetails = styled.div`
  flex: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 2fr 3fr;

  ${({ theme }) => `
    margin-left: ${theme.space.sm};
    font-size: ${theme.fontSize.sm};
  `}
`;

ActivitySummary.Header = Header;
ActivitySummary.Header.Button = HeaderButton;
ActivitySummary.Content = Content;
ActivitySummary.Content.Item = ContentItem;
ActivitySummary.Content.Item.IconContainer = IconContainer;
ActivitySummary.Content.Item.Details = ContentItemDetails;

export default ActivitySummary;