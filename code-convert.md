Fysikmotor och rörelselogik: 
Spelet har gått från att använda Phaser-Matter.js med cirkulära/fyrkantiga kroppar och handskriven kraftberäkning till en ny struktur där spelarens rörelse och interaktioner påverkas av ändrade hastighetsberäkningar och avsaknad av de ursprungliga raycast-kollisionerna.   

Kamerans rotation: Kamerafunktionen i Camera.ts har justerats från en mjuk interpolation baserad på spelarens position och fasta 90-graderssteg till en direkt vinkelberäkning med targetRotation = -angleToCenter + Math.PI / 2, vilket förändrar hur spelvyn roterar runt planeten.   

Blockhantering och kollisioner: Tidigare skapades och hanterades alla planetblock via Planet.ts och optimerades med sammansatta kroppar (PlanetOutline.ts), medan nya experimentella grepp riskerar att duplicera eller kringgå dessa kollisionskategorier (CATEGORY_TERRAIN, CATEGORY_LOOT, CATEGORY_PLAYER).   

Spelarkontroller och riktningar: Det avancerade systemet för 8-riktningshantering (up-right, down-left etc.) för ögon, vapen och gruvdrift har brutits ur eller förenklats, vilket gör att animationer och riktningsbaserade handlingar (som att svänga svärdet eller gräva i exakta vinklar) inte fungerar som det var tänkt från början.   

Klättrings- och hoppmekanik: Den gamla kodens automatiska klättring (canClimb) och raycast-baserade markkontroll (checkGroundedWithRay) har tagits bort, vilket gör att spelaren inte längre kan forcera kanter eller få samma fasta, stabila hoppkänsla.   

Interaktionssystem för raket och hus: Kopplingen mellan spelaren och raketen (Rocket.ts) samt husbyggandet (HouseManager.ts) är beroende av att spelarens kropp och världspositioner synkroniseras korrekt. När spelarens fysik och koordinatsystem ändras (t.ex. vid boardning och husinteraktioner) bryts logiken för att gå in i hus eller styra farkosten.   



Förlorad funktionalitet – översikt
🕹️ Player (störst förlust)
Raycast-markkontroll (checkGroundedWithRay()) – ersatt av en enkel radialVel > -5-check
Automatisk kantklättring (canClimb() + tween-animation) – helt borttagen
8-riktningssystem ("up-right", "up-left", osv.) – förenklat till bara "left"/"right"
setBoarded() – logiken för att gå ombord på raketen saknas
Utrustningsgrafik (drawEquipment()) – hjälm, kläder, skor ritas inte längre
Spawn-algoritm – ingen smart markvalidering vid spawn
🌍 Planet
Trädgenerering (generateSurfaceObjects() + buildTreeOutward()) – borttagen
Löv-kedjereakion (removeConnectedLeaves()) – borttagen
Loot-spawn – föremål kastas ut och plockas upp vid blockbrytning, helt borttaget
📷 Kamera
Pinch-zoom och mushjuls-zoom – borttaget
Kamerabyte raket↔spelare – borttaget
🏠 HouseManager
Husinteraktion (E-tangent, prompt-text, transparenta väggar) – borttaget
Blueprint ghost-rendering – borttaget
Oförstörbara husblock – borttaget
⛏️ Mining/Building
Tint-feedback (blinkande block vid skada) – borttaget
Musklick-mining/placering – borttaget
Överlappningskontroll med spelaren – borttaget
📱 Mobil / UI
VirtualJoystick och MobileControls skapas men kopplas inte in i spelloopen
💡 Viktigast att prioritera: markkontroll via raycast, kantklättring, loot-system och husinteraktion – det är kärnan i spelupplevelsen.