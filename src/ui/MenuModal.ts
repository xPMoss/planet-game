export class MenuModal extends HTMLElement {
    private container!: HTMLDivElement;
    private isOpen: boolean = false;

    connectedCallback() {
        this.classList.add("fixed", "inset-0", "z-50", "hidden");

        // Stäng modalen om man klickar på bakgrunden (backdrop)
        this.addEventListener("click", (e: MouseEvent) => {
            if (e.target === this) {
                e.stopPropagation();
                this.toggle();
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
            width: "300px", // Justera bredden efter behov för din meny
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
        this.updateVisibility();
        this.render();
    }

    public toggle(): void {
        this.isOpen = !this.isOpen;
        this.render();
    }

    private updateVisibility(): void {
        if (this.isOpen) {
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
        if (!this.isOpen) return;

        this.container.innerHTML = "";

        // --- Header ---
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";

        const title = document.createElement("h2");
        title.innerText = "Meny";
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
            this.toggle();
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        this.container.appendChild(header);

        // --- Innehåll i menyn ---
        const contentBox = document.createElement("div");
        Object.assign(contentBox.style, {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        });

        // Exempel på en knapp i menyn
        const sampleButton = document.createElement("button");
        sampleButton.innerText = "Alternativ 1";
        Object.assign(sampleButton.style, {
            padding: "10px",
            backgroundColor: "#333",
            border: "1px solid #555",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
        });
        sampleButton.addEventListener("click", () => {
            console.log("Alternativ 1 klickat");
        });

        contentBox.appendChild(sampleButton);
        this.container.appendChild(contentBox);
    }
}

if (!customElements.get("menu-modal")) {
    customElements.define("menu-modal", MenuModal);
}
