import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const { activeMenuItems, actionMenuItems } = useSelector(state => state.menu);
  const { color, size } = useSelector(state => state.toolbox[activeMenuItems]);

  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");

  //   // if(activeMenuItems === MENU_ITEMS)
  // }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig();
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseDown = e => {
      shouldDraw.current = true;
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };
    const handleMouseMove = e => {
      if (!shouldDraw.current) return;
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    };
    const handleMouseUp = e => {
      shouldDraw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
