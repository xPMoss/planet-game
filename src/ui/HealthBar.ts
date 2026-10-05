import { useGameStore } from "src/store/useGameStore";

export class HealthBar extends HTMLElement {
    private barFill!: HTMLDivElement;
    private textElement!: HTMLSpanElement;

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("flex", "items-center", "min-w-[340px]", "max-w-[340px]");
        Object.assign(this.style, {
            userSelect: "none",
            pointerEvents: "auto",
        });
    }

    private createDomElements(): void {
        const container = document.createElement("div");
        Object.assign(container.style, {
            width: "100%",
            height: "24px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "2px solid #555555",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });

        // Den röda fyllningen för HP
        this.barFill = document.createElement("div");
        Object.assign(this.barFill.style, {
            position: "absolute",
            left: "0px",
            top: "0px",
            height: "100%",
            width: "100%",
            backgroundColor: "#ff3333",
            transition: "width 0.2s ease-in-out",
        });

        // Textindikator för HP (t.ex. 100 / 100)
        this.textElement = document.createElement("span");
        Object.assign(this.textElement.style, {
            position: "relative",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#ffffff",
            //textShadow: "1px 1px 2px #000000",
        });

        container.appendChild(this.barFill);
        container.appendChild(this.textElement);
        this.appendChild(container);

        this.updateUI();
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();
        const percentage = Math.max(0, Math.min(100, (state.hp / state.maxHp) * 100));

        this.barFill.style.width = percentage + "%";
        this.textElement.innerText = state.hp + " / " + state.maxHp;
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("health-bar-ui")) {
    customElements.define("health-bar-ui", HealthBar);
}
