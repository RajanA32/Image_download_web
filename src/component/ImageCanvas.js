import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const ImageCanvas = ({ selectedImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setHeight(500);
    canvas.setWidth(800);

    // Load the selected image onto the canvas
    fabric.Image.fromURL(selectedImage, (img) => {
      img.set({ left: 50, top: 50 });
      canvas.add(img).renderAll();
    });

    // Add shape and text tools
    const addRectangle = () => {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "blue",
        width: 100,
        height: 100,
      });
      canvas.add(rect);
    };

    const addCircle = () => {
      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        radius: 50,
        fill: "green",
      });
      canvas.add(circle);
    };

    const addText = () => {
      const text = new fabric.Textbox("Edit me", {
        left: 150,
        top: 150,
        width: 200,
        fontSize: 20,
      });
      canvas.add(text);
    };

    // Add buttons to the DOM
    const addRectangleButton = document.createElement("button");
    addRectangleButton.innerHTML = "Add Rectangle";
    addRectangleButton.onclick = addRectangle;

    const addCircleButton = document.createElement("button");
    addCircleButton.innerHTML = "Add Circle";
    addCircleButton.onclick = addCircle;

    const addTextButton = document.createElement("button");
    addTextButton.innerHTML = "Add Text";
    addTextButton.onclick = addText;

    const downloadButton = document.createElement("button");
    downloadButton.innerHTML = "Download Image";
    downloadButton.onclick = () => {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited_image.png";
      link.click();
    };

    // Append buttons to the canvas container
    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.appendChild(addRectangleButton);
    canvasContainer.appendChild(addCircleButton);
    canvasContainer.appendChild(addTextButton);
    canvasContainer.appendChild(downloadButton);

    // Clean up on component unmount
    return () => {
      canvas.dispose();
      canvasContainer.innerHTML = "";
    };
  }, [selectedImage]);

  return (
    <div id="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageCanvas;
