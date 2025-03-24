import { FormControl, FormLabel, Input } from "@mui/material";
// import Input from "@mui/material";
import { useEffect, useState } from "react";
import fabric from 'fabric'
// import {Input} from "blocksin-system"

function Settings({ canvas }) {
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (event) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:updated", (event) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        clearSettings();
      });
      canvas.on("object:modified", (event) => {
        handleObjectSelection(event.target);
      });
      canvas.on("object:scaling", (event) => { // Fixed syntax here
        handleObjectSelection(event.target);
      });
    }
  }, [canvas]); // Fixed misplaced closing bracket


  const handleObjectSelection = (object) => {
    if (!object) return;
    setSelectedObject(object);

    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX)); // Fixed missing closing `))`
      setHeight(Math.round(object.height * object.scaleY)); // Fixed missing closing `))`
      setColor(object.fill);
      setDiameter(""); // Fixed `IsetDiameter` typo
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX)); // Fixed missing closing `))`
      setColor(object.fill);
      setWidth("");
      setHeight("");
    }
  };

  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setColor("");
    setDiameter("");
  };
  const handleWidthChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setWidth(intValue);
  
    if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      canvas.renderAll();
    }
  };
  


  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setHeight(intValue);
  
    if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      canvas.renderAll();
    }
  };
  


  const handleDiameterChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setDiameter(intValue);

    if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
      canvas.renderAll();
    }
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);

    if (selectedObject) {
      selectedObject.set({ fill: value });
      canvas.renderAll();
    }
  };




  return (
    <div className="Settings">
    {/* Show width and height inputs for rectangles */}
    {selectedObject && selectedObject.type === "rect" && (
      <>
        <FormControl variant="standard" fullWidth>
          <FormLabel style={{ color: "white", fontSize:'13px' }}>Width</FormLabel>
          <Input placeholder="Width" value={width} onChange={handleWidthChange} />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <FormLabel style={{ color: "white",fontSize:'13px'  }}>Height</FormLabel>
          <Input placeholder="Height" value={height} onChange={handleHeightChange} />
        </FormControl>
      </>
    )}

    {/* Show diameter input for circles */}
    {selectedObject && selectedObject.type === "circle" && (
      <FormControl variant="standard" fullWidth>
        <FormLabel style={{ color: "white",fontSize:'13px' }}>Diameter</FormLabel>
        <Input placeholder="Diameter" value={diameter} onChange={handleDiameterChange} />
      </FormControl>
    )}

    {/* Show color input for all selected objects */}
    {selectedObject && (
      <FormControl variant="standard" fullWidth>
        <FormLabel style={{ color: "white",fontSize:'13px'  }}>Color</FormLabel>
        <Input placeholder="Color" type="color" value={color} onChange={handleColorChange} />
      </FormControl>
    )}
  </div>
  )

}

export default Settings;