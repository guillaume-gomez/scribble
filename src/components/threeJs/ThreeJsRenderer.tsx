import { useRef, Suspense, useEffect, useState } from 'react';
import { useFullscreen } from "rooks";
import { Group } from "three";
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, Stage, Grid, Stats, Gltf, Text } from '@react-three/drei';
import FallBackLoader from "./FallBackLoader";

const AnimatedGltf = animated(Gltf);

const { BASE_URL, MODE } = import.meta.env;


interface ThreeJsRendererProps {
}



function ThreejsRenderer({} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
  } = useFullscreen({ target: canvasContainerRef });
  const groupRef = useRef<Group|null>(null);


  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div ref={canvasContainerRef}
        className="hover:cursor-grabbing w-full h-full /*bg-secondary*/ bg-gradient-to-b from-sky-100 to-sky-500  rounded-xl"
      >
        <Canvas
          camera={{ position: [50,10, 20], fov: 75, far: 200 }}
          dpr={window.devicePixelRatio}
          shadows
          onDoubleClick={() => {
            toggleFullscreen();
          }}
        >
          { import.meta.env.MODE === "development" ? <Stats/> : <></> }
          <ambientLight intensity={1.0} />
          <Suspense fallback={<FallBackLoader/>}>
            <Stage adjustCamera={false} intensity={1} shadows="contact" environment="city">
               <Suspense fallback={<FallBackLoader/>}>
                <group ref={groupRef}>
                </group>
              </Suspense>

              { MODE === "development" &&
                <Grid args={[60, 60]} position={[0,0,0]} cellColor='white' />
              }
            </Stage>
          </Suspense>
          { MODE === "development" &&
            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
          }
        </Canvas>
      </div>
    </div>
  );
}

export default ThreejsRenderer;