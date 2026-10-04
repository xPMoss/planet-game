import { Hotbar } from "./Hotbar";
import { InventoryModal } from "./InventoryModal";
import { HealthBar } from "./HealthBar";
import { ToolSlot } from "./ToolSlot"; // Importera ToolSlot
import { useGameStore } from "src/store/useGameStore";

export class Header extends HTMLElement {
    private hotbar!: Hotbar;
    private healthBar!: HealthBar;
    private toolSlot!: ToolSlot;
    private inventoryModal!: InventoryModal;

    connectedCallback() {
        this.id = "header-container";
        this.classList.add("p-4");

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

        // Översta raden: Verktyg + Hotbar i mitten, Inventory-knapp till höger
        const topRow = document.createElement("div");
        Object.assign(topRow.style, {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            position: "relative",
        });

        // 1. Verktygsslot
        this.toolSlot = document.createElement("tool-slot-ui") as ToolSlot;
        topRow.appendChild(this.toolSlot);

        // 2. Hotbar
        this.hotbar = document.createElement("hotbar-ui") as Hotbar;
        topRow.appendChild(this.hotbar);

        // 3. Inventory-knapp längst till höger
        const menuContainer = document.createElement("div");
        menuContainer.id = "menu-container";
        Object.assign(menuContainer.style, {
            position: "relative",
            right: "0px",
            top: "0px",
            display: "flex",
            gap: "8px",
        });

        const invBtn = document.createElement("button");
        Object.assign(invBtn.style, {
            width: "48px",
            height: "48px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "2px solid #666",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });
        invBtn.innerText = "🎒";

        invBtn.addEventListener("click", () => {
            useGameStore.getState().toggleInventory();
        });

        menuContainer.appendChild(invBtn);
        topRow.appendChild(menuContainer);
        this.appendChild(topRow);

        // Undre raden: HealthBar
        const bottomRow = document.createElement("div");
        Object.assign(bottomRow.style, {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        });

        this.healthBar = document.createElement("health-bar-ui") as HealthBar;
        bottomRow.appendChild(this.healthBar);
        this.appendChild(bottomRow);

        // Inventory Modal
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
