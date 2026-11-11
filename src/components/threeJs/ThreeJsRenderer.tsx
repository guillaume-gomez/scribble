import { useRef, Suspense, useEffect, useState } from 'react';
import { useFullscreen } from "rooks";
import { Group, MathUtils } from "three";
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, Stage, Grid, Stats, Gltf, Text, CameraControls } from '@react-three/drei';
import FallBackLoader from "./FallBackLoader";

import { SketchMaterial, INK, PAPER } from './sketch/SketchMaterial';
import { SketchOutline } from './sketch/SketchOutline';
import { SketchShadow } from './sketch/SketchShadow';
import SketchModel from "./sketch/SketchModel";
import { PaperPlane } from './sketch/PaperPlane';

const { BASE_URL, MODE } = import.meta.env;


interface ThreeJsRendererProps {
}

function ThreejsRenderer({} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
  } = useFullscreen({ target: canvasContainerRef });
  const groupRef = useRef<Group|null>(null);
  const [sketchColor, setSketchColor] = useState<string>("#101A91");
  const [outlineColor, setOutlineColor] = useState<string>("#FF1A91");

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
          shadows
          flat
        >
          { import.meta.env.MODE === "development" ? <Stats/> : <></> }
          <ambientLight intensity={1.0} />
          <Suspense fallback={<FallBackLoader/>}>
            <Stage adjustCamera={false} intensity={1} shadows="contact" environment="city">
              <directionalLight castShadow position={[-5, 8, 4.5]} />

                <group ref={groupRef}>

                  <mesh
                    castShadow
                    position={[0, 1.5, 0]}
                  >
                    <boxGeometry />
                    <SketchMaterial color={sketchColor} density={22} pressure={0.7} />
                    <SketchOutline color={outlineColor} width={1.7} />
                  </mesh>


                  <mesh
                    castShadow
                    position={[1.5, 1.75, 2]}
                  >
                    <sphereGeometry />
                    <SketchMaterial color={sketchColor} density={22} pressure={0.7} />
                    <SketchOutline color={outlineColor} width={1.7} />
                  </mesh>

                  <Gltf 
                    castShadow
                    src={`${BASE_URL}White Eraser by Jarlan Perez - fzDp9g3m6bm.glb`}
                    scale={10}
                    position={[2, 2, 0]}
                    rotation={[ 0, 0, 0]}
                  >
                  </Gltf>
 
                  <SketchModel
                    url={`${BASE_URL}White Eraser by Jarlan Perez - fzDp9g3m6bm.glb`}
                    scale={10}
                    position={[5, 2, 0]}
                    material={<SketchMaterial color={sketchColor} density={22} pressure={0.7} />}
                    outline={<SketchOutline color={outlineColor} width={1.7} />}
                  />

                  <Gltf 
                    castShadow
                    src={`${BASE_URL}alice_v2_robe_noire.glb`}
                    scale={5}
                    position={[2, 5, 0]}
                    rotation={[ 0, 0, 0]}
                  >
                  </Gltf>

                  <SketchModel
                    url={`${BASE_URL}alice_v2_robe_noire.glb`}
                    scale={5}
                    position={[8, 2, 0]}
                    material={<SketchMaterial color={sketchColor} density={22} pressure={0.7} />}
                    outline={<SketchOutline color={outlineColor} width={0.5} />}
                  />

                </group>

                <PaperPlane
                  y={-0.05}
                  tint={PAPER}
                  strength={1}
                  contrast={1}
                  repeat={1}
                  rotation={MathUtils.degToRad(0)}
                  size={20}
                  fade={0.35}
                />


              { MODE === "development" &&
                <Grid args={[60, 60]} position={[0,0,0]} cellColor='white' />
              }
              <SketchShadow />
            </Stage>
          </Suspense>
          { MODE === "development" &&
            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
          }
          <CameraControls />
        </Canvas>
      </div>
    </div>
  );
}

export default ThreejsRenderer;