export interface JoystickState {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    direction: "left" | "right" | "up" | "down" | null;
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

    // Ökad radie för ett större område (tidigare 40px, nu 60px)
    private radius: number = 60;

    // Inställningar för zonerna (0.0 - 1.0)
    private innerThreshold: number = 0.2; // Minsta drag för att ändra riktning
    private outerThreshold: number = 0.6; // Krävs 70% drag utåt för att karaktären ska gå

    connectedCallback(): void {
        this.render();
        this.setupEvents();
    }

    private render(): void {
        const innerRingDiameter = this.radius * 2 * this.innerThreshold;
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
            "/* Visuell gränslinje för var gå-zonen startar */" +
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
            "/* Ändrar färg på knoppen när man kliver ut i gå-zonen */" +
            ".joystick-thumb.walking {" +
            "  background: rgba(0, 255, 150, 0.9);" +
            "}";

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(style);

        this.base = document.createElement("div");
        this.base.className = "joystick-base";

        // Markering för gå-gränsen
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

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Bestäm riktning om man dragit utanför minsta inre dödzon (15%)
        let currentDirection: "left" | "right" | "up" | "down" | null = null;
        if (force > this.innerThreshold) {
            if (Math.abs(cos) > Math.abs(sin)) {
                currentDirection = cos > 0 ? "right" : "left";
            } else {
                currentDirection = sin > 0 ? "down" : "up";
            }
        }

        const isWalking = force >= this.outerThreshold;

        // Visuell feedback: ändra färg när spelaren kliver in i gå-zonen
        if (isWalking) {
            this.thumb.classList.add("walking");
        } else {
            this.thumb.classList.remove("walking");
        }

        this.state = {
            force: force,
            angle: angle,
            direction: currentDirection,
            // Gå-flaggor triggas endast i det yttre området (de sista 30%)
            left: currentDirection === "left" && isWalking,
            right: currentDirection === "right" && isWalking,
            up: currentDirection === "up" && isWalking,
            down: currentDirection === "down" && isWalking,
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
