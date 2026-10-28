import { OruvynLogo } from '@/branding/components/OruvynLogo';
import { styled } from '@linaria/react';
import { Trans } from '@lingui/react/macro';
import { type ReactNode } from 'react';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledLayout = styled.div`
  display: grid;
  flex: 1;
  font-family: ${themeCssVariables.font.family};
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  min-height: calc(100dvh / var(--t-zoom, 1));
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const StyledIdentity = styled.aside`
  background: ${themeCssVariables.brand.navy};
  box-sizing: border-box;
  color: ${themeCssVariables.brand.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: clamp(32px, 5vw, 80px);
  position: relative;

  &::after {
    border: 1px solid ${themeCssVariables.brand.onNavyBorder};
    border-radius: 50%;
    bottom: -220px;
    content: '';
    corner-shape: round;
    height: 480px;
    pointer-events: none;
    position: absolute;
    right: -200px;
    width: 480px;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const StyledBrand = styled.div`
  --t-font-color-primary: ${themeCssVariables.brand.white};
`;

const StyledMessage = styled.div`
  margin: ${themeCssVariables.spacing[16]} 0;
  max-width: 460px;
  position: relative;
  z-index: 1;

  h1 {
    font-size: clamp(36px, 3.5vw, 56px);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1.12;
    margin: 0 0 ${themeCssVariables.spacing[6]};
  }

  p {
    color: ${themeCssVariables.brand.onNavyMuted};
    font-size: 16px;
    line-height: 1.7;
    max-width: 340px;
  }
`;

const StyledSignature = styled.p`
  color: ${themeCssVariables.brand.onNavyMuted};
  font-size: ${themeCssVariables.font.size.sm};
  position: relative;
  z-index: 1;
`;

const StyledForm = styled.main`
  display: flex;
  min-width: 0;

  @media (max-width: 600px) {
    > div {
      padding: ${themeCssVariables.spacing[6]};
    }
  }
`;

type AuthSplitLayoutProps = {
  children: ReactNode;
};

export const AuthSplitLayout = ({ children }: AuthSplitLayoutProps) => (
  <StyledLayout>
    <StyledIdentity>
      <StyledBrand>
        <OruvynLogo size={36} />
      </StyledBrand>
      <StyledMessage>
        <h1>
          <Trans>Every relationship, in motion.</Trans>
        </h1>
        <p>
          <Trans>
            A clear view of your relationships. Space to focus on what comes
            next.
          </Trans>
        </p>
      </StyledMessage>
      <StyledSignature>
        <Trans>Built on Twenty. Shaped for Oruvyn.</Trans>
      </StyledSignature>
    </StyledIdentity>
    <StyledForm>{children}</StyledForm>
  </StyledLayout>
);
