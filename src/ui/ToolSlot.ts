import { useGameStore, ALL_TOOLS } from "src/store/useGameStore";
import type { ToolType } from "types";
import { renderSlotContent, getToolIcon } from "./uiHelpers";

export class ToolSlot extends HTMLElement {
    private button!: HTMLButtonElement;

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("relative", "inline-flex", "items-center", "z-10");
        Object.assign(this.style, { userSelect: "none" });
    }

    private createDomElements(): void {
        this.innerHTML = "";

        this.button = document.createElement("button");
        Object.assign(this.button.style, {
            width: "48px",
            height: "48px",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#ffffff",
            outline: "none",
            border: "2px solid #444444",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            pointerEvents: "auto",
            cursor: "default",
            transition: "all 0.1s ease",
        });

        this.button.addEventListener("dragover", (e: DragEvent) => {
            e.preventDefault();
            this.button.style.borderColor = "#ffffff";
            this.button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        });

        this.button.addEventListener("dragleave", () => {
            this.updateUI();
        });

        this.button.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            const itemName = e.dataTransfer?.getData("text/plain");
            if (itemName && ALL_TOOLS[itemName as ToolType]) {
                useGameStore.getState().equipTool(itemName);
            }
        });

        this.button.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation();
        });

        this.appendChild(this.button);
        this.updateUI();
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();

        const hasTool = state.currentTool !== null;
        this.button.style.border = hasTool ? "3px solid #ffffff" : "2px solid #444444";
        this.button.style.backgroundColor = hasTool ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)";

        renderSlotContent(this.button, {
            itemKey: state.currentTool?.name,
            isTool: true,
            toolData: state.currentTool,
            icon: getToolIcon(state.currentTool),
        });
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("tool-slot-ui")) {
    customElements.define("tool-slot-ui", ToolSlot);
}
