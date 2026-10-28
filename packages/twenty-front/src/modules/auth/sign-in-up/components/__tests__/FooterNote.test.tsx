import { FooterNote } from '@/auth/sign-in-up/components/FooterNote';
import { useWorkspaceBypass } from '@/auth/sign-in-up/hooks/useWorkspaceBypass';
import { ORUVYN_SOURCE_LICENSE_URL } from '@/branding/constants/OruvynSource';
import { useIsCurrentLocationOnAWorkspace } from '@/domain-manager/hooks/useIsCurrentLocationOnAWorkspace';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/auth/sign-in-up/hooks/useWorkspaceBypass', () => ({
  useWorkspaceBypass: jest.fn(),
}));

jest.mock('@/domain-manager/hooks/useIsCurrentLocationOnAWorkspace', () => ({
  useIsCurrentLocationOnAWorkspace: jest.fn(),
}));

const enableBypass = jest.fn();

const renderFooter = () =>
  render(
    <I18nProvider i18n={i18n}>
      <FooterNote />
    </I18nProvider>,
  );

describe('FooterNote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useIsCurrentLocationOnAWorkspace).mockReturnValue({
      isOnAWorkspace: true,
    });
    jest.mocked(useWorkspaceBypass).mockReturnValue({
      shouldOfferBypass: false,
      shouldUseBypass: false,
      enableBypass,
    });
  });

  it('links to the actual source license without offering upstream product policies', () => {
    renderFooter();

    const licenseLink = screen.getByRole('link', {
      name: 'Open-source licenses',
    });
    expect(licenseLink).toHaveAttribute('href', ORUVYN_SOURCE_LICENSE_URL);
    expect(licenseLink).toHaveAttribute('target', '_blank');
    expect(licenseLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(
      screen.queryByText(/Twenty|Privacy Policy|Terms of Service/i),
    ).not.toBeInTheDocument();
  });

  it('enables the existing SSO bypass only when offered for the workspace', async () => {
    const user = userEvent.setup();
    jest.mocked(useWorkspaceBypass).mockReturnValue({
      shouldOfferBypass: true,
      shouldUseBypass: false,
      enableBypass,
    });

    renderFooter();

    await user.click(screen.getByRole('button', { name: 'Bypass SSO' }));
    expect(enableBypass).toHaveBeenCalledTimes(1);
  });

  it.each([
    {
      reason: 'the workspace does not offer bypass',
      isOnAWorkspace: true,
      shouldOfferBypass: false,
      shouldUseBypass: false,
    },
    {
      reason: 'bypass is already active',
      isOnAWorkspace: true,
      shouldOfferBypass: true,
      shouldUseBypass: true,
    },
    {
      reason: 'the location is outside a workspace',
      isOnAWorkspace: false,
      shouldOfferBypass: true,
      shouldUseBypass: false,
    },
  ])(
    'hides the bypass action when $reason',
    ({ isOnAWorkspace, shouldOfferBypass, shouldUseBypass }) => {
      jest.mocked(useIsCurrentLocationOnAWorkspace).mockReturnValue({
        isOnAWorkspace,
      });
      jest.mocked(useWorkspaceBypass).mockReturnValue({
        shouldOfferBypass,
        shouldUseBypass,
        enableBypass,
      });

      renderFooter();

      expect(
        screen.queryByRole('button', { name: 'Bypass SSO' }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Open-source licenses' }),
      ).toBeVisible();
      expect(enableBypass).not.toHaveBeenCalled();
    },
  );
});
