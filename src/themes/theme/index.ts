// project import
import Default from './default';

//assets
import { PalettesProps } from '@ant-design/colors';

// types
import { PaletteThemeProps } from 'types/theme';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

export default function Theme(colors: PalettesProps): PaletteThemeProps {
  return Default(colors);
}
