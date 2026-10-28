import { styled } from '@linaria/react';
import { doNotTranslate } from 'twenty-shared/i18n';
import { themeCssVariables } from 'twenty-ui/theme';

type OruvynLogoProps = {
  compact?: boolean;
  size?: number;
};

const StyledIdentity = styled.span`
  align-items: center;
  color: ${themeCssVariables.font.color.primary};
  display: inline-flex;
  flex-shrink: 0;
  gap: ${themeCssVariables.spacing[2]};
  line-height: 1;
`;

const StyledWordmark = styled.span`
  font-family: ${themeCssVariables.font.family};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  letter-spacing: -0.04em;
`;

export const OruvynLogo = ({ compact = false, size = 32 }: OruvynLogoProps) => (
  <StyledIdentity role="img" aria-label={doNotTranslate('Oruvyn')}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="40"
        height="40"
        rx="11"
        fill={themeCssVariables.brand.navy}
      />
      <path
        d="M26.5 11.5a11 11 0 1 0 2 15"
        stroke={themeCssVariables.brand.mint}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="m24 18 5-7 3 8"
        stroke={themeCssVariables.brand.white}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {!compact && <StyledWordmark>{doNotTranslate('oruvyn')}</StyledWordmark>}
  </StyledIdentity>
);
