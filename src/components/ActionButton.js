import React from 'react'
import {Delete} from '@mui/icons-material'
import {Box,Fab} from '@material-ui/core'

const ActionButton = (clickButton, rowData) => {

  const deleteRow = ()=>{
    console.log('in deleteRow: '+ rowData );
    clickButton(rowData);
  }

  return (
    <Box>
        <Fab size='small' color='secondary' onClick={deleteRow}>
            <Delete/>
        </Fab>
    </Box>
  )
}

export default ActionButton