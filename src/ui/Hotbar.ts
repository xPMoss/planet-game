import { useGameStore } from '../store/useGameStore';
import { type ResourceType } from '../types/GameTypes';

interface HotbarItem {
    id: ResourceType;
    name: string;
    color: string;
    slotKey: string;
}

const HOTBAR_ITEMS: HotbarItem[] = [
    { id: 'wood', name: 'Wood', color: '#803030', slotKey: '1' },
    { id: 'dirt', name: 'Jord', color: '#8b5a2b', slotKey: '2' },
    { id: 'stone', name: 'Sten', color: '#808080', slotKey: '3' },
    { id: 'iron_ore', name: 'Järn', color: '#ff4500', slotKey: '4' },
    { id: 'gold_ore', name: 'Guld', color: '#f7c325', slotKey: '5' },
    { id: 'diamond', name: 'Diamant', color: '#00d5ff', slotKey: '6' },
];

export class HotbarUI {
    private container: HTMLDivElement;
    private buttons: Map<ResourceType, HTMLButtonElement> = new Map();
    private countElements: Map<ResourceType, HTMLSpanElement> = new Map();

    constructor() {
        this.container = document.createElement('div');
        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        Object.assign(this.container.style, {
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: '10',
            userSelect: 'none',
            padding: "16px",
        });
    }

    private createDomElements(): void {
        const state = useGameStore.getState();

        HOTBAR_ITEMS.forEach((item) => {
            const button = document.createElement('button');
            const isSelected = state.selectedResource === item.id;

            Object.assign(button.style, {
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.1s ease',
                border: isSelected ? '3px solid #ffffff' : '2px solid #444444',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.6)',
            });

            // Tangentindikator (1, 2, 3)
            const keyBadge = document.createElement('span');
            keyBadge.innerText = item.slotKey;
            Object.assign(keyBadge.style, {
                position: 'absolute',
                top: '3px',
                left: '5px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#aaaaaa',
            });

            // Färgförhandsvisning för blocket
            const colorPreview = document.createElement('div');
            Object.assign(colorPreview.style, {
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: '1px solid rgba(0,0,0,0.4)',
                backgroundColor: item.color,
            });

            // Antal block i inventoryt
            const countText = document.createElement('span');
            countText.innerText = String(state.inventory[item.id] || 0);
            Object.assign(countText.style, {
                position: 'absolute',
                bottom: '3px',
                right: '5px',
                fontSize: '12px',
                fontWeight: 'bold',
            });

            button.appendChild(keyBadge);
            button.appendChild(colorPreview);
            button.appendChild(countText);

            button.addEventListener('click', () => {
                useGameStore.getState().setSelectedResource(item.id);
            });

            this.buttons.set(item.id, button);
            this.countElements.set(item.id, countText);
            this.container.appendChild(button);
        });

        document.body.appendChild(this.container);
    }

    private setupEvents(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === '1') useGameStore.getState().setSelectedResource('dirt');
            if (event.key === '2') useGameStore.getState().setSelectedResource('stone');
            if (event.key === '3') useGameStore.getState().setSelectedResource('iron_ore');
        });
    }

    private subscribeToStore(): void {
        useGameStore.subscribe((state) => {
            HOTBAR_ITEMS.forEach((item) => {
                const button = this.buttons.get(item.id);
                const countText = this.countElements.get(item.id);

                if (button) {
                    const isSelected = state.selectedResource === item.id;
                    button.style.border = isSelected ? '3px solid #ffffff' : '2px solid #444444';
                    button.style.backgroundColor = isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.6)';
                }

                if (countText) {
                    countText.innerText = String(state.inventory[item.id] || 0);
                }
            });
        });
    }

    public destroy(): void {
        this.container.remove();
    }
}