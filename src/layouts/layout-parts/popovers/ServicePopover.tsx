import { Fragment } from 'react'
// MUI
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import PopoverLayout from './_PopoverLayout'
import FlexBox from '@/components/flexbox/FlexBox'
// CUSTOM ICON COMPONENT
import Apps from '@/icons/duotone/Apps'
// DUMMY DATA SET
import { SERVICES } from '@/data/services'

export default function ServicePopover() {
  const SELECT_BUTTON = (
    <Badge color="error" badgeContent={0}>
      <Apps sx={{ color: 'grey.400', fontSize: 18 }} />
    </Badge>
  )

  return (
    <Fragment>
      <PopoverLayout
        showMoreButton={false}
        title="Web apps & services"
        selectButton={SELECT_BUTTON}
        renderContent={() =>
          SERVICES.map((service) => (
            <ListItem
              key={service.id}
              body={service.body}
              image={service.image}
              title={service.title}
            />
          ))
        }
      />
    </Fragment>
  )
}

// ==============================================================
interface ListItemProps {
  body: string
  image: string
  title: string
}

function ListItem({ body, image, title }: ListItemProps) {
  return (
    <FlexBox
      sx={{
        gap: 2,
        padding: 2,
        cursor: 'pointer',
        alignItems: 'center',
        '&:hover': { backgroundColor: 'action.hover' },
      }}
    >
      <Avatar src={image} alt={title} sx={{ width: 35, height: 35 }} />

      <div>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>

        <Typography variant="body2" fontSize={12} color="text.secondary">
          {body}
        </Typography>
      </div>
    </FlexBox>
  )
}
