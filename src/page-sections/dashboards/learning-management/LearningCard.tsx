import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { styled, alpha } from '@mui/material/styles'
import { SvgIconComponent } from '@mui/icons-material'
// CUSTOM COMPONENTS
import FlexRowAlign from '@/components/flexbox/FlexRowAlign'
// CUSTOM UTILS METHOD
import { currency } from '@/utils/currency'

// STYLED COMPONENT
const StyledCard = styled(Card)({
  gap: '1rem',
  height: '100%',
  display: 'flex',
  padding: '1.5rem',
  alignItems: 'center',
})

// ==============================================================
interface Props {
  card: {
    title: string
    price: number
    color: string
    Icon: SvgIconComponent
  }
}
// ==============================================================

export default function LearningCard({ card }: Props) {
  const { Icon, title, color, price } = card

  const { t } = useTranslation()

  return (
    <StyledCard>
      <FlexRowAlign width={45} height={45} borderRadius={2} bgcolor={alpha(color, 0.1)}>
        <Icon sx={{ color }} />
      </FlexRowAlign>

      <div>
        <Typography variant="body2" lineHeight={1.7} fontWeight={500}>
          {t(title)}
        </Typography>

        <Typography variant="h6" fontWeight={500} color={color}>
          {currency(price)}
        </Typography>
      </div>
    </StyledCard>
  )
}
