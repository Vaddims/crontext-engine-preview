import { SimulationRenderer, SimulationInspectorRenderer, Entity, Camera, Scene, Component, Rigidbody, MeshRenderer, CircleCollider, Circle, Vector, Plane, PlaneCollider, Rectangle, RectangleCollider, AreaLight, Color } from 'crontext';
import { CameraBehaviour } from './engine-components/camera-behaviour';
import { PlayerBehaviour } from './engine-components/player-behaviour';
import { Player2Behaviour } from './engine-components/player2-behavoiur';

function resize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 2;
}

export function engineExec(canvas: HTMLCanvasElement, devCanvas: HTMLCanvasElement) {
  canvas.width = devCanvas.width = 640;
  canvas.height = devCanvas.height = 360;
  
  const renderer = new SimulationRenderer(canvas);
  
  const { simulation } = renderer;
  simulation.updateOnFrameChange = true;
  const inspectorRenderer = new SimulationInspectorRenderer(devCanvas, simulation);
  inspectorRenderer.inspector.setScale(Vector.one.multiply(2))

  resize(renderer.canvas)
  resize(inspectorRenderer.canvas)

  window.addEventListener('resize', () => {
    resize(renderer.canvas)
    resize(inspectorRenderer.canvas)
  }, true);

  const camera = new Entity();
  camera.components.add(CameraBehaviour);

  const player = new Entity();
  player.name = 'Player';
  player.components.add(PlayerBehaviour);

  const player2 = new Entity();
  player2.components.add(Player2Behaviour);

  const lightSource = new Entity();
  lightSource.name = 'ls'
  lightSource.components.add(AreaLight);

  lightSource.setParent(player2)

  const obsticles: Entity[] = [];
  for (let i = 0; i < 10; i++) {
    const en = new Entity();
    en.name = `Entity ${i + 1}`;
    const mr = en.components.add(MeshRenderer);
    mr.shape = new Rectangle();
    en.components.add(RectangleCollider);
    en.transform.position = Vector.random.multiply(new Vector(8, 5));
    en.transform.scale = Vector.random.add(1).multiply(1.5);
    en.transform.angleRotation = Math.random() * 360;
    obsticles.push(en);
  }
  
  const scene = new Scene();
  scene.instantiate(player);
  scene.instantiate(player2);
  scene.instantiate(camera)

  obsticles.forEach((obsticle) => scene.instantiate(obsticle));
  
  renderer.simulation.loadScene(scene);
  inspectorRenderer.inspector.inspectEntities.push(player);
}