import { type I18n } from '@lingui/core';
import { Text } from 'react-email';
import { canvasTheme } from 'src/common-style';

const logoStyle = {
  color: '#111C31',
  fontFamily: canvasTheme.font.family,
  fontSize: '28px',
  fontWeight: 600,
  letterSpacing: '-1px',
  lineHeight: '36px',
  marginBottom: '40px',
};

type LogoProps = {
  i18n: I18n;
};

export const Logo = ({ i18n }: LogoProps) => {
  return <Text style={logoStyle}>{i18n._('Oruvyn')}</Text>;
};
