import { OruvynLogo } from '@/branding/components/OruvynLogo';
import { SettingsCard } from '@/settings/components/SettingsCard';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsPageLayout } from '@/settings/components/layout/SettingsPageLayout';
import { SettingsLabContent } from '@/settings/lab/components/SettingsLabContent';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { Section } from 'twenty-ui/components/layout';
import { IconBrandGithub } from 'twenty-ui/icon';
import { Card } from 'twenty-ui/primitives/surfaces';
import { MOBILE_VIEWPORT, themeCssVariables, useTheme } from 'twenty-ui/theme';

const StyledCardsGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    grid-template-columns: 1fr;
  }
`;

const StyledIdentity = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[6]};
  padding: ${themeCssVariables.spacing[8]};
`;

const StyledTagline = styled.p`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.lg};
  line-height: 1.5;
  margin: 0;
`;

export const SettingsCommunity = () => {
  const theme = useTheme();

  return (
    <SettingsPageLayout
      title={t`Community`}
      links={[
        {
          children: t`Other`,
          href: getSettingsPath(SettingsPath.Community),
        },
        { children: t`Community` },
      ]}
    >
      <SettingsPageContainer>
        <Section.Root>
          <Card.Root>
            <StyledIdentity>
              <OruvynLogo size={40} />
              <StyledTagline>
                <Trans>Every relationship, in motion.</Trans>
              </StyledTagline>
            </StyledIdentity>
          </Card.Root>
        </Section.Root>

        <Section.Root>
          <Section.Header
            title={t`Connect with Oruvyn`}
            description={t`Explore the project and follow development on GitHub.`}
          />
          <StyledCardsGrid>
            <SettingsCard
              href="https://github.com/Oruvyn"
              Icon={
                <IconBrandGithub
                  size={theme.icon.size.md}
                  stroke={theme.icon.stroke.sm}
                />
              }
              title={t`Oruvyn on GitHub`}
            />
            <SettingsCard
              href="https://github.com/Oruvyn/frontend"
              Icon={
                <IconBrandGithub
                  size={theme.icon.size.md}
                  stroke={theme.icon.stroke.sm}
                />
              }
              title={t`View source code`}
            />
          </StyledCardsGrid>
        </Section.Root>

        <Section.Root>
          <Section.Header
            title={t`Features`}
            description={t`Try our upcoming features. Note they are still in beta. Please bear with us and report any issues you find.`}
          />
          <SettingsLabContent />
        </Section.Root>
      </SettingsPageContainer>
    </SettingsPageLayout>
  );
};
