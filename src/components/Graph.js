import { useState, useEffect } from 'react'
import ForceGraph2D from 'react-force-graph-2d';

const Graph = (props) => {
  const [graphData, setGraphData] = useState({nodes:[], links:[]});

  const edgeDir = {'Control':'out', 'OWASP Risk':'in', 'Sub-Technique':'in'};
  const query = { 
                  "params": { 
                    "dir": edgeDir[props.graphEntity['label']], 
                    "eid": "remediates",
                    "vid": props.graphEntity['id'] 
                  } 
                }

  const colors = {
    'Control': 7,
    'OWASP Risk': 5,
    'Sub-Technique': 10
  };

  const nodeSelect = (node,event)=>{
    console.log(node);
    //props.setGraphEntity(node);
  }

  useEffect(() => {
    fetch('https://vvsy0a3l1a.execute-api.us-east-1.amazonaws.com/demo/graph',
    {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify(query)
    })
    .then( (data) => data.json() )
    .then( (data) => setGraphData(data) )
},[props.graphEntity]);

  return (
      <ForceGraph2D
        nodeAutoColorBy={d => colors[d.name]}
        height={350}
        graphData={graphData}
        nodeRelSize={8}
        onNodeClick={nodeSelect}

        nodeCanvasObject = { (node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 24/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}

      />
  )
}

export default Graph