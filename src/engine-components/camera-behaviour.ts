import { Camera, Color, Component, Entity, lerp, Vector } from "crontext";

export class CameraBehaviour extends Component {
  public camera: Camera;
  public player: Entity;

  start() {
    this.entity.name = 'Camera';
    this.camera = this.entity.components.add(Camera);
    this.camera.background = new Color(112, 128, 144);
    this.player = this.entity.getScene().find('Player')!;
    this.transform.scale = this.transform.scale.multiply(1);
  }

  update() {
    this.transform.position = Vector.lerp(this.transform.position, this.player.transform.position, 0.9);
    this.transform.rotation = lerp(this.transform.rotation, this.player.transform.rotation, 0.9);
  }
}