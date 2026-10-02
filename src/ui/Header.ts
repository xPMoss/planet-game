import { Hotbar } from "./Hotbar";

export class Header extends HTMLElement {
    private hotbar!: Hotbar;

    constructor() {
        super();
    }

    connectedCallback() {
        this.id = "header-container";
        this.classList.add("p-4");

        // Ge containern en fast position högst upp på skärmen
        Object.assign(this.style, {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "80px",
            zIndex: "1000",
            pointerEvents: "none", // Gör att klick utanför hotbaren går igenom till spelet
        });

        // Skapa och lägg till hotbar-elementet
        this.hotbar = document.createElement("hotbar-ui") as Hotbar;
        this.appendChild(this.hotbar);
    }

    public destroy(): void {
        this.hotbar.destroy();
        this.remove();
    }
}

if (!customElements.get("header-ui")) {
    customElements.define("header-ui", Header);
}
