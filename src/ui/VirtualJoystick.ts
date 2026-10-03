import type { PlayerDirection } from "player";

export interface JoystickState {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    direction: PlayerDirection | null;
    force: number;
    angle: number;
}

export class VirtualJoystick extends HTMLElement {
    public state: JoystickState = {
        up: false,
        down: false,
        left: false,
        right: false,
        direction: null,
        force: 0,
        angle: 0,
    };

    private base!: HTMLDivElement;
    private thumb!: HTMLDivElement;
    private activePointerId: number | null = null;

    private radius: number = 60;
    private innerThreshold: number = 0.2;
    private outerThreshold: number = 0.6;

    connectedCallback(): void {
        this.render();
        this.setupEvents();
    }

    private render(): void {
        const outerWalkDiameter = this.radius * 2 * this.outerThreshold;

        const style = document.createElement("style");
        style.textContent =
            ":host {" +
            "  position: fixed;" +
            "  bottom: 40px;" +
            "  left: 40px;" +
            "  z-index: 9999;" +
            "  touch-action: none;" +
            "  user-select: none;" +
            "}" +
            ".joystick-base {" +
            "  width: " +
            this.radius * 2 +
            "px;" +
            "  height: " +
            this.radius * 2 +
            "px;" +
            "  background: rgba(0, 0, 0, 0.4);" +
            "  border: 2px solid rgba(255, 255, 255, 0.2);" +
            "  border-radius: 50%;" +
            "  position: relative;" +
            "  display: flex;" +
            "  align-items: center;" +
            "  justify-content: center;" +
            "}" +
            ".joystick-walk-boundary {" +
            "  width: " +
            outerWalkDiameter +
            "px;" +
            "  height: " +
            outerWalkDiameter +
            "px;" +
            "  border: 1px dashed rgba(255, 255, 255, 0.3);" +
            "  border-radius: 50%;" +
            "  position: absolute;" +
            "  pointer-events: none;" +
            "}" +
            ".joystick-thumb {" +
            "  width: " +
            this.radius * 0.6 +
            "px;" +
            "  height: " +
            this.radius * 0.6 +
            "px;" +
            "  background: rgba(255, 255, 255, 0.8);" +
            "  box-shadow: 0 0 8px rgba(0,0,0,0.3);" +
            "  border-radius: 50%;" +
            "  position: absolute;" +
            "  pointer-events: none;" +
            "  transform: translate(0px, 0px);" +
            "  transition: background-color 0.15s ease;" +
            "}" +
            ".joystick-thumb.walking {" +
            "  background: rgba(0, 255, 150, 0.9);" +
            "}";

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(style);

        this.base = document.createElement("div");
        this.base.className = "joystick-base";

        const walkBoundary = document.createElement("div");
        walkBoundary.className = "joystick-walk-boundary";
        this.base.appendChild(walkBoundary);

        this.thumb = document.createElement("div");
        this.thumb.className = "joystick-thumb";

        this.base.appendChild(this.thumb);
        shadow.appendChild(this.base);
    }

    private setupEvents(): void {
        this.base.addEventListener("pointerdown", (e: PointerEvent) => {
            this.activePointerId = e.pointerId;
            this.base.setPointerCapture(e.pointerId);
            this.updatePosition(e);
        });

        this.base.addEventListener("pointermove", (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.updatePosition(e);
            }
        });

        const handlePointerUp = (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.reset();
            }
        };

        this.base.addEventListener("pointerup", handlePointerUp);
        this.base.addEventListener("pointercancel", handlePointerUp);
    }

    private updatePosition(e: PointerEvent): void {
        const rect = this.base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const clampedDist = Math.min(dist, this.radius);

        const thumbX = Math.cos(angle) * clampedDist;
        const thumbY = Math.sin(angle) * clampedDist;

        this.thumb.style.transform = "translate(" + thumbX + "px, " + thumbY + "px)";

        const force = clampedDist / this.radius;

        let currentDirection: PlayerDirection | null = null;
        let isUp = false;
        let isDown = false;
        let isLeft = false;
        let isRight = false;

        if (force > this.innerThreshold) {
            // Beräkna vinkel i grader (0-360)
            let deg = (angle * 180) / Math.PI;
            if (deg < 0) deg += 360;

            // Indela i 8 sektorer om 45 grader vardera (offset 22.5 grader)
            if (deg >= 337.5 || deg < 22.5) {
                currentDirection = "right";
                isRight = true;
            } else if (deg >= 22.5 && deg < 67.5) {
                currentDirection = "down-right";
                isDown = true;
                isRight = true;
            } else if (deg >= 67.5 && deg < 112.5) {
                currentDirection = "down";
                isDown = true;
            } else if (deg >= 112.5 && deg < 157.5) {
                currentDirection = "down-left";
                isDown = true;
                isLeft = true;
            } else if (deg >= 157.5 && deg < 202.5) {
                currentDirection = "left";
                isLeft = true;
            } else if (deg >= 202.5 && deg < 247.5) {
                currentDirection = "up-left";
                isUp = true;
                isLeft = true;
            } else if (deg >= 247.5 && deg < 292.5) {
                currentDirection = "up";
                isUp = true;
            } else if (deg >= 292.5 && deg < 337.5) {
                currentDirection = "up-right";
                isUp = true;
                isRight = true;
            }
        }

        const isWalking = force >= this.outerThreshold;

        if (isWalking) {
            this.thumb.classList.add("walking");
        } else {
            this.thumb.classList.remove("walking");
        }

        this.state = {
            force: force,
            angle: angle,
            direction: currentDirection,
            left: isLeft && isWalking,
            right: isRight && isWalking,
            up: isUp && isWalking,
            down: isDown && isWalking,
        };
    }

    private reset(): void {
        this.activePointerId = null;
        this.thumb.style.transform = "translate(0px, 0px)";
        this.thumb.classList.remove("walking");
        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            direction: null,
            force: 0,
            angle: 0,
        };
    }
}

if (!customElements.get("virtual-joystick")) {
    customElements.define("virtual-joystick", VirtualJoystick);
}
