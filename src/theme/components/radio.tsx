import { Components } from '@mui/material/styles'
import { svgIconClasses } from '@mui/material/SvgIcon'
// CUSTOM ICON COMPONENTS
import RadioButtonIcon from '@/icons/RadioButtonIcon'
import RadioButtonChecked from '@/icons/RadioButtonChecked'

// ==============================================================
declare module '@mui/material/Radio' {
  interface RadioPropsSizeOverrides {
    large: true
  }
}
// ==============================================================

export const Radio = (): Components['MuiRadio'] => ({
  defaultProps: {
    icon: <RadioButtonIcon />,
    checkedIcon: <RadioButtonChecked />,
  },
  styleOverrides: {
    root: { padding: 6 },
  },
  variants: [
    {
      props: {
        size: 'large',
      },
      style: {
        [`.${svgIconClasses.root}`]: {
          fontSize: '1.75rem',
        },
      },
    },
  ],
})
