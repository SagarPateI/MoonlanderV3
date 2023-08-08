import React from "react";
import { useBox } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "./useKeyControls";
import { Vector3 } from "three";
//import * as THREE from "/node_modules/three/build/three.module.js";

const SPEED = 1;

export function Block(props) {
  const { camera } = useThree(); // Access the camera from useThree
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    moveUp
  } = useKeyboardControls();

  const [ref, api] = useBox(() => ({
    mass: 15200, // Set the mass to match the Apollo moon lander's weight
    position: [props.position[0], props.position[1] + 0.01, props.position[2]], // Raise the initial position
    args: [1, 1, 1],
    linearDamping: 0.1 // Adjust linear damping to control motion
  }));
  const velocity = React.useRef([0, 0, 0]);
  React.useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  // useFrame(() => {

  //   const direction = new Vector3();
  //   const frontVector = new Vector3(
  //     0,
  //     0,
  //     Number(moveBackward) - Number(moveForward)
  //   );
  //   const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
  //   direction
  //     .subVectors(frontVector, sideVector)
  //     .normalize()
  //     .multiplyScalar(SPEED)
  //     .applyEuler(camera.rotation);

  //   api.velocity.set(direction.x, 0, direction.z);
  //   ref.current.getWorldPosition(ref.current.position);
  // });

  useFrame(() => {
    const tiltAmount = 0.02; // Adjust the tilt amount as needed
    const rotation = ref.current.rotation;

    if (moveForward || moveBackward || moveLeft || moveRight) {
      if (moveForward) rotation.x = tiltAmount;
      if (moveBackward) rotation.x = -tiltAmount;
      if (moveLeft) rotation.z = tiltAmount;
      if (moveRight) rotation.z = -tiltAmount;
    } else {
      rotation.x = 0;
      rotation.z = 0;
    }

    if (moveUp) {
      // Apply an upward force when spacebar is pressed
      api.applyImpulse([0, 1000, 0], [0, 0, 0]);
    }

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    );
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, 0, direction.z);
    ref.current.getWorldPosition(ref.current.position);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="purple" />
    </mesh>
  );
}
