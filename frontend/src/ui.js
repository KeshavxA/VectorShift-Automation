import { useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { NoteNode } from './nodes/noteNode';
import { FilterNode } from './nodes/filterNode';
import { DatabaseNode } from './nodes/databaseNode';
import { AuthNode } from './nodes/authNode';
import { LoggerNode } from './nodes/loggerNode';
import uiStyles from './ui.module.css';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  note: NoteNode,
  filter: FilterNode,
  database: DatabaseNode,
  auth: AuthNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setReactFlowInstance: state.setReactFlowInstance,
  deleteSelectedNodes: state.deleteSelectedNodes,
  reactFlowInstance: state.reactFlowInstance,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      setReactFlowInstance,
      deleteSelectedNodes,
      reactFlowInstance,
    } = useStore(selector, shallow);

    const onInit = useCallback(
      (instance) => {
        setReactFlowInstance(instance);
      },
      [setReactFlowInstance]
    );

    useEffect(() => {
      const onKeyDown = (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && !e.target.closest('input, textarea')) {
          e.preventDefault();
          deleteSelectedNodes();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [deleteSelectedNodes]);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            if (!reactFlowInstance) return;
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className={uiStyles.canvasWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={onInit}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                className={uiStyles.reactFlowContainer}
            >
                <Background 
                    color="#b0bec5" 
                    gap={gridSize} 
                    size={1}
                    className={uiStyles.backgroundPattern}
                />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
