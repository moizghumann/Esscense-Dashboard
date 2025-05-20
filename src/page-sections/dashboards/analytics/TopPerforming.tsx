import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import Scrollbar from '@/components/scrollbar'
// CUSTOM UTILS METHOD
import { format } from '@/utils/currency'
// STYLED COMPONENTS
import { HeadTableCell, BodyTableCell } from './styles'
import { useTopPerformingSites } from '@/hooks/useTopPermormingSites'

export default function TopPerforming() {
  const { data: TOP_PERFORMING = [] } = useTopPerformingSites()
  return (
    <Card sx={{ padding: 3, pb: 1 }}>
      <Box mb={3}>
        <Typography variant="body2" fontSize={18} fontWeight={500}>
          Top performing pages
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Counted in Millions
        </Typography>
      </Box>

      <Scrollbar>
        <Table sx={{ minWidth: 470 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>PAGES</HeadTableCell>
              <HeadTableCell>CLICKS</HeadTableCell>
              <HeadTableCell align="center">VIEWS</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {TOP_PERFORMING.map((item) => (
              <TableRow key={item.id}>
                <BodyTableCell>{item.page}</BodyTableCell>

                <BodyTableCell>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      span: {
                        marginInlineStart: 1,
                        color: item.click2 > 0 ? 'success.main' : 'error.main',
                      },
                    }}
                  >
                    {format(item.click)}{' '}
                    <span>
                      {item.click2 > 0 && '+'}
                      {item.click2}
                    </span>
                  </Typography>
                </BodyTableCell>

                <BodyTableCell align="center">{item.views}</BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  )
}
