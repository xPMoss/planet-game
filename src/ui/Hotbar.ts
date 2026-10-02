import { useGameStore } from "src/store/useGameStore";
import { type ResourceType } from "types";

interface HotbarItem {
    id: ResourceType;
    name: string;
    color: string;
    slotKey: string;
}

const HOTBAR_ITEMS: HotbarItem[] = [
    { id: "wood", name: "Wood", color: "#803030", slotKey: "1" },
    { id: "dirt", name: "Jord", color: "#8b5a2b", slotKey: "2" },
    { id: "stone", name: "Sten", color: "#808080", slotKey: "3" },
    { id: "iron_ore", name: "Järn", color: "#ff4500", slotKey: "4" },
    { id: "gold_ore", name: "Guld", color: "#f7c325", slotKey: "5" },
    { id: "diamond", name: "Diamant", color: "#00d5ff", slotKey: "6" },
];

export class Hotbar extends HTMLElement {
    private buttons: Map<ResourceType, HTMLButtonElement> = new Map();
    private countElements: Map<ResourceType, HTMLSpanElement> = new Map();

    constructor() {
        super();
    }

    // Körs när elementet läggs till i DOM:en
    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("relative", "flex", "gap-2", "mx-auto", "w-fit", "z-10");

        Object.assign(this.style, {
            userSelect: "none",
        });
    }

    private createDomElements(): void {
        const state = useGameStore.getState();

        HOTBAR_ITEMS.forEach((item) => {
            const button = document.createElement("button");
            const isSelected = state.selectedResource === item.id;

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
                border: isSelected ? "3px solid #ffffff" : "2px solid #444444",
                backgroundColor: isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)",
                pointerEvents: "auto",
            });

            // Tangentindikator (1, 2, 3...)
            const keyBadge = document.createElement("span");
            keyBadge.innerText = item.slotKey;
            Object.assign(keyBadge.style, {
                position: "absolute",
                top: "3px",
                left: "5px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#aaaaaa",
            });

            // Färgförhandsvisning för blocket
            const colorPreview = document.createElement("div");
            Object.assign(colorPreview.style, {
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                border: "1px solid rgba(0,0,0,0.4)",
                backgroundColor: item.color,
            });

            // Antal block i inventoryt
            const countText = document.createElement("span");
            countText.innerText = String(state.inventory[item.id] || 0);
            Object.assign(countText.style, {
                position: "absolute",
                bottom: "3px",
                right: "5px",
                fontSize: "12px",
                fontWeight: "bold",
            });

            button.appendChild(keyBadge);
            button.appendChild(colorPreview);
            button.appendChild(countText);

            button.addEventListener("click", (event: MouseEvent) => {
                event.stopPropagation();
                useGameStore.getState().setSelectedResource(item.id);
            });

            this.buttons.set(item.id, button);
            this.countElements.set(item.id, countText);

            this.appendChild(button);
        });
    }

    private setupEvents(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.code.startsWith("Digit")) {
                const digitIndex = parseInt(event.code.replace("Digit", ""), 10);
                const targetItem = HOTBAR_ITEMS[digitIndex - 1];

                if (targetItem) {
                    useGameStore.getState().setSelectedResource(targetItem.id);
                }
            }
        });
    }

    private subscribeToStore(): void {
        useGameStore.subscribe((state) => {
            HOTBAR_ITEMS.forEach((item) => {
                const button = this.buttons.get(item.id);
                const countText = this.countElements.get(item.id);

                if (button) {
                    const isSelected = state.selectedResource === item.id;
                    const targetBorder = isSelected ? "3px solid #ffffff" : "2px solid #444444";
                    const targetBg = isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)";

                    if (button.style.border !== targetBorder) {
                        button.style.border = targetBorder;
                    }
                    if (button.style.backgroundColor !== targetBg) {
                        button.style.backgroundColor = targetBg;
                    }
                }

                if (countText) {
                    const newCount = String(state.inventory[item.id] || 0);
                    if (countText.innerText !== newCount) {
                        countText.innerText = newCount;
                    }
                }
            });
        });
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("hotbar-ui")) {
    customElements.define("hotbar-ui", Hotbar);
}
