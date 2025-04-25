import { Components } from '@mui/material/styles'
import { treeItemClasses } from '@mui/x-tree-view/TreeItem'

export const TreeItem = (): Components['MuiTreeItem'] => ({
  styleOverrides: {
    root: {
      [`.${treeItemClasses.content}`]: {
        borderRadius: 4,
      },
    },
  },
})
