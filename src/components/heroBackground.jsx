import { Canvas } from "@react-three/fiber";
import React from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import "./components.css";

// function Bbox() {
//   return (
//     <mesh position={[0, 2, 0]}>
//       <boxGeometry attach="geometry" />
//       <meshLambertMaterial attach="material" color="purple" />
//     </mesh>
//   );
// }
// function Plane() {
//   return (
//     <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//       <meshLambertMaterial attach="material" color="blue" />
//     </mesh>
//   );
// }

function Hero() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <Stars />
      <spotLight position={[10, 15, 10]} angle={0.3} />
    </Canvas>
  );
}

export default Hero;
