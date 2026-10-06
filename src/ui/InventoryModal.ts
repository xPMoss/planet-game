// src/ui/InventoryModal.ts

import { useGameStore, ALL_TOOLS, ALL_ARMOR } from "store";
import type { ToolType, EquipmentSlot } from "types";
import { RESOURCE_INFO } from "ui";
import { getToolIcon } from "./uiHelpers";

interface DragPayload {
    source: "inventory" | "hotbar" | "equipment";
    resource: string;
    fromSlot?: EquipmentSlot;
    fromIndex?: number;
}

export class InventoryModal extends HTMLElement {
    private container!: HTMLDivElement;
    private draggedPayload: DragPayload | null = null;

    connectedCallback() {
        this.classList.add("fixed", "inset-0", "z-50", "hidden");

        // Stäng om man klickar på backdropen
        this.addEventListener("click", (e: MouseEvent) => {
            if (e.target === this) {
                e.stopPropagation();
                useGameStore.getState().toggleInventory();
            }
        });

        this.container = document.createElement("div");
        Object.assign(this.container.style, {
            position: "fixed",
            top: "104px",
            left: "50%",
            transform: "translate(-50%, 0)",
            backgroundColor: "#222222",
            border: "3px solid #444444",
            borderRadius: "8px",
            padding: "16px",
            color: "#fff",
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.9)",
            pointerEvents: "auto",
            userSelect: "none",
        });

