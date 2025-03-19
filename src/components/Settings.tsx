import { useEffect, useState } from "react";
function Settings({canvas}){
   const [selectedObject,setSelectedObject] = useState(null);
   const [width,setWidth] = useState("");
   const [height,setHeight] = useState("");
   const [diameter,setDiameter] = useState("");
   const [color,setColor] = useState("");

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
  
  

  return(
    <>Test</>
  ) 
   
}

export default Settings;