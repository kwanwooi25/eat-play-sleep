import styled from 'styled-components';
import Box from './shared/Box';
import FlexColumnDiv from './shared/FlexColumnDiv';
import ButtonBase from './shared/Button';

const Settings = styled.div``;

const BabyProfileContainer = styled(Box)`
  margin: ${({ theme: { space } }) => space.sm};
`;

const AppSettings = styled(Box)`
  padding: 0;
  margin: ${({ theme: { space } }) => space.sm};
`;

const SectionTitle = styled.h3`
  ${({ theme }) => `
    padding: ${theme.space.md};
  `}
`;

const SettingsButtonContainer = styled(FlexColumnDiv)`
  width: 100%;
`;

const SettingsButton = styled(ButtonBase)`
  border-radius: 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color[`${theme.primary}${theme.xxlight}`]};
`;

const SettingsButtonLabel = styled.span``;

const SettingsButtonIconContainer = styled.span`
  width: 1.5rem;
  height: 1.5rem;

  svg {
    fill: ${({ theme }) => theme.color[`${theme.primary}${theme.main}`]};
  }
`;

const LogoutButtonContainer = styled(FlexColumnDiv)`
  padding: ${({ theme: { space } }) => space.sm};
`;

const LogoutButton = styled(ButtonBase.Error)``;

Settings.BabyProfileContainer = BabyProfileContainer;
Settings.AppSettings = AppSettings;
Settings.SectionTitle = SectionTitle;
Settings.ButtonContainer = SettingsButtonContainer;
Settings.Button = SettingsButton;
Settings.Button.Label = SettingsButtonLabel;
Settings.Button.IconContainer = SettingsButtonIconContainer;
Settings.LogoutButtonContainer = LogoutButtonContainer;
Settings.LogoutButton = LogoutButton;

export default Settings;