        this.container.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
        });

        this.appendChild(this.container);
        this.subscribeToStore();
        this.updateVisibility();
        this.render();
    }

    private updateVisibility(): void {
        const isInventoryOpen = useGameStore.getState().isInventoryOpen;
        if (isInventoryOpen) {
            this.classList.remove("hidden");
            this.style.display = "block";
            this.style.pointerEvents = "auto";
            this.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        } else {
            this.classList.add("hidden");
            this.style.display = "none";
            this.style.pointerEvents = "none";
            this.style.backgroundColor = "transparent";
        }
    }

    private render() {
        this.updateVisibility();
        if (this.classList.contains("hidden")) return;

        this.container.innerHTML = "";

        this.renderHeader();
        this.renderArmorSection(useGameStore.getState());
        this.renderInventoryGrid(useGameStore.getState());
        this.renderEquipmentSection(useGameStore.getState());
    }

    private renderHeader(): void {
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";

        const title = document.createElement("h2");
        title.innerText = "Inventory & Equipment";
        title.style.fontWeight = "bold";
        title.style.fontSize = "18px";

        const closeBtn = document.createElement("button");
        closeBtn.innerText = "✕";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.background = "none";
        closeBtn.style.border = "none";
        closeBtn.style.color = "#aaa";
        closeBtn.style.fontSize = "18px";
        closeBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            useGameStore.getState().toggleInventory();
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        this.container.appendChild(header);
    }

    private renderArmorSection(state: ReturnType<typeof useGameStore.getState>): void {
        const label = document.createElement("p");
        label.innerText = "Utrustning (Rustning):";
        label.style.fontSize = "12px";
        label.style.color = "#aaa";
        this.container.appendChild(label);

        const armorRow = document.createElement("div");
        Object.assign(armorRow.style, {
            width: "fit-content",
            display: "flex",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            gap: "8px",
        });

        const slots: { slot: EquipmentSlot; icon: string; name: string }[] = [
            { slot: "helmet", icon: "🪖", name: "Hjälm" },
            { slot: "armor", icon: "👕", name: "Kläder" },
            { slot: "boots", icon: "🥾", name: "Skor" },
        ];

        slots.forEach(({ slot, icon, name }) => {
            const item = state.equipment[slot];
            const slotEl = document.createElement("div");

            Object.assign(slotEl.style, {
                width: "48px",
                height: "48px",
                backgroundColor: "#1a1a1a",
                border: item ? "2px solid #00ffff" : "2px inset #333333",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: item ? "grab" : "default",
                boxSizing: "border-box",
            });

            if (item) {
                slotEl.draggable = true;

                const iconEl = document.createElement("span");
                iconEl.innerText = icon;
                iconEl.style.fontSize = "14px";
                iconEl.style.pointerEvents = "none";

                const nameEl = document.createElement("span");
                nameEl.innerText = item.name.split(" ")[0];
                nameEl.style.fontSize = "9px";
                nameEl.style.fontWeight = "bold";
                nameEl.style.color = "#00ffff";
                nameEl.style.pointerEvents = "none";

                const statEl = document.createElement("span");
                statEl.innerText = item.speedBonus ? "⚡" + item.speedBonus : "🛡️" + item.armor;
                statEl.style.fontSize = "9px";
                statEl.style.color = "#aaa";
                statEl.style.pointerEvents = "none";

                slotEl.appendChild(iconEl);
                slotEl.appendChild(nameEl);
                slotEl.appendChild(statEl);

                this.setupDragStart(slotEl, {
                    source: "equipment",
                    resource: item.name,
                    fromSlot: slot,
                });

                slotEl.addEventListener("click", () => {
                    const store = useGameStore.getState();
                    store.addResource(item.name, 1);
                    store.equipArmor(slot, null);
                });
            } else {
                const placeholder = document.createElement("span");
                placeholder.innerText = icon;
                placeholder.style.fontSize = "18px";
                placeholder.style.opacity = "0.25";
                placeholder.style.pointerEvents = "none";

                const labelEl = document.createElement("span");
                labelEl.innerText = name;
                labelEl.style.fontSize = "9px";
                labelEl.style.color = "#555";
                labelEl.style.pointerEvents = "none";

                slotEl.appendChild(placeholder);
                slotEl.appendChild(labelEl);
            }

            this.setupDropTarget(slotEl, (resource) => {
                if (resource && ALL_ARMOR[resource]) {
                    const armor = ALL_ARMOR[resource];
                    if (armor.slot === slot) {
                        const store = useGameStore.getState();
                        const currentEquipped = store.equipment[slot];

                        store.removeResource(resource, 1);
                        if (currentEquipped) {
                            store.addResource(currentEquipped.name, 1);
                        }
                        store.equipArmor(slot, armor);
                    }
                }
            });

            armorRow.appendChild(slotEl);
        });

        this.container.appendChild(armorRow);
    }

    private renderInventoryGrid(state: ReturnType<typeof useGameStore.getState>): void {
        const activeResources: { res: string; count: number }[] = [];

        Object.keys(state.inventory).forEach((key) => {
            const count = state.inventory[key];
            if (count <= 0 || !RESOURCE_INFO[key]) return;

            const info = RESOURCE_INFO[key];

            // 1. Om detta är ett verktyg och det är utrustat som nuvarande verktyg -> Dölj från inventoryt
            if (info && info.isTool) {
                if (state.currentTool?.name === key) {
                    return; // Lämnar platsen tom i inventory-gridet!
                }
                for (let i = 0; i < count; i++) {
                    activeResources.push({ res: key, count: 1 });
                }
            }
            // 2. Om detta är en rustning -> Lägg till i mönstret
            else if (info && info.isArmor) {
                for (let i = 0; i < count; i++) {
                    activeResources.push({ res: key, count: 1 });
                }
            }
            // 3. Vanliga byggblock/resurser -> Dölj om resursen ligger i Hotbaren
            else {
                if (state.hotbar.includes(key)) {
                    return; // Lämnar platsen tom i inventory-gridet!
                }
                activeResources.push({ res: key, count });
            }
        });

        const grid = document.createElement("div");
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            width: "fit-content",
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
            width: "48px",
            height: "48px",
            backgroundColor: "#1a1a1a",
            border: "2px inset #333333",
            borderRadius: "6px",
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
                name.style.pointerEvents = "none";

                const icon = document.createElement("span");
                icon.innerText = getToolIcon(toolObj);
                icon.style.fontSize = "14px";
                icon.style.pointerEvents = "none";

                slot.appendChild(icon);
                slot.appendChild(name);
            } else if (info && info.isArmor) {
                const armorObj = ALL_ARMOR[slotData.res];

                const name = document.createElement("span");
                name.innerText = slotData.res.split(" ")[0];
                name.style.fontSize = "10px";
                name.style.fontWeight = "bold";
                name.style.color = "#00ffff";
                name.style.pointerEvents = "none";

                const icon = document.createElement("span");
                icon.innerText = armorObj?.slot === "helmet" ? "🪖" : armorObj?.slot === "armor" ? "👕" : "🥾";
                icon.style.fontSize = "14px";
                icon.style.pointerEvents = "none";

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

            this.setupDragStart(slot, {
                source: "inventory",
                resource: slotData.res,
            });

            slot.addEventListener("click", () => {
                const store = useGameStore.getState();

                if (info && info.isTool) {
                    // Om verktyget redan är utrustat -> ta av det, annars utrusta det
                    if (store.currentTool?.name === slotData.res) {
                        store.equipTool(null);
                    } else {
                        store.equipTool(slotData.res);
                    }
                } else if (info && info.isArmor) {
                    const armor = ALL_ARMOR[slotData.res];
                    if (armor) {
                        const currentlyEquipped = store.equipment[armor.slot];

                        store.removeResource(slotData.res, 1);
                        if (currentlyEquipped) {
                            store.addResource(currentlyEquipped.name, 1);
                        }

                        store.equipArmor(armor.slot, armor);
                    }
                } else {
                    const currentHotbar = store.hotbar;

                    const existingIndex = currentHotbar.indexOf(slotData.res);
                    if (existingIndex !== -1) {
                        store.setSelectedHotbarIndex(existingIndex);
                    } else {
                        const emptyIdx = currentHotbar.indexOf(null);
                        if (emptyIdx !== -1) {
                            store.setHotbarSlot(emptyIdx, slotData.res);
                        } else {
                            store.setHotbarSlot(store.selectedHotbarIndex, slotData.res);
                        }
                    }
                }
            });
        }

        this.setupDropTarget(slot, () => {
            if (!this.draggedPayload) return;

            const store = useGameStore.getState();

            if (this.draggedPayload.source === "equipment" && this.draggedPayload.fromSlot) {
                const currentEquipped = store.equipment[this.draggedPayload.fromSlot];
                if (currentEquipped) {
                    store.addResource(currentEquipped.name, 1);
                    store.equipArmor(this.draggedPayload.fromSlot, null);
                }
            } else if (this.draggedPayload.source === "hotbar" && typeof this.draggedPayload.fromIndex === "number") {
                store.setHotbarSlot(this.draggedPayload.fromIndex, null);
            }
        });

        return slot;
    }

    private renderEquipmentSection(state: ReturnType<typeof useGameStore.getState>): void {
        const barLabel = document.createElement("p");
        barLabel.innerText = "Snabbslots (Verktyg & Hotbar):";
        barLabel.style.fontSize = "12px";
        barLabel.style.color = "#aaa";
        this.container.appendChild(barLabel);

        const bottomContainer = document.createElement("div");
        Object.assign(bottomContainer.style, {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            justifyContent: "center",
            width: "fit-content",
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
            borderRadius: "6px",
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

        this.setupDropTarget(toolModalSlot, (resource) => {
            if (resource && ALL_TOOLS[resource as ToolType]) {
                useGameStore.getState().equipTool(resource);
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
                borderRadius: "6px",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: slotRes ? "grab" : "pointer",
                position: "relative",
            });

            if (slotRes) {
                slot.draggable = true;

                const info = RESOURCE_INFO[slotRes];

                if (info && info.color) {
                    const colorBox = document.createElement("div");
                    Object.assign(colorBox.style, {
                        width: "28px",
                        height: "28px",
                        backgroundColor: info.color,
                        borderRadius: "4px",
                        pointerEvents: "none",
                    });

                    const countText = document.createElement("span");
                    countText.innerText = String(state.inventory[slotRes] || 0);
                    Object.assign(countText.style, {
                        position: "absolute",
                        bottom: "2px",
                        right: "4px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        pointerEvents: "none",
                    });

                    slot.appendChild(colorBox);
                    slot.appendChild(countText);
                }

                this.setupDragStart(slot, {
                    source: "hotbar",
                    resource: slotRes,
                    fromIndex: index,
                });
            }

            slot.addEventListener("click", () => {
                useGameStore.getState().setHotbarSlot(index, null);
            });

            this.setupDropTarget(slot, (resource) => {
                if (resource) {
                    const info = RESOURCE_INFO[resource];
                    if (!info?.isTool && !info?.isArmor) {
                        useGameStore.getState().setHotbarSlot(index, resource);
                    }
                }
            });

            hotbarGrid.appendChild(slot);
        });

        return hotbarGrid;
    }

    private setupDragStart(element: HTMLElement, payload: DragPayload): void {
        element.addEventListener("dragstart", (e: DragEvent) => {
            e.stopPropagation();
            this.draggedPayload = payload;
            if (e.dataTransfer) {
                e.dataTransfer.setData("text/plain", payload.resource);
                e.dataTransfer.effectAllowed = "move";
            }
        });

        element.addEventListener("dragend", (e: DragEvent) => {
            e.stopPropagation();
            this.draggedPayload = null;
        });
    }

    private setupDropTarget(element: HTMLElement, onDrop: (resource: string) => void): void {
        element.addEventListener("dragover", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = "move";
            }
        });

        element.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const resource = this.draggedPayload?.resource || e.dataTransfer?.getData("text/plain") || "";
            onDrop(resource);
            this.draggedPayload = null;
        });
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
