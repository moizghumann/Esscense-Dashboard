import { useNavigate } from 'react-router'
// MUI
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'

// ==============================================================
interface Props {
  title: string
  image: string
  link: string
}
// ==============================================================

export default function ComponentPreviewCard({ title, image, link }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      sx={(theme) => ({
        border: 1,
        boxShadow: 0,
        borderRadius: 3,
        borderColor: theme.palette.grey[100],
        ...theme.applyStyles('dark', { borderColor: theme.palette.grey[700] }),
      })}
    >
      <CardActionArea disableRipple onClick={() => navigate(link)}>
        <CardMedia
          alt={title}
          height="150"
          image={image}
          component="img"
          sx={(theme) => ({
            padding: 2,
            backgroundColor: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
              opacity: 0.5,
              backgroundColor: theme.palette.grey[900],
            }),
          })}
        />

        <CardContent sx={{ textAlign: 'center', fontWeight: 600, fontSize: 13 }}>
          {title}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
