import { Hotbar } from "./Hotbar";
import { InventoryModal } from "./InventoryModal";
import { HealthBar } from "./HealthBar";
import { useGameStore } from "store";
import { MenuModal } from "./MenuModal"; // <--- Importera

export class Header extends HTMLElement {
    private hotbar!: Hotbar;
    private healthBar!: HealthBar;
    private inventoryModal!: InventoryModal;
    private invBtn!: HTMLButtonElement;
    private menuBtn!: HTMLButtonElement; // <--- Ny knapp
    private menuModal!: MenuModal; // <--- Referens till nya modalen

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

        this.hotbar = document.createElement("hotbar-ui") as Hotbar;
        topRow.appendChild(this.hotbar);

        const menuContainer = document.createElement("div");
        menuContainer.id = "inventory-container";
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
            background: "url('./src/assets/inventory.png') no-repeat center center",
            backgroundSize: "32px 32px",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Återställer den mörka bakgrundsfärgen
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
            transition: "all 50ms ease",
        });

        // Sätt initial ikon baserat på store-läget
        //this.invBtn.innerText = useGameStore.getState().isInventoryOpen ? "📂" : "🎒";

        this.invBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();

            this.invBtn.classList.add("scale-[80%]");
            setTimeout(() => {
                this.invBtn.classList.remove("scale-[80%]");
                useGameStore.getState().toggleInventory();
            }, 100);
        });

        // Uppdatera endast ikonen när isInventoryOpen ändras (ingen border-ändring)
        useGameStore.subscribe((state) => {
            if (state.isInventoryOpen) {
                //this.invBtn.innerText = "📂"; // Öppen väska/mapp
            } else {
                //this.invBtn.innerText = "🎒"; // Stängd ryggsäck
            }
        });

        // --- NY MENYKNAPP ---
        this.menuBtn = document.createElement("button");
        Object.assign(this.menuBtn.style, {
            width: "48px",
            height: "48px",
            background: "url('./src/assets/menu.png') no-repeat center center",
            backgroundSize: "32px 32px",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Återställer den mörka bakgrundsfärgen
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
            transition: "all 50ms ease",
        });
        //this.menuBtn.innerText = "⚙️"; // Ikon för menyn/inställningar

        this.menuBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();

            this.menuBtn.classList.add("scale-[80%]");
            setTimeout(() => {
                this.menuBtn.classList.remove("scale-[80%]");
                this.menuModal.toggle(); // <--- Öppna/stäng menyn
            }, 100);
        });

        // --------------------

        menuContainer.appendChild(this.invBtn);
        menuContainer.appendChild(this.menuBtn);
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

        this.menuModal = document.createElement("menu-modal") as MenuModal;
        this.menuModal.style.pointerEvents = "auto";
        this.appendChild(this.menuModal);
    }

    public destroy(): void {
        this.hotbar.destroy();
        this.healthBar.destroy();
        this.remove();
    }
}

if (!customElements.get("header-ui")) {
    customElements.define("header-ui", Header);
}
