import ThreeJsRenderer from "./components/threeJs/ThreeJsRenderer";

function App() {
  return (
    <div>
      <div>Scribble test</div>
      <div style={{ width: 800, height:800 }}>
        <ThreeJsRenderer />
      </div>
    </div>
  )
}

export default App
