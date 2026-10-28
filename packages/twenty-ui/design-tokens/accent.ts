import { token } from './token';

const ACCENT_SCALE = {
  accent1: token({ light: '#F5FCFA', dark: '#0E211F' }),
  accent2: token({ light: '#EDF8F5', dark: '#112C29' }),
  accent3: token({ light: '#DEF2EC', dark: '#153A34' }),
  accent4: token({ light: '#CCEAE2', dark: '#19483F' }),
  accent5: token({ light: '#B5DFD5', dark: '#20584C' }),
  accent6: token({ light: '#98D1C5', dark: '#286B5C' }),
  accent7: token({ light: '#71BAAD', dark: '#318671' }),
  accent8: token({ light: '#469C92', dark: '#3CA58C' }),
  accent9: token({ light: '#247D78', dark: '#45D6BB' }),
  accent10: token({ light: '#1E6C68', dark: '#68E0C9' }),
  accent11: token({ light: '#1C6863', dark: '#81E7D2' }),
  accent12: token({ light: '#124A48', dark: '#D3F8EE' }),
};

export const ACCENT_TOKENS = {
  primary: ACCENT_SCALE.accent5,
  secondary: ACCENT_SCALE.accent5,
  tertiary: ACCENT_SCALE.accent3,
  quaternary: ACCENT_SCALE.accent2,
  accent3570: ACCENT_SCALE.accent8,
  accent4060: ACCENT_SCALE.accent8,
  ...ACCENT_SCALE,
};
