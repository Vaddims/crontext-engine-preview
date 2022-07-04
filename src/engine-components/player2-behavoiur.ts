import { Rigidbody, Component, Vector, MeshRenderer } from "crontext";

export class Player2Behaviour extends Component {
  // meshRenderer: MeshRenderer;
  rigidbody: Rigidbody;
  moveInput = Vector.zero;

  useNavigation = true;
  useRigidTransformation = true;
  navigationSpeed = 0.005;

  start() {
    // this.meshRenderer = this.entity.components.add(MeshRenderer);
    if (this.useNavigation && this.useRigidTransformation) {
      this.rigidbody = this.entity.components.add(Rigidbody);
    }

    this.addEventListeners()
  }

  update() {
    this.trans();
  }

  trans() {
    if (this.useNavigation) {
      if (this.useRigidTransformation) {
        this.rigidbody.acceleration = this.moveInput;
      } else {
        this.transform.translate(this.moveInput.multiply(5))
      }
    }
  }

  addEventListeners() {
    document.addEventListener('keydown', event => {
      const key = event.key;
      
      switch(key) {
        case 'ArrowUp': {
          this.moveInput = new Vector(this.moveInput.x, this.navigationSpeed);
          event.preventDefault();
          break;
        }

        case 'ArrowDown': {
          this.moveInput = new Vector(this.moveInput.x, -this.navigationSpeed);
          event.preventDefault();
          break;
        }

        case 'ArrowRight': {
          this.moveInput = new Vector(this.navigationSpeed, this.moveInput.y);
          event.preventDefault();
          break;
        }

        case 'ArrowLeft': {
          this.moveInput = new Vector(-this.navigationSpeed, this.moveInput.y);
          event.preventDefault();
          break;
        }
      }
    });

    document.addEventListener('keyup', event => {
      const key = event.key;
      
      switch(key) {
        case 'ArrowUp':
        case 'ArrowDown': {
          this.moveInput = new Vector(this.moveInput.x, 0);
          event.preventDefault();
          break;
        }

        case 'ArrowLeft':
        case 'ArrowRight': {
          this.moveInput = new Vector(0, this.moveInput.y);
          event.preventDefault();
          break;
        }
      }
    })
  }
}