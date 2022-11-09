import React, {useState, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import {Delete} from '@mui/icons-material'
import {Box,Fab} from '@material-ui/core'


const ControlGrid = (props) => {
    const [tableData, setTableData] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    const query = { query: "g.V().hasLabel('Control').elementMap()" }
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
        {field: 'service', headerName: 'Service', width: m_width, editable: true},
        {field: 'ControlPhase', headerName: 'Phase', width: m_width, editable: true},
        {field: 'ControlCategory', headerName: 'Category', width: m_width, editable: true},
        {field: 'RiskRating', headerName: 'Risk', width: m_width, editable: true,
            type: "singleSelect",
            valueOptions: ["1 - Low", "2 - Medium", "3 - High", "4 - Critical"]},
        {field: 'link', headerName: 'Link', width: m_width, editable: true},
        {field: 'ControlRequirement', headerName: 'Requirement', width: l_width, editable: true},
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
        props.setControl(params.row);
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

export default ControlGrid;
