import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

interface LineData {
    id: number;
    points: number[];
}

interface LabelData {
    id: number;
    x: number;
    y: number;
    text: string;
}

const Canvas: React.FC = () => {
    const [lines, setLines] = useState<LineData[]>([]);
    const [labels, setLabels] = useState<LabelData[]>([]);
    const [drawing, setDrawing] = useState<boolean>(false);
    const [newLabel, setNewLabel] = useState<string>("A");
    const stageRef = useRef<any>(null);

    // Handle Line Drawing
    const handleMouseDown = (e: any) => {
        if (drawing) return;
        setDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { id: lines.length, points: [pos.x, pos.y, pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: any) => {
        if (!drawing) return;
        const pos = e.target.getStage().getPointerPosition();
        setLines(lines.map((line, i) =>
            i === lines.length - 1 ? { ...line, points: [line.points[0], line.points[1], pos.x, pos.y] } : line
        ));
    };

    const handleMouseUp = () => {
        setDrawing(false);
    };

    // Handle Label Placement
    const handleLabelClick = (e: any) => {
        const pos = e.target.getStage().getPointerPosition();
        setLabels([...labels, { id: labels.length, x: pos.x, y: pos.y, text: newLabel }]);
        setNewLabel(String.fromCharCode(newLabel.charCodeAt(0) + 1)); // Auto-increment label (A, B, C...)
    };

    // Clear the canvas
    const clearCanvas = () => {
        setLines([]);
        setLabels([]);
        setNewLabel("A");
    };

    return (
        <div className="p-4 bg-gray-100 rounded">
            <h4 className="text-lg font-bold mb-2">Rod Bending Figure</h4>
            <div className="mb-2">
                <button className="btn btn-primary mr-2" onClick={() => setDrawing(false)}>Stop Drawing</button>
                <button className="btn btn-secondary mr-2" onClick={handleLabelClick}>Add Label</button>
                <button className="btn btn-danger" onClick={clearCanvas}>Clear</button>
            </div>

            {/* <Stage
                ref={stageRef}
                width={500}
                height={300}
                className="border bg-white"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    {lines.map((line) => (
                        <Line key={line.id} points={line.points} stroke="black" strokeWidth={2} />
                    ))}
                    {labels.map((label) => (
                        <Text key={label.id} x={label.x} y={label.y} text={label.text} fontSize={16} fill="red" draggable />
                    ))}
                </Layer>
            </Stage> */}

<Stage
    ref={stageRef}
    width={500}
    height={300}
    className="border bg-white"
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    options={{ renderType: "canvas" }} // Forces Canvas Rendering
>
    <Layer>
        {lines.map((line) => (
            <Line key={line.id} points={line.points} stroke="black" strokeWidth={2} />
        ))}
        {labels.map((label) => (
            <Text key={label.id} x={label.x} y={label.y} text={label.text} fontSize={16} fill="red" draggable />
        ))}
    </Layer>
</Stage>



        </div>
    );
};

export default Canvas;
