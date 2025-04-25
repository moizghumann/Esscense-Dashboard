import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import DoneAll from '@mui/icons-material/DoneAll'
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict'
// CUSTOM COMPONENTS
import FlexBetween from '@/components/flexbox/FlexBetween'
// STYLED COMPONENT
import { UnseenMsgWrapper, Wrapper } from './styles'

// ===============================================================
interface ChatItemProps {
  id: string
  name: string
  time: number
  image: string
  lastMsg: string
  unseenMsg: number
  lastMsgSeen: boolean
  isLastMsgIncoming: boolean
}
// ===============================================================

export default function ChatItem(props: ChatItemProps) {
  const { name, time, image, lastMsg, unseenMsg, lastMsgSeen, isLastMsgIncoming } = props

  return (
    <Wrapper>
      <Avatar src={image} alt={name} />

      <div className="chat-info">
        <FlexBetween>
          <Typography variant="body2" fontWeight={500}>
            {name}
          </Typography>

          <Typography variant="body2" fontSize={12} color="text.secondary">
            {formatDistanceToNowStrict(new Date(time))} ago
          </Typography>
        </FlexBetween>

        <FlexBetween mt={0.5}>
          <Typography
            variant="body2"
            sx={{
              fontSize: 12,
              color: 'text.secondary',
              span: { color: 'text.primary' },
            }}
          >
            {!isLastMsgIncoming ? <span>You: </span> : null}
            {lastMsg}
          </Typography>

          {unseenMsg ? (
            <UnseenMsgWrapper>
              <Typography variant="body2" fontWeight={500} fontSize={10} lineHeight={1}>
                {unseenMsg}
              </Typography>
            </UnseenMsgWrapper>
          ) : (
            <DoneAll sx={{ fontSize: 16, color: lastMsgSeen ? 'primary.main' : 'grey.400' }} />
          )}
        </FlexBetween>
      </div>
    </Wrapper>
  )
}
