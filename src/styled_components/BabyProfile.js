import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';

const BabyProfile = styled(FlexColumnDiv)``;

const Header = styled(FlexRowDiv)`
  justify-content: space-between;
  width: 100%;
`;

const HeaderTitle = styled.h3`
  padding: ${({ theme: { space } }) => space.sm};
`;

const HeaderControls = styled(FlexRowDiv)`
  ${({ theme }) => `
    background: ${theme.color[`${theme.grey}${theme.xlight}`]};
    padding: ${theme.space.xs};
    border-radius: calc((${theme.space.xs} * 2 + 3rem) / 2);
  `}
`;

const HeaderButton = styled(ButtonBase)`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;

  ${({ theme }) => `
    padding: ${theme.space.xs};

    svg {
      fill: ${theme.color[`${theme.primary}${theme.main}`]};
    }
  `}
`;

const Info = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 5fr;

  ${({ theme: { space } }) => `
    grid-gap: ${space.sm};
    padding: ${space.md} ${space.sm};

    span {
      padding: ${space.sm};
    }
  `}
`;

BabyProfile.Header = Header;
BabyProfile.Header.Title = HeaderTitle;
BabyProfile.Header.Controls = HeaderControls;
BabyProfile.Header.Button = HeaderButton;
BabyProfile.Info = Info;

export default BabyProfile;