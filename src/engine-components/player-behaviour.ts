import { Rigidbody, Component, Vector, Collider, MeshRenderer, Rectangle, Color, Ray, rotatedOffsetPosition } from "crontext";
import { Collision } from "crontext/dist/core/collision";
import { Gizmos } from "crontext/dist/core/gizmos";

export class PlayerBehaviour extends Component {
  meshRenderer: MeshRenderer;
  rigidbody: Rigidbody;
  moveInput = Vector.zero;
  angleInput = 0;
  lookAtLS = false;

  useNavigation = true;
  useRigidTransformation = true;
  navigationSpeed = 0.005;

  start() {
    this.meshRenderer = this.entity.components.add(MeshRenderer);
    if (this.useNavigation && this.useRigidTransformation) {
      this.rigidbody = this.entity.components.add(Rigidbody);
    }
    
    this.addEventListeners()
  }

  update() {
    this.trans();

    if (this.lookAtLS) {
      const pos = this.entity.getScene().find('ls')?.transform.position;
      if (pos) {
        this.transform.lookAt(pos);
      }
    } else {
      this.transform.angleRotation += this.angleInput;
    }
  }

  trans() {
    if (this.useNavigation) {
      if (this.useRigidTransformation) {
        this.rigidbody.acceleration = rotatedOffsetPosition(this.moveInput, this.transform.rotation);
      } else {
        this.transform.translate(this.moveInput.multiply(5))
      }
    }
  }

  addEventListeners() {
    document.addEventListener('keydown', event => {
      const key = event.key;
      
      switch(key) {
        case 'w': {
          this.moveInput = new Vector(this.moveInput.x, this.navigationSpeed);
          break;
        }

        case 's': {
          this.moveInput = new Vector(this.moveInput.x, -this.navigationSpeed);
          break;
        }

        case 'd': {
          this.moveInput = new Vector(this.navigationSpeed, this.moveInput.y);
          break;
        }

        case 'a': {
          this.moveInput = new Vector(-this.navigationSpeed, this.moveInput.y);
          break;
        }

        case 'q': {
          this.angleInput = 1;
          break;
        }

        case 'e': {
          this.angleInput = -1;
          break;
        }

        case 'r': {
          this.lookAtLS = true;
          break;
        }
      }

      event.preventDefault();
    });

    document.addEventListener('keyup', event => {
      const key = event.key;
      
      switch(key) {
        case 'w':
        case 's': {
          this.moveInput = new Vector(this.moveInput.x, 0);
          event.preventDefault();
          break;
        }

        case 'd':
        case 'a': {
          this.moveInput = new Vector(0, this.moveInput.y);
          event.preventDefault();
          break;
        }

        case 'q':
        case 'e': {
          this.angleInput = 0;
          event.preventDefault();
          break;
        }

        case 'r': {
          this.lookAtLS = false;
          break;
        }
      }
    })
  }
}
