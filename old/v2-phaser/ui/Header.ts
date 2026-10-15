import { Hotbar } from "./Hotbar";
import { InventoryModal } from "./InventoryModal";
import { HealthBar } from "./HealthBar";
import { ToolSlot } from "./ToolSlot";
import { useGameStore } from "store";

export class Header extends HTMLElement {
    private hotbar!: Hotbar;
    private healthBar!: HealthBar;
    private toolSlot!: ToolSlot;
    private inventoryModal!: InventoryModal;
    private invBtn!: HTMLButtonElement;

    connectedCallback() {
        this.id = "header-container";
        Object.assign(this.style, {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            zIndex: "1000",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "12px 16px",
            boxSizing: "border-box",
            gap: "8px",
        });

        const topRow = document.createElement("div");
        Object.assign(topRow.style, {
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
        });

        this.toolSlot = document.createElement("tool-slot-ui") as ToolSlot;
        topRow.appendChild(this.toolSlot);

        this.hotbar = document.createElement("hotbar-ui") as Hotbar;
        topRow.appendChild(this.hotbar);

        const menuContainer = document.createElement("div");
        menuContainer.id = "menu-container";
        Object.assign(menuContainer.style, {
            position: "relative",
            right: "0px",
            top: "0px",
            display: "flex",
            gap: "8px",
        });

        this.invBtn = document.createElement("button");
        Object.assign(this.invBtn.style, {
            width: "48px",
            height: "48px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "2px solid #666",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
        });

        // Sätt initial ikon baserat på store-läget
        this.invBtn.innerText = useGameStore.getState().isInventoryOpen ? "📂" : "🎒";

        this.invBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            useGameStore.getState().toggleInventory();
        });

        // Uppdatera endast ikonen när isInventoryOpen ändras (ingen border-ändring)
        useGameStore.subscribe((state) => {
            if (state.isInventoryOpen) {
                this.invBtn.innerText = "📂"; // Öppen väska/mapp
            } else {
                this.invBtn.innerText = "🎒"; // Stängd ryggsäck
            }
        });

        menuContainer.appendChild(this.invBtn);
        topRow.appendChild(menuContainer);
        this.appendChild(topRow);

        const bottomRow = document.createElement("div");
        Object.assign(bottomRow.style, {
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
        });

        this.healthBar = document.createElement("health-bar-ui") as HealthBar;
        bottomRow.appendChild(this.healthBar);
        this.appendChild(bottomRow);

        this.inventoryModal = document.createElement("inventory-modal") as InventoryModal;
        this.inventoryModal.style.pointerEvents = "auto";
        this.appendChild(this.inventoryModal);
    }

    public destroy(): void {
        this.hotbar.destroy();
        this.healthBar.destroy();
        this.toolSlot.destroy();
        this.remove();
    }
}

if (!customElements.get("header-ui")) {
    customElements.define("header-ui", Header);
}
