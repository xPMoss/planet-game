export interface MobileInputState {
    left: boolean;
    right: boolean;
    up: boolean;
}

export class MobileControls {
    private container: HTMLElement | null;
    public state: MobileInputState = {
        left: false,
        right: false,
        up: false,
    };

    constructor() {
        this.container = document.getElementById('mobile-controls');
        this.render();
        this.setupEvents();
    }

    private render(): void {
        if (!this.container) return;

        this.container.className =
            'absolute bottom-0 w-full flex justify-between items-center text-4xl p-4 pointer-events-none z-10';


        this.container.innerHTML = `
      <button id="btn-left" class="w-16 h-16 rounded-full bg-blue-950 text-white cursor-pointer flex items-center justify-center active:scale-90 transition-all pointer-events-auto select-none">
        <i class="bi bi-caret-left"></i>
      </button>
      <button id="btn-jump" class="w-16 h-16 rounded-full bg-blue-950 text-white cursor-pointer flex items-center justify-center active:scale-90 transition-all pointer-events-auto select-none">
        <i class="bi bi-caret-up pb-2"></i>
      </button>
      <button id="btn-right" class="w-16 h-16 rounded-full bg-blue-950 text-white cursor-pointer flex items-center justify-center active:scale-90 transition-all pointer-events-auto select-none">
        <i class="bi bi-caret-right"></i>
      </button>
    `;

    }

    private setupEvents(): void {
        this.bindButton('btn-left', 'left');
        this.bindButton('btn-right', 'right');
        this.bindButton('btn-jump', 'up');
    }

    private bindButton(id: string, key: keyof MobileInputState): void {
        const btn = document.getElementById(id);
        if (!btn) return;

        // Hantera touch- och mus-events för mobil och desktop-test
        const startPress = (e: Event) => {
            e.preventDefault();
            this.state[key] = true;
        };

        const endPress = (e: Event) => {
            e.preventDefault();
            this.state[key] = false;
        };

        btn.addEventListener('touchstart', startPress, { passive: false });
        btn.addEventListener('touchend', endPress, { passive: false });
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', endPress);
        btn.addEventListener('mouseleave', endPress);
    }

    public destroy(): void {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}