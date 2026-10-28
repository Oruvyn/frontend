import { ACCENT_TOKENS } from '../accent';
import { BACKGROUND_TOKENS } from '../background';
import { FONT_TOKENS } from '../font';

const luminance = (hex: string) => {
  const channels = hex.match(/[a-f\d]{2}/gi);
  if (channels?.length !== 3) {
    throw new Error(`Expected a six-digit sRGB color: ${hex}`);
  }
  const [red, green, blue] = channels.map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrast = (foreground: string, background: string) => {
  const values = [luminance(foreground), luminance(background)].sort(
    (first, second) => second - first,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
};

for (const scheme of ['light', 'dark'] as const) {
  describe(`Oruvyn ${scheme} contrast`, () => {
    for (const color of ['primary', 'secondary', 'tertiary'] as const) {
      for (const surface of ['primary', 'secondary'] as const) {
        it(`${color} text meets WCAG AA on ${surface} surfaces`, () => {
          expect(
            contrast(
              FONT_TOKENS.color[color][scheme],
              BACKGROUND_TOKENS[surface][scheme],
            ),
          ).toBeGreaterThanOrEqual(4.5);
        });
      }
    }

    it('solid accent buttons have readable labels in every interaction state', () => {
      for (const state of ['accent9', 'accent10', 'accent11'] as const) {
        expect(
          contrast(
            FONT_TOKENS.color.inverted[scheme],
            ACCENT_TOKENS[state][scheme],
          ),
        ).toBeGreaterThanOrEqual(4.5);
      }
    });

    it('selected navigation labels remain readable', () => {
      expect(
        contrast(
          ACCENT_TOKENS.accent11[scheme],
          ACCENT_TOKENS.tertiary[scheme],
        ),
      ).toBeGreaterThanOrEqual(4.5);
    });
  });
}
