import React, {useState, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import {Delete} from '@mui/icons-material'
import {Box,Fab} from '@material-ui/core'


const OwaspGrid = (props) => {
    const [tableData, setTableData] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    const query = { query: "g.V().hasLabel('OWASP Risk').elementMap()" }
    const l_width = 400;
    const m_width = 200;
    const s_width = 100;

    const columns = [
        {field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            renderCell: (params)=>{

                const delRow = ()=>{
                    console.log(params.id);
                    let newData = [...tableData];

                    const indexOfObject = newData.findIndex(object => {
                        return object.id === params.id;
                    });

                    newData.splice(indexOfObject, 1);
                    setTableData(newData);
                }

                return(
                    <Box>
                        <Fab size='small' onClick={delRow}>
                            <Delete/>
                        </Fab>
                    </Box>
                );
            }
        },
        {field: 'id', headerName: 'ID', width: s_width},
        {field: 'label', headerName: 'Label', width: m_width},
        {field: 'name', headerName: 'Name', width: m_width, editable: true},
        {field: 'link', headerName: 'Link', width: m_width, editable: true},
        {field: 'description', headerName: 'Description', width: l_width, editable: true},
    ];


    useEffect(() => {
        fetch('https://vvsy0a3l1a.execute-api.us-east-1.amazonaws.com/demo/neptune',
        {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify(query)
        })
        .then( (data) => data.json() )
        .then( (data) => setTableData(data) )
    },[]);

    const handleEvent = (params, event, details)=>{
        console.log(params);
        props.setOwasp(params.row);
    } 

    return (
        <div style={{ height: '400', width: '100%' }}>
            <DataGrid
                experimentalFeatures={{ newEditingApi: true }} 
                disableMultipleSelection={true}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                rows={tableData}
                columns={columns}
                onRowClick={handleEvent}
            />
        </div>
    )
}

export default OwaspGrid;
