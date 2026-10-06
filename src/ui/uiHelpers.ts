import type { Tool } from "types";

export function getToolIcon(tool?: Tool | null): string {
    if (!tool) return "";
    if (tool.type === "pickaxe") return "⛏️";
    if (tool.type === "axe") return "🪓";
    if (tool.type === "shovel") return "🧹";
    if (tool.type === "sword") return "⚔️️";
    return "";
}

export function renderSlotContent(
    parent: HTMLElement,
    options: {
        itemKey?: string | null;
        color?: string;
        isTool?: boolean;
        toolData?: Tool | null;
        count?: number;
        icon?: string;
    },
): void {
    parent.innerHTML = "";

    if (options.icon) {
        const badge = document.createElement("span");
        badge.innerText = options.icon;
        Object.assign(badge.style, {
            position: "absolute",
            top: "3px",
            left: "5px",
            fontSize: "11px",
            pointerEvents: "none",
        });
        parent.appendChild(badge);
    }

    if (options.isTool && options.itemKey) {
        const name = document.createElement("span");
        name.innerText = options.itemKey.split(" ")[0];
        Object.assign(name.style, {
            fontSize: "10px",
            fontWeight: "bold",
            color: "#ffd700",
            marginTop: options.icon ? "6px" : "0px",
            pointerEvents: "none",
        });

        parent.appendChild(name);

        if (options.toolData) {
            const power = document.createElement("span");
            power.innerText = "⚡" + options.toolData.power;
            Object.assign(power.style, {
                position: "absolute",
                bottom: "3px",
                right: "5px",
                fontSize: "10px",
                fontWeight: "bold",
                color: "#ffffff",
                pointerEvents: "none",
            });
            parent.appendChild(power);
        }
    } else if (options.color) {
        const colorBox = document.createElement("div");
        Object.assign(colorBox.style, {
            width: "28px",
            height: "28px",
            backgroundColor: options.color,
            borderRadius: "4px",
            border: "1px solid rgba(0,0,0,0.5)",
            pointerEvents: "none",
        });

        parent.appendChild(colorBox);

        if (typeof options.count === "number" && options.count > 0) {
            const countText = document.createElement("span");
            countText.innerText = String(options.count);
            Object.assign(countText.style, {
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#ffffff",
                textShadow: "1px 1px 2px #000",
                pointerEvents: "none",
            });
            parent.appendChild(countText);
        }
    }
}
