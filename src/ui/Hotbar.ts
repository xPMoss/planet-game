import { useGameStore } from "src/store/useGameStore";
import { RESOURCE_COLORS } from "ui";

export class Hotbar extends HTMLElement {
    private buttons: HTMLButtonElement[] = [];

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("relative", "flex", "gap-2", "w-fit");
        Object.assign(this.style, { userSelect: "none" });
    }

    private createDomElements(): void {
        this.innerHTML = "";
        this.buttons = [];

        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");

            Object.assign(button.style, {
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                color: "#ffffff",
                outline: "none",
                transition: "all 0.1s ease",
                border: "2px solid #444444",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                pointerEvents: "auto",
            });

            const keyBadge = document.createElement("span");
            keyBadge.innerText = String(i + 1);
            Object.assign(keyBadge.style, {
                position: "absolute",
                top: "3px",
                left: "5px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#aaaaaa",
            });

            button.appendChild(keyBadge);

            const index = i;
            button.addEventListener("click", (event: MouseEvent) => {
                event.stopPropagation();
                useGameStore.getState().setSelectedHotbarIndex(index);
            });

            this.buttons.push(button);
            this.appendChild(button);
        }

        this.updateUI();
    }

    private setupEvents(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.code.startsWith("Digit")) {
                const digitIndex = parseInt(event.code.replace("Digit", ""), 10) - 1;
                if (digitIndex >= 0 && digitIndex < 4) {
                    useGameStore.getState().setSelectedHotbarIndex(digitIndex);
                }
            }
        });
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();

        this.buttons.forEach((button, index) => {
            const resource = state.hotbar[index];
            const isSelected = state.selectedHotbarIndex === index;

            button.style.border = isSelected ? "3px solid #ffffff" : "2px solid #444444";
            button.style.backgroundColor = isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)";

            while (button.children.length > 1) {
                button.removeChild(button.lastChild!);
            }

            if (resource) {
                const colorPreview = document.createElement("div");
                Object.assign(colorPreview.style, {
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.4)",
                    backgroundColor: RESOURCE_COLORS[resource] || "#ffffff",
                });

                const countText = document.createElement("span");
                countText.innerText = String(state.inventory[resource] || 0);
                Object.assign(countText.style, {
                    position: "absolute",
                    bottom: "3px",
                    right: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                });

                button.appendChild(colorPreview);
                button.appendChild(countText);
            }
        });
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("hotbar-ui")) {
    customElements.define("hotbar-ui", Hotbar);
}
