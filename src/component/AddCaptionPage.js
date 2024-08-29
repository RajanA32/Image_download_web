import React, { useEffect, useRef, useState } from "react";

const AddCaptionPage = ({ selectedImage, setSelectedImage }) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null); // Reference to hold the Fabric.js instance
  const [fabric, setFabric] = useState(null);

  useEffect(() => {
    import("fabric").then((module) => {
      setFabric(module.fabric);
    });
  }, []);

  useEffect(() => {
    if (fabric && selectedImage) {
      const canvas = new fabric.Canvas(canvasRef.current);
      fabricRef.current = canvas; // Store the canvas instance in the ref
      canvas.setHeight(500);
      canvas.setWidth(600);

      // Load the selected image onto the canvas
      fabric.Image.fromURL(selectedImage, (img) => {
        img.set({ left: 50, top: 50, selectable: false });
        canvas.add(img).renderAll();
      });

      // Clean up on component unmount
      return () => {
        canvas.dispose();
        fabricRef.current = null; // Clear the ref on unmount
      };
    }
  }, [fabric, selectedImage]);

  const addText = () => {
    const canvas = fabricRef.current;
    if (canvas) {
      const text = new fabric.Textbox("Your caption here", {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
      });
      canvas.add(text);
    }
  };

  const downloadImage = () => {
    const canvas = fabricRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "modified_image.png";
      link.click();
    }
  };

  return (
    <div className="add-caption-page">
      <div className="canvas-area">
        <canvas ref={canvasRef} />
      </div>
      <div className="control-panel">
        <button onClick={() => setSelectedImage(null)}>Back</button>
        <button onClick={addText}>Add Caption</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default AddCaptionPage;
