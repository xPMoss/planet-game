import Phaser from 'phaser';
import { GameConfig } from './GameConfig';
import { HotbarUI } from './ui/Hotbar';

new Phaser.Game(GameConfig);

new HotbarUI();
