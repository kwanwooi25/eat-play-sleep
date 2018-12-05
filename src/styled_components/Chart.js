import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';

const Chart = styled.div`
  ${({ theme, marginBottom }) => `
    font-size: ${theme.fontSize.xs};

    ${marginBottom ? `
      border-bottom: 1px dashed ${theme.color[`${theme.primary}${theme.xlight}`]};
      padding-bottom: ${theme.space.sm};
      margin-bottom: ${theme.space.sm};

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
        margin-bottom: 0;
      }
    ` : ''}
  `}
`;

const Tooltip = styled.div`
  background: rgba(255, 255, 255, 0.8);

  ${({ theme }) => `
    border: 1px solid ${theme.color[`${theme.primary}${theme.xlight}`]};
    padding: ${theme.space.xs};
  `}
`;

const TooltipContent = styled(FlexRowDiv)`
  justify-content: space-between;

  ${({ theme }) => `
    span {
      padding: ${theme.space.xs};
    }
  `}
`;

Chart.Tooltip = Tooltip;
Chart.Tooltip.Content = TooltipContent;

export default Chart;