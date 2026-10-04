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
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
        });

        // Skapa och lägg till hotbar-elementet
        this.hotbar = document.createElement("hotbar-ui") as Hotbar;
        this.appendChild(this.hotbar);

        const div = document.createElement("div");
        div.id = "menu-container";
        div.classList.add("relative", "flex", "gap-2", "mx-auto");

        const block = document.createElement("div");
        block.classList.add("w-[48px]", "h-[48px]", "bg-red-300");
        block.innerText = "TEST";

        div.appendChild(block);
        this.appendChild(div);
    }

    public destroy(): void {
        this.hotbar.destroy();
        this.remove();
    }
}

if (!customElements.get("header-ui")) {
    customElements.define("header-ui", Header);
}
