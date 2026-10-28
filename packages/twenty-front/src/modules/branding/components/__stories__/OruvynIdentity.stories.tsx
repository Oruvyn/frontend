import { AuthSplitLayout } from '@/branding/components/AuthSplitLayout';
import { OruvynLogo } from '@/branding/components/OruvynLogo';
import { styled } from '@linaria/react';
import { Trans } from '@lingui/react/macro';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ThemeProvider, themeCssVariables } from 'twenty-ui/theme';

const StyledPreview = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  box-sizing: border-box;
  color: ${themeCssVariables.font.color.primary};
  display: flex;
  flex-direction: column;
  font-family: ${themeCssVariables.font.family};
  gap: ${themeCssVariables.spacing[6]};
  justify-content: center;
  min-height: 280px;
  padding: ${themeCssVariables.spacing[8]};
`;

const StyledPreviewLabel = styled.p`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  line-height: 1.6;
  margin: 0;
`;

const StyledAuthPreview = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.secondary};
  box-sizing: border-box;
  color: ${themeCssVariables.font.color.primary};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: ${themeCssVariables.font.family};
  gap: ${themeCssVariables.spacing[6]};
  justify-content: center;
  padding: ${themeCssVariables.spacing[10]};
  text-align: center;

  h2 {
    font-size: ${themeCssVariables.font.size.xxl};
    font-weight: ${themeCssVariables.font.weight.semiBold};
    letter-spacing: -0.035em;
    margin: 0;
  }

  p {
    max-width: 360px;
  }
`;

const meta: Meta<typeof OruvynLogo> = {
  title: 'Modules/Branding/OruvynIdentity',
  component: OruvynLogo,
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <StyledPreview>
      <OruvynLogo {...args} />
      <StyledPreviewLabel>
        <Trans>Development preview — Oruvyn visual identity.</Trans>
      </StyledPreviewLabel>
    </StyledPreview>
  ),
};

export default meta;
type Story = StoryObj<typeof OruvynLogo>;

export const Light: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider colorScheme="light" applyToRoot={false}>
        <Story />
      </ThemeProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: 'Oruvyn' })).toBeVisible();
    await expect(canvas.getByText('oruvyn')).toBeVisible();
  },
};

export const Dark: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider colorScheme="dark" applyToRoot={false}>
        <Story />
      </ThemeProvider>
    ),
  ],
  play: Light.play,
};

export const Compact: Story = {
  args: { compact: true, size: 24 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: 'Oruvyn' })).toBeVisible();
    await expect(canvas.queryByText('oruvyn')).not.toBeInTheDocument();
  },
};

export const AuthLayout: Story = {
  render: () => (
    <AuthSplitLayout>
      <StyledAuthPreview>
        <OruvynLogo size={40} />
        <h2>
          <Trans>Welcome back to Oruvyn.</Trans>
        </h2>
        <StyledPreviewLabel>
          <Trans>
            Development preview — this composition demonstrates the
            authentication layout. The application uses its existing secure
            sign-in flow.
          </Trans>
        </StyledPreviewLabel>
      </StyledAuthPreview>
    </AuthSplitLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = within(canvas.getByRole('main'));
    await expect(
      main.getByRole('heading', { name: 'Welcome back to Oruvyn.' }),
    ).toBeVisible();
    await expect(main.getByRole('img', { name: 'Oruvyn' })).toBeVisible();
    await expect(main.queryByRole('button')).not.toBeInTheDocument();
  },
};
