import { type I18n } from '@lingui/core';
import { Column, Container, Row } from 'react-email';
import { Link } from 'src/components/Link';
import { ShadowText } from 'src/components/ShadowText';

const footerContainerStyle = {
  marginTop: '12px',
};

type FooterProps = {
  i18n: I18n;
};

export const Footer = ({ i18n }: FooterProps) => {
  return (
    <Container style={footerContainerStyle}>
      <Row>
        <Column>
          <ShadowText>
            <Link
              href="https://github.com/Oruvyn"
              value={i18n._('Oruvyn on GitHub')}
            />
          </ShadowText>
        </Column>
        <Column>
          <ShadowText>
            <Link
              href="https://github.com/Oruvyn/frontend"
              value={i18n._('Source code')}
            />
          </ShadowText>
        </Column>
      </Row>
      <ShadowText>{i18n._('Oruvyn CRM')}</ShadowText>
    </Container>
  );
};
