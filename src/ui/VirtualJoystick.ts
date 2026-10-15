import type { JoystickState } from "types";

export class VirtualJoystick extends HTMLElement {
    public state: JoystickState = {
        up: false,
        down: false,
        left: false,
        right: false,
        jump: false,
        primaryAction: false,
        secondaryAction: false,
        angle: 0,
        force: 0,
        isInnerRing: false,
    };

    private base!: HTMLDivElement;
    private thumb!: HTMLDivElement;
    private activePointerId: number | null = null;
    private radius: number = 150;

    connectedCallback(): void {
        this.render();
        this.setupEvents();
    }

    private render(): void {
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
            :host {
                position: fixed;
                bottom: 24px;
                left: 24px;
                touch-action: none;
                user-select: none;
                z-index: 1000;
            }
            .joystick-base {
                width: ${this.radius}px;
                height: ${this.radius}px;
                background: rgba(0, 0, 0, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .joystick-thumb {
                width: ${this.radius * 0.3}px;
                height: ${this.radius * 0.3}px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                position: absolute;
                pointer-events: none;
                transform: translate(0px, 0px);
            }
                .joystick-inner-ring {
                width: ${this.radius * 0.6}px;
                height: ${this.radius * 0.6}px;
                border: 1px dashed rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                position: absolute;
                pointer-events: none;
            }
        `;

        this.base = document.createElement("div");
        this.base.className = "joystick-base";

        const innerRing = document.createElement("div");
        innerRing.className = "joystick-inner-ring";

        this.thumb = document.createElement("div");
        this.thumb.className = "joystick-thumb";

        this.base.appendChild(innerRing);
        this.base.appendChild(this.thumb);
        shadow.appendChild(style);
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

        const resetHandler = (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.reset();
            }
        };

        this.base.addEventListener("pointerup", resetHandler);
        this.base.addEventListener("pointercancel", resetHandler);
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
        const innerRingThreshold = 0.4; // 40% av radien är den inre ringen
        const isInner = force <= innerRingThreshold;

        this.state = {
            left: dx < -this.radius * 0.1,
            right: dx > this.radius * 0.1,
            up: dy < -this.radius * 0.1,
            down: dy > this.radius * 0.1,
            jump: false,
            primaryAction: false,
            secondaryAction: false,
            angle: angle,
            force: isInner ? 0 : force,
            isInnerRing: isInner,
        };
    }

    private reset(): void {
        this.activePointerId = null;
        this.thumb.style.transform = "translate(0px, 0px)";
        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            jump: false,
            primaryAction: false,
            secondaryAction: false,
            angle: 0,
            force: 0,
            isInnerRing: false,
        };
    }
}

if (!customElements.get("virtual-joystick")) {
    customElements.define("virtual-joystick", VirtualJoystick);
}
