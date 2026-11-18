import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { VIEW } from "./config";
export function Camera() {
  const camera = useThree((s) => s.camera);
  useLayoutEffect(() => {
    camera.lookAt(...VIEW.target);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}
