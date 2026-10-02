export interface MobileInputState {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    primaryAction: boolean;
    secondaryAction: boolean;
}

export class MobileControls extends HTMLElement {
    public state: MobileInputState = {
        left: false,
        right: false,
        up: false,
        down: false,
        jump: false,
        primaryAction: false,
        secondaryAction: false,
    };

    constructor() {
        super();
    }

    connectedCallback() {
        this.id = "mobile-controls-container";

        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
    }

    private setupStyles(): void {
        this.classList.add(
            "absolute",
            "bottom-0",
            "w-full",
            "flex",
            "justify-between",
            "items-center",
            "text-4xl",
            "pointer-events-none",
            "z-10",
        );
    }

    private createDomElements(): void {
        const leftContainer = this.createContainer("btn-container-left", 3, 3);
        const rightContainer = this.createContainer("btn-container-right", 2, 2);

        this.appendChild(leftContainer);
        this.appendChild(rightContainer);

        const emptyPlaceholder = this.createButton("empty", "", 0, 0);
        const emptyPlaceholder1 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;
        const emptyPlaceholder2 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;
        const emptyPlaceholder3 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;
        const emptyPlaceholder4 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;
        const emptyPlaceholder5 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;

        const upButton = this.createButton("btn-up", "bi-caret-up", 0, 1);
        const leftButton = this.createButton("btn-left", "bi-caret-left", 1, 0);
        const rightButton = this.createButton("btn-right", "bi-caret-right", 1, 2);
        const downButton = this.createButton("btn-down", "bi-caret-down", 2, 1);

        const secondaryActionButton = this.createButton("btn-secondaryAction", "bi-plus", 3, 0);
        const primaryActionButton = this.createButton("btn-primaryAction", "bi-x", 3, 1);

        const jumpButton = this.createButton("btn-jump", "bi-circle", 4, 1);

        // append buttons to dpad in right position
        const dpadContainerLeft = document.getElementById("dpad-container-btn-container-left") as HTMLDivElement;
        dpadContainerLeft.appendChild(emptyPlaceholder1);
        dpadContainerLeft.appendChild(upButton);
        dpadContainerLeft.appendChild(emptyPlaceholder2);
        dpadContainerLeft.appendChild(leftButton);
        dpadContainerLeft.appendChild(emptyPlaceholder3);
        dpadContainerLeft.appendChild(rightButton);
        dpadContainerLeft.appendChild(emptyPlaceholder4);
        dpadContainerLeft.appendChild(downButton);
        dpadContainerLeft.appendChild(emptyPlaceholder5);

        const dpadContainerRight = document.getElementById("dpad-container-btn-container-right") as HTMLDivElement;
        dpadContainerRight.appendChild(secondaryActionButton);
        dpadContainerRight.appendChild(primaryActionButton);
        dpadContainerRight.appendChild(emptyPlaceholder);
        dpadContainerRight.appendChild(jumpButton);
    }

    private createContainer(id: string, rows: number, cols: number): HTMLDivElement {
        // left and right containers, 1 up/down container, 1 action container
        // 4 or 3 containers for buttons

        const container = document.createElement("div");
        container.id = id;
        container.classList.add(
            "w-full",
            "flex",
            id === "btn-container-left" ? "justify-start" : "justify-end",
            "items-center",
            "text-4xl",
            "p-4",
            "pointer-events-none",
            "z-10",
            "rounded-3xl",
        );

        // create 2 rows 2 cols for dpad
        const dpadContainer = document.createElement("div");
        dpadContainer.id = "dpad-container-" + id;
        dpadContainer.classList.add("w-fit", "h-full", "gap-2");
        dpadContainer.classList.add("grid", `grid-cols-${cols}`, `grid-rows-${rows}`);

        container.appendChild(dpadContainer);

        return container;
    }

    private createButton(id: string, icon: string, row: number, column: number): HTMLButtonElement {
        const button = document.createElement("button");

        if (id === "empty") {
            button.id = id;
            button.classList.add("w-20", "h-20");
            return button;
        }

        button.id = id;
        button.classList.add(
            "mx-auto",
            "w-20",
            "h-20",
            "rounded-full",
            "bg-blue-950",
            "text-white",
            "cursor-pointer",
            "flex",
            "items-center",
            "justify-center",
            "active:scale-90",
            "transition-all",
            "pointer-events-auto",
            "select-none",
        );
        button.innerHTML = `<i class="bi ${icon}"></i>`;
        button.dataset.row = row.toString();
        button.dataset.col = column.toString();

        return button;
    }

    private setupEvents(): void {
        this.bindButton("btn-left", "left");
        this.bindButton("btn-right", "right");
        this.bindButton("btn-jump", "jump");
        this.bindButton("btn-up", "up");
        this.bindButton("btn-down", "down");
        this.bindButton("btn-primaryAction", "primaryAction");
        this.bindButton("btn-secondaryAction", "secondaryAction");
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

        btn.addEventListener("touchstart", startPress, { passive: false });
        btn.addEventListener("touchend", endPress, { passive: false });
        btn.addEventListener("mousedown", startPress);
        btn.addEventListener("mouseup", endPress);
        btn.addEventListener("mouseleave", endPress);
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("controls-ui")) {
    customElements.define("controls-ui", MobileControls);
}
