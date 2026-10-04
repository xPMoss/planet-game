import { useGameStore, ALL_TOOLS } from "src/store/useGameStore";
import type { ToolType } from "types";
import { RESOURCE_INFO } from "ui";
import { getToolIcon } from "./uiHelpers";

interface DragPayload {
    source: "inventory" | "hotbar";
    resource: string;
    fromIndex?: number;
}

export class InventoryModal extends HTMLElement {
    private container!: HTMLDivElement;
    private draggedPayload: DragPayload | null = null;
    private justDropped: boolean = false;

    connectedCallback() {
        this.classList.add("fixed", "inset-0", "z-50", "hidden");
        this.style.pointerEvents = "auto";

        this.container = document.createElement("div");
        Object.assign(this.container.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#222222",
            border: "3px solid #444444",
            borderRadius: "8px",
            padding: "20px",
            color: "#fff",
            width: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.9)",
            pointerEvents: "auto",
            userSelect: "none",
        });

        this.appendChild(this.container);
        this.subscribeToStore();
        this.render();
    }

    private render() {
        const state = useGameStore.getState();
        if (!state.isInventoryOpen) {
            this.classList.add("hidden");
            return;
        }
        this.classList.remove("hidden");

        this.container.innerHTML = "";

        this.renderHeader();
        this.renderInventoryGrid(state);
        this.renderEquipmentSection(state);
    }

    private renderHeader(): void {
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";

        const title = document.createElement("h2");
        title.innerText = "Inventory";
        title.style.fontWeight = "bold";
        title.style.fontSize = "18px";

        const closeBtn = document.createElement("button");
        closeBtn.innerText = "✕";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.background = "none";
        closeBtn.style.border = "none";
        closeBtn.style.color = "#aaa";
        closeBtn.style.fontSize = "18px";
        closeBtn.addEventListener("click", () => {
            useGameStore.getState().toggleInventory();
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        this.container.appendChild(header);
    }

    private renderInventoryGrid(state: ReturnType<typeof useGameStore.getState>): void {
        const activeResources: { res: string; count: number }[] = [];
        Object.keys(state.inventory).forEach((key) => {
            const count = state.inventory[key];
            if (count > 0 && RESOURCE_INFO[key]) {
                activeResources.push({ res: key, count });
            }
        });

        const grid = document.createElement("div");
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "10px",
            borderRadius: "6px",
            border: "2px solid #333333",
        });

        for (let i = 0; i < state.maxSlots; i++) {
            const slotData = activeResources[i];
            const slot = this.createInventorySlot(slotData, state);
            grid.appendChild(slot);
        }

        this.container.appendChild(grid);
    }

    private createInventorySlot(
        slotData: { res: string; count: number } | undefined,
        state: ReturnType<typeof useGameStore.getState>,
    ): HTMLDivElement {
        const slot = document.createElement("div");
        Object.assign(slot.style, {
            width: "56px",
            height: "56px",
            backgroundColor: "#1a1a1a",
            border: "2px inset #333333",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
        });

        if (slotData) {
            slot.draggable = true;
            slot.style.cursor = "grab";

            const info = RESOURCE_INFO[slotData.res];

            if (info && info.isTool) {
                const isEquipped = state.currentTool?.name === slotData.res;
                const toolObj = ALL_TOOLS[slotData.res as ToolType];

                if (isEquipped) {
                    slot.style.borderColor = "#ffd700";
                }

                const name = document.createElement("span");
                name.innerText = slotData.res.split(" ")[0];
                name.style.fontSize = "10px";
                name.style.fontWeight = "bold";
                name.style.color = "#ffd700";

                const icon = document.createElement("span");
                icon.innerText = getToolIcon(toolObj);
                icon.style.fontSize = "14px";

                slot.appendChild(icon);
                slot.appendChild(name);
            } else if (info && info.color) {
                const colorBox = document.createElement("div");
                Object.assign(colorBox.style, {
                    width: "32px",
                    height: "32px",
                    backgroundColor: info.color,
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.5)",
                    pointerEvents: "none",
                });

                const countBadge = document.createElement("span");
                countBadge.innerText = String(slotData.count);
                Object.assign(countBadge.style, {
                    position: "absolute",
                    bottom: "2px",
                    right: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    textShadow: "1px 1px 2px #000",
                    pointerEvents: "none",
                });

                slot.appendChild(colorBox);
                slot.appendChild(countBadge);
            }

            slot.addEventListener("dragstart", (e: DragEvent) => {
                this.draggedPayload = {
                    source: "inventory",
                    resource: slotData.res,
                };
                if (e.dataTransfer) {
                    e.dataTransfer.setData("text/plain", slotData.res);
                    e.dataTransfer.effectAllowed = "copy";
                }
            });

            slot.addEventListener("dragend", () => {
                this.draggedPayload = null;
            });

            slot.addEventListener("click", () => {
                if (this.justDropped) return;
                if (info && info.isTool) {
                    useGameStore.getState().equipTool(slotData.res);
                } else {
                    const emptyIdx = state.hotbar.indexOf(null);
                    if (emptyIdx !== -1) {
                        useGameStore.getState().setHotbarSlot(emptyIdx, slotData.res);
                    } else {
                        useGameStore.getState().setHotbarSlot(state.selectedHotbarIndex, slotData.res);
                    }
                }
            });
        }

        return slot;
    }

    private renderEquipmentSection(state: ReturnType<typeof useGameStore.getState>): void {
        const barLabel = document.createElement("p");
        barLabel.innerText = "Utrustning (Utrustat verktyg & Hotbar):";
        barLabel.style.fontSize = "12px";
        barLabel.style.color = "#aaa";
        this.container.appendChild(barLabel);

        const bottomContainer = document.createElement("div");
        Object.assign(bottomContainer.style, {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            justifyContent: "center",
        });

        bottomContainer.appendChild(this.renderToolModalSlot(state));

        const divider = document.createElement("div");
        Object.assign(divider.style, {
            width: "2px",
            height: "40px",
            backgroundColor: "#333333",
        });
        bottomContainer.appendChild(divider);

        bottomContainer.appendChild(this.renderHotbarGrid(state));

        this.container.appendChild(bottomContainer);
    }

    private renderToolModalSlot(state: ReturnType<typeof useGameStore.getState>): HTMLDivElement {
        const toolModalSlot = document.createElement("div");
        Object.assign(toolModalSlot.style, {
            width: "48px",
            height: "48px",
            border: state.currentTool ? "2px solid #ffd700" : "2px inset #333333",
            borderRadius: "4px",
            backgroundColor: "#1a1a1a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: state.currentTool ? "pointer" : "default",
            position: "relative",
        });

        if (state.currentTool) {
            const toolIconBadge = document.createElement("span");
            toolIconBadge.innerText = getToolIcon(state.currentTool);
            Object.assign(toolIconBadge.style, {
                position: "absolute",
                top: "2px",
                left: "4px",
                fontSize: "10px",
                pointerEvents: "none",
            });
            toolModalSlot.appendChild(toolIconBadge);

            const toolName = document.createElement("span");
            toolName.innerText = state.currentTool.name.split(" ")[0];
            Object.assign(toolName.style, {
                fontSize: "10px",
                fontWeight: "bold",
                color: "#ffd700",
                marginTop: "4px",
                pointerEvents: "none",
            });

            const toolPower = document.createElement("span");
            toolPower.innerText = "⚡" + state.currentTool.power;
            Object.assign(toolPower.style, {
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "10px",
                color: "#ffffff",
                pointerEvents: "none",
            });

            toolModalSlot.appendChild(toolName);
            toolModalSlot.appendChild(toolPower);
        }

        toolModalSlot.addEventListener("click", () => {
            if (state.currentTool) {
                useGameStore.getState().equipTool(null);
            }
        });

        toolModalSlot.addEventListener("dragover", (e: DragEvent) => {
            e.preventDefault();
        });

        toolModalSlot.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            const itemName = e.dataTransfer?.getData("text/plain");
            if (itemName && ALL_TOOLS[itemName as ToolType]) {
                useGameStore.getState().equipTool(itemName);
            }
        });

        return toolModalSlot;
    }

    private renderHotbarGrid(state: ReturnType<typeof useGameStore.getState>): HTMLDivElement {
        const hotbarGrid = document.createElement("div");
        Object.assign(hotbarGrid.style, {
            display: "flex",
            gap: "8px",
        });

        state.hotbar.forEach((slotRes, index) => {
            const slot = document.createElement("div");
            Object.assign(slot.style, {
                width: "48px",
                height: "48px",
                border: "2px inset #333333",
                borderRadius: "4px",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: slotRes ? "grab" : "pointer",
                position: "relative",
            });

            if (slotRes) {
                const info = RESOURCE_INFO[slotRes];

                if (info && info.color) {
                    const colorBox = document.createElement("div");
                    Object.assign(colorBox.style, {
                        width: "28px",
                        height: "28px",
                        backgroundColor: info.color,
                        borderRadius: "4px",
                    });

                    const countText = document.createElement("span");
                    countText.innerText = String(state.inventory[slotRes] || 0);
                    Object.assign(countText.style, {
                        position: "absolute",
                        bottom: "2px",
                        right: "4px",
                        fontSize: "11px",
                        fontWeight: "bold",
                    });

                    slot.appendChild(colorBox);
                    slot.appendChild(countText);
                }
            }

            slot.addEventListener("click", () => {
                useGameStore.getState().setHotbarSlot(index, null);
            });

            hotbarGrid.appendChild(slot);
        });

        return hotbarGrid;
    }

    private subscribeToStore() {
        useGameStore.subscribe(() => {
            this.render();
        });
    }
}

if (!customElements.get("inventory-modal")) {
    customElements.define("inventory-modal", InventoryModal);
}
