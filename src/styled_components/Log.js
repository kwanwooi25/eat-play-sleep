import styled from 'styled-components';
import ButtonGroupBase from './shared/ButtonGroup';
import ButtonBase from './shared/Button';
import FlexRowDiv from './shared/FlexRowDiv';

const Log = styled.div`
  background: white;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  grid-template-areas:
    "icon content buttons"
    ". details .";
  grid-row-gap: 0;

  ${({ theme }) => `
    grid-column-gap: ${theme.space.sm};
    border: 1px solid ${theme.color[`${theme.grey}${theme.light}`]};
    border-radius: ${theme.borderRadius};
    padding: ${theme.space.sm};
    margin-bottom: ${theme.space.sm};

    &:hover {
      border-color: ${theme.color[`${theme.primary}${theme.xlight}`]};
      background: ${theme.color[`${theme.grey}${theme.xxlight}`]};
      cursor: pointer;
    }

    &.expand {
      border-color: ${theme.color[`${theme.primary}${theme.xlight}`]};

      ${ContentInfo} {
        max-height: 0;
        transition: 0.15s max-height;
        transition-delay: 0s;
      }

      ${Details} {
        max-height: 100vh;
        transition: 0.5s max-height;
        transition-delay: 0.15s;
      }
    }
  `}
`;

const IconContainer = styled.div`
  grid-area: icon;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;

  ${({ theme, name }) => name ? `
    background: ${theme.color[`${theme[`${name}Color`]}${theme.main}`]};
  ` : `
    background: ${theme.color[`${theme.primary}${theme.main}`]};
  `}
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: ${({ theme: { space } }) => space.xs};
`;

const ContentTitle = styled.span`
  ${({ theme }) => `
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const ContentInfo = styled.span`
  align-self: end;
  justify-self: end;
  max-height: 100%;
  overflow: hidden;
  transition: 0.25s max-height;
  transition-delay: 0.15s;
  font-size: ${({ theme: { fontSize } }) => fontSize.sm};
`;

const ContentTime = styled.span`
  grid-column: 1/3;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;

const ButtonGroup = styled(ButtonGroupBase)`
  grid-area: buttons;
  ${({ theme }) => `
    border-left: 1px dashed ${theme.color[`${theme.primary}${theme.xlight}`]};
    padding-left: ${theme.space.sm};
  `}
`;

const Button = styled(ButtonBase)`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
`;

const Details = styled.div`
  grid-area: details;
  max-height: 0;
  overflow: hidden;
  transition: 0.25s max-height;
`;

const DetailsRow = styled(FlexRowDiv)`
  justify-content: space-between;

  ${({ theme }) => `
    font-size: ${theme.fontSize.sm};
    padding-top: ${theme.space.xs};
  `}
`;

const DetailsLabel = styled.span``;

const DetailsValue = styled.span`
  text-align: right;
`;


Log.IconContainer = IconContainer;
Log.Content = Content;
Log.Content.Title = ContentTitle;
Log.Content.Info = ContentInfo;
Log.Content.Time = ContentTime;
Log.ButtonGroup = ButtonGroup;
Log.Button = Button;
Log.Details = Details;
Log.Details.Row = DetailsRow;
Log.Details.Label = DetailsLabel;
Log.Details.Value = DetailsValue;

export default Log;