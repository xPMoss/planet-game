==================================================
📂 PROJEKTSTRUKTUR (TRÄDKARTA)
==================================================

planet-game/
├── CODE_REVIEW.md
├── GEMINI.md
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── pastebin.ts
├── planet-game.txt
├── public
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icons.svg
│   └── manifest.json
├── samla_kod.py
├── src
│   ├── GameConfig.ts
│   ├── assets
│   ├── counter.ts
│   ├── game
│   │   ├── Numpad.ts
│   │   ├── background
│   │   │   └── Starfield.ts
│   │   ├── camera
│   │   │   ├── Camera.ts
│   │   │   └── index.ts
│   │   ├── house
│   │   │   ├── House.ts
│   │   │   ├── HouseBlueprint.ts
│   │   │   ├── HouseManager.ts
│   │   │   ├── PlacedBlueprint.ts
│   │   │   └── index.ts
│   │   ├── managers
│   │   │   ├── BuildingManager.ts
│   │   │   ├── CombatManager.ts
│   │   │   ├── HighlightManager.ts
│   │   │   ├── MiningManager.ts
│   │   │   └── index.ts
│   │   ├── planet
│   │   │   ├── Planet.ts
│   │   │   ├── index.ts
│   │   │   ├── planetConfig.ts
│   │   │   ├── planetHelpers.ts
│   │   │   ├── planetOptimizer.ts
│   │   │   └── planetOutline.ts
│   │   ├── player
│   │   │   ├── Player.ts
│   │   │   ├── index.ts
│   │   │   ├── playerConfig.ts
│   │   │   └── playerHelpers.ts
│   │   └── rocket
│   │       ├── Rocket.ts
│   │       ├── index.ts
│   │       └── rocketHelpers.ts
│   ├── global-phaser.ts
│   ├── main.ts
│   ├── scenes
│   │   ├── DebugScene.ts
│   │   ├── MainScene.ts
│   │   └── index.ts
│   ├── store
│   │   ├── gameStoreHelpers.ts
│   │   ├── gameStoreTypes.ts
│   │   ├── index.ts
│   │   └── useGameStore.ts
│   ├── style.css
│   ├── types
│   │   ├── GameTypes.ts
│   │   └── index.ts
│   └── ui
│       ├── Header.ts
│       ├── HealthBar.ts
│       ├── Hotbar.ts
│       ├── InventoryModal.ts
│       ├── MobileControls.ts
│       ├── ToolSlot.ts
│       ├── UITypes.ts
│       ├── VirtualJoystick.ts
│       ├── index.ts
│       └── uiHelpers.ts
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

==================================================



==================================================
📂 TYP: KONFIGURATION / PAKETHANTERING
📄 FIL: package-lock.json
==================================================

{
  "name": "planet-game",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "planet-game",
      "version": "0.0.0",
      "license": "ISC",
      "dependencies": {
        "bootstrap-icons": "^1.13.1",
        "phaser": "^4.2.1",
        "phaser-virtual-joystick": "^0.3.1",
        "phaser3-rex-plugins": "^1.80.20",
        "zustand": "^5.0.15"
      },
      "devDependencies": {
        "autoprefixer": "^10.6.1",
        "postcss": "^8.5.28",
        "tailwindcss": "^4.3.3",
        "typescript": "~6.0.2",
        "vite": "^8.3.0",
        "vite-tsconfig-paths": "^6.1.1"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.151.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.151.0.tgz",
      "integrity": "sha512-J1yXrIlNDZVzE3ada310xeAw7nH8yCAyLPuUIsjKatFPmfn5bS1oW+cM+QsGOtVWd5nhSpbwZWx/rue+r5Z+PA==",
      "dev": true,
      "funding": {
        "url": "https://github.com/sponsors/oxc-project"
      }
    },
    "node_modules/@rolldown/binding-android-arm-eabi": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.11.tgz",
      "integrity": "sha512-A5kXfGKvKWWZE0TtPrfsvT+q4Y5d1QG8gGUzpYjGydM+fARM9MuX90PrXYXe0XbsDVgyxxNzHo6giCj90bsFNw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.2.11.tgz",
      "integrity": "sha512-z6cTycz+iJ4PVkuL4HHW4DfTfoeU/2nqYYuSOrTmH7yHK5Y0LCOnA03V4ZNxavyVaU1oOqUgIg2klN/s+USGOA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.2.11.tgz",
      "integrity": "sha512-jShvqNtP6vDC6/A5JOAzbVV+DkgHqhl/ScVCJEbt+TUY6QYz7YnXcrg3sLtFBniro0f/Ld50ZwCWA6f7KYD1nQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.2.11.tgz",
      "integrity": "sha512-f2i2xiNWq1Z1l2++q2fuhZRdLAT3aqxD6vRNm1RAxpUoBcdqNB3C0s1Bt+K+PbEx2F5F4gQp6hqKkphCY/xF9w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.2.11.tgz",
      "integrity": "sha512-4Ir5FSOKIAMr4r0kExpt1s3bMgzJU3rA45AYOHtQpls0oNeqcYBKrWMlckrYH4KCfGLfkfn1tN1dmZPMVsdXow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.2.11.tgz",
      "integrity": "sha512-/gnRDM+39BROzAN/k1OZjDPnDMcZxB/0EUxKjONO5yVkNEvlsoMDrxGNKgZi/ttFriS2gwlDNzB65pvNbFOXIQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.2.11.tgz",
      "integrity": "sha512-PFaK8HwvAHbaKbBcDNQihjMKYvFnA5hiENx/l5tphTDz1E0WFp32l0A7aq7lyUwGsRw/xSrNIy/gIK4thrSCrw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.2.11.tgz",
      "integrity": "sha512-AskzJUIKRLPxkruR1wLKewGbOw+EYfU/9lOrBFj4AFrEA8hPpKFnODWNu2WLaNs0QNkEb9QIJufmVZZIL/bJlg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.2.11.tgz",
      "integrity": "sha512-qlUGAheh2yh8afH7QBgx0PrRHN85hKnNd78x8MeMhXivuevgd8vgf6/CstOzmNKY/lLTHvNTrPy98cLnAugzJw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.2.11.tgz",
      "integrity": "sha512-secpEad+0vCbSfn8upFySkDskv+bGPk3THSDS9Y89yc4rb4kzqHp8Dmyd9BkQW4SnhNXBZCl/6CrO//hZahNJQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.2.11.tgz",
      "integrity": "sha512-mOVBT3dPpkWm8XBWPmU4bf+U6dYDLeMo/9ojUmis4N0L5uu10qra5vOyngZ7/PSdoE4G9KvRt4bloRxNjLas7A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.2.11.tgz",
      "integrity": "sha512-Is78i9A8Ui4SqcxUwFJ9uMmjDn58IbVTjFWYdQestFEgeuEmHMLGNriXnVJKkwG2YiZjw8cP0zCTyDMdDGtOOg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.2.11.tgz",
      "integrity": "sha512-dUCXneZ87INUMyQ0D+C0HrEBNUPNXHaPmU5GTjyKTJEiussw9Kaj5Ln8UztPe4epV/ffvgNBEadksdYhmW6xJA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.2.11.tgz",
      "integrity": "sha512-jByxb6qfd+bH1xUd0qnfFnb17i9sWBPY2tOavJ0l3tdr3OTu+Kvtm8cd/JV5nFt657b1VqGltxg9olOEfofXWw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.11.tgz",
      "integrity": "sha512-/PzKqzAJ03i19oy2ItPvyvaVjOjBCNnfaJs8yvUdGBKmiESgnrJSQ2awd81QzFbbnAmu7YO9ZnJrDCb9VSJPRA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "dev": true
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q=="
    },
    "node_modules/autoprefixer": {
      "version": "10.6.1",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.6.1.tgz",
      "integrity": "sha512-cL1Qz6ADZhcEbny/8HPfe99J6HhNoYtpX2LFLIbhgGE7Q1hlQVkYFdetDN7Id3KiQxhDrHwzlHr/YQCnZ8+xSA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "browserslist": "^4.28.9",
        "caniuse-lite": "^1.0.30001810",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.26",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.26.tgz",
      "integrity": "sha512-GLQdD3y6UF8iVuMJl5fHgE4jdn/ua7n+toKfLgNlg3BqQtOZjpy68T8Tup8/wGWZCDlm7KMg7tPb4MPn7oN0TQ==",
      "dev": true,
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/bootstrap-icons": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/bootstrap-icons/-/bootstrap-icons-1.13.1.tgz",
      "integrity": "sha512-ijombt4v6bv5CLeXvRWKy7CuM3TRTuPEuGaGKvTV5cz65rQSY8RQ2JcHt6b90cBBAC7s8fsf2EkQDldzCoXUjw==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/twbs"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/bootstrap"
        }
      ]
    },
    "node_modules/browserslist": {
      "version": "4.29.3",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.29.3.tgz",
      "integrity": "sha512-1R4kiYKXGViqEN0CnoDrXc1StD9niAwu+j2dukWzrD4bJgsD4lDmEp0CRbc6E/vYJIfTHwPmwyaKtVSudICdPA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "baseline-browser-mapping": "^2.11.26",
        "caniuse-lite": "^1.0.30001813",
        "electron-to-chromium": "^1.5.439",
        "node-releases": "^2.0.57",
        "update-browserslist-db": "^1.3.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001814",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001814.tgz",
      "integrity": "sha512-/Uaf1lAzr59XcMpW0o96WoEfr+VXK2OX4U9AgFoiSHsVJ4HppnIFUjtYzsyDH2+tgANaQb2/oxYGwCPapN1FpA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ]
    },
    "node_modules/cross-fetch": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/cross-fetch/-/cross-fetch-4.0.0.tgz",
      "integrity": "sha512-e4a5N8lVvuLgAWgnCrLr2PP0YyDOTHa9H/Rj54dirp61qXnNq46m82bRhNqIA5VccJtWBvPTFRV3TtvHUKPB1g==",
      "dependencies": {
        "node-fetch": "^2.6.12"
      }
    },
    "node_modules/dagre": {
      "version": "0.8.5",
      "resolved": "https://registry.npmjs.org/dagre/-/dagre-0.8.5.tgz",
      "integrity": "sha512-/aTqmnRta7x7MCCpExk7HQL2O4owCT2h8NT//9I1OQ9vt29Pa0BzSAkR5lwFUcQ7491yVi/3CXU9jQ5o0Mn2Sw==",
      "dependencies": {
        "graphlib": "^2.1.8",
        "lodash": "^4.17.15"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.443",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.443.tgz",
      "integrity": "sha512-TDJG36L9A3CWWwZ97HKaE+Iz1sW80pNp6sAU0owzCIV3Zc9eVyRqZK8Vz6NKuMIU8WjP0pIkoqCa0VRf/yFD0Q==",
      "dev": true
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/eventemitter3": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.4.tgz",
      "integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw=="
    },
    "node_modules/events": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
      "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
      "engines": {
        "node": ">=0.8.x"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/globrex": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/globrex/-/globrex-0.1.2.tgz",
      "integrity": "sha512-uHJgbwAMwNFf5mLst7IWLNg14x1CkeqglJb/K3doi4dw6q2IvAAmM/Y81kevy83wP+Sst+nutFTYOGg3d1lsxg==",
      "dev": true
    },
    "node_modules/graphlib": {
      "version": "2.1.8",
      "resolved": "https://registry.npmjs.org/graphlib/-/graphlib-2.1.8.tgz",
      "integrity": "sha512-jcLLfkpoVGmH7/InMC/1hIvOPSUh38oJtGhvrOFGzioE1DZ+0YW16RgmOJhHiuWTvGiJQ9Z1Ik43JvkRPRvE+A==",
      "dependencies": {
        "lodash": "^4.17.15"
      }
    },
    "node_modules/graphology": {
      "version": "0.25.4",
      "resolved": "https://registry.npmjs.org/graphology/-/graphology-0.25.4.tgz",
      "integrity": "sha512-33g0Ol9nkWdD6ulw687viS8YJQBxqG5LWII6FI6nul0pq6iM2t5EKquOTFDbyTblRB3O9I+7KX4xI8u5ffekAQ==",
      "dependencies": {
        "events": "^3.3.0",
        "obliterator": "^2.0.2"
      },
      "peerDependencies": {
        "graphology-types": ">=0.24.0"
      }
    },
    "node_modules/graphology-types": {
      "version": "0.24.8",
      "resolved": "https://registry.npmjs.org/graphology-types/-/graphology-types-0.24.8.tgz",
      "integrity": "sha512-hDRKYXa8TsoZHjgEaysSRyPdT6uB78Ci8WnjgbStlQysz7xR52PInxNsmnB7IBOM1BhikxkNyCVEFgmPKnpx3Q==",
      "peer": true
    },
    "node_modules/i18next": {
      "version": "22.5.1",
      "resolved": "https://registry.npmjs.org/i18next/-/i18next-22.5.1.tgz",
      "integrity": "sha512-8TGPgM3pAD+VRsMtUMNknRz3kzqwp/gPALrWMsDnmC1mKqJwpWyooQRLMcbTwq8z8YwSmuj+ZYvc+xCuEpkssA==",
      "funding": [
        {
          "type": "individual",
          "url": "https://locize.com"
        },
        {
          "type": "individual",
          "url": "https://locize.com/i18next.html"
        },
        {
          "type": "individual",
          "url": "https://www.i18next.com/how-to/faq#i18next-is-awesome.-how-can-i-support-the-project"
        }
      ],
      "dependencies": {
        "@babel/runtime": "^7.20.6"
      }
    },
    "node_modules/i18next-http-backend": {
      "version": "2.7.3",
      "resolved": "https://registry.npmjs.org/i18next-http-backend/-/i18next-http-backend-2.7.3.tgz",
      "integrity": "sha512-FgZxrXdRA5u44xfYsJlEBL4/KH3f2IluBpgV/7riW0YW2VEyM8FzVt2XHAOi6id0Ppj7vZvCZVpp5LrGXnc8Ig==",
      "dependencies": {
        "cross-fetch": "4.0.0"
      }
    },
    "node_modules/js-yaml": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.3.2.tgz",
      "integrity": "sha512-SFNOvSJ+Dgf/9An904Yx+CgSlIPCkIpao4qo51lpee25TIRejdH3rhR4EZMGoNx3/TP3O+wzWuiTFl4sqbltzA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/puzrin"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/nodeca"
        }
      ],
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",
      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",
      "dev": true,
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.33.0",
        "lightningcss-darwin-arm64": "1.33.0",
        "lightningcss-darwin-x64": "1.33.0",
        "lightningcss-freebsd-x64": "1.33.0",
        "lightningcss-linux-arm-gnueabihf": "1.33.0",
        "lightningcss-linux-arm64-gnu": "1.33.0",
        "lightningcss-linux-arm64-musl": "1.33.0",
        "lightningcss-linux-x64-gnu": "1.33.0",
        "lightningcss-linux-x64-musl": "1.33.0",
        "lightningcss-win32-arm64-msvc": "1.33.0",
        "lightningcss-win32-x64-msvc": "1.33.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",
      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",
      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz",
      "integrity": "sha512-Z5UPAxzrjlWNNyGy6i65cJzzvgJ5D3T6wMvs+gWpY9d7qRhANrxqAp6LhxIgZhWEw18RfJTGcRxjuLIBr+m8XQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz",
      "integrity": "sha512-QQM/Ti/hQajJwCY+RiWuCZ9sdtI/XQk7nDK5vC8kkdwixezOlDgvDx7+RT+QjK6FcFT4MpsuoBnHIo/O3StRRg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz",
      "integrity": "sha512-N7FVBe6iS24MlM6R/4RBTxGhQheZGs7tiQ9U32UtF75NzP5Q7xWPRqLBCKxlRQRk3rY1jCIPLzx7WzOhuUIRLQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz",
      "integrity": "sha512-j2v/itmy4HlNxlc6voKXYgBqNi0Ng2LShg4z7GufpEgs05P+2suBVyi9I6YHq5uoVFx9ETin3eCEhLVyXGQnKg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz",
      "integrity": "sha512-yiO5ROMuYQgXbC60yjZU5CYSFZGKXL0HFATXt9mHJn1+zW55oCtMI9NfcVhYLMFDL7gV7oBPon/EmMMGg2OvtQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz",
      "integrity": "sha512-ar+Ju7LmcN0Jo4FpL4hpFybwNG9/3A/Br5KW2n2jyODg3MEZXaDYADdemoNS+BDNfMgKvylJLj4S5tyRActuAg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz",
      "integrity": "sha512-RYiYbkokw0trfKqqzfF55lginwEPrD3OJDfTuJzFs1MK6iFnDenaz1fqLLtX4ITG3OktJQXOeTaw1awrBAlZPw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz",
      "integrity": "sha512-1K+MPfLSFVpphzpdbfkhlWk6wBrTObBzS2T6db10PNOZgR9GoVsAWzwNyuhUYYbTp23j+4RrncfujZ4uAzXvwA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz",
      "integrity": "sha512-OlEICDx/Xl0FqSp4bry8zFnCvGpig3Gl4gCquvYwHuqJKEC1+n9NgDniFvqHGmMv1ZkqDJrDqKKSykTDX+ehuA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lodash": {
      "version": "4.18.1",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",
      "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q=="
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true
    },
    "node_modules/mustache": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/mustache/-/mustache-4.2.0.tgz",
      "integrity": "sha512-71ippSywq5Yb7/tVYyGbkBggbU8H3u5Rz56fH60jGFgr8uHwxs+aSKeqmluIVzM0m0kB7xQjKS6qPfd0b2ZoqQ==",
      "bin": {
        "mustache": "bin/mustache"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.19",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz",
      "integrity": "sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-fetch": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.7.0.tgz",
      "integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      },
      "peerDependencies": {
        "encoding": "^0.1.0"
      },
      "peerDependenciesMeta": {
        "encoding": {
          "optional": true
        }
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.57",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.57.tgz",
      "integrity": "sha512-kQK9LGGFiHtrWiNhZtA7Qbw17AQz+dmsEKODRIVTXA9+e5MS/2gZEBhYJt13GrAz5/IOZKddH/0Z3TP/Zgo+yw==",
      "dev": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/obliterator": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/obliterator/-/obliterator-2.0.5.tgz",
      "integrity": "sha512-42CPE9AhahZRsMNslczq0ctAEtqk8Eka26QofnqC346BZdHDySk3LWka23LI7ULIw11NmltpiLagIq8gBozxTw=="
    },
    "node_modules/papaparse": {
      "version": "5.7.0",
      "resolved": "https://registry.npmjs.org/papaparse/-/papaparse-5.7.0.tgz",
      "integrity": "sha512-qBGxg/7Q3Kl9Wfhrz2Z74UnvnHTXLNG6jmKJFeBvP2+y4lV7So+7SR62+Zd47JvdrCkX+nDcnr0ObPzek/+6RA=="
    },
    "node_modules/phaser": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/phaser/-/phaser-4.2.1.tgz",
      "integrity": "sha512-WUNwCPJpdjvZiuT6SgCfYVW8Qw/3j0jJ4ws7P2QkhFLFu74sbGuyHJcbFueGkY/AYO4Pi47bNQXn1OCJeLX//w==",
      "dependencies": {
        "eventemitter3": "^5.0.4"
      }
    },
    "node_modules/phaser-virtual-joystick": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/phaser-virtual-joystick/-/phaser-virtual-joystick-0.3.1.tgz",
      "integrity": "sha512-GFdnCGZgVFrGwDXATspZRXYBEMujG59GhJYu24iazqGbgzsAtBaCFHtrrWQ05TqCN88FaUwRU1jCRFXdEKKpYw==",
      "peerDependencies": {
        "phaser": "*"
      }
    },
    "node_modules/phaser3-rex-plugins": {
      "version": "1.80.20",
      "resolved": "https://registry.npmjs.org/phaser3-rex-plugins/-/phaser3-rex-plugins-1.80.20.tgz",
      "integrity": "sha512-XZLUy74r1jUaRWpGplRhhA+wEeOvnNb0qlhlyMtwdwZwIlCA7C7WtgvynOB/PyVrzS09cUBwEFyG+A3P5fL+Uw==",
      "dependencies": {
        "dagre": "^0.8.5",
        "eventemitter3": "^3.1.2",
        "graphology": "^0.25.4",
        "i18next": "^22.5.1",
        "i18next-http-backend": "^2.5.2",
        "js-yaml": "^4.1.0",
        "mustache": "^4.2.0",
        "papaparse": "^5.4.1",
        "webfontloader": "^1.6.28"
      }
    },
    "node_modules/phaser3-rex-plugins/node_modules/eventemitter3": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-3.1.2.tgz",
      "integrity": "sha512-tvtQIeLVHjDkJYnzf2dgVMxfuSGJeM/7UCG17TT4EumTfNtF+0nebF/4zWOIkCreAbtNqhGEboB6BWrwqNaw4Q=="
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true
    },
    "node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.28",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.28.tgz",
      "integrity": "sha512-RRuzqDtt5Y9h3quz5hWhK+TPnsmVs6WwSU6LkJMeY4HstUEDuYTG8UJSdawMRzmzAtV+KEoG8N3Qg2qLy5vM/A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "nanoid": "^3.3.18",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true
    },
    "node_modules/rolldown": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.2.11.tgz",
      "integrity": "sha512-qpSwIyz0jHQq5qXBTNxFmE6664rJ7O+4TvPFOiOaBSrz8IOHc1koKKSqTM2H6u1UG1+TveuC6vaDHKXFOvb1Kw==",
      "dev": true,
      "dependencies": {
        "@oxc-project/types": "=0.151.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm-eabi": "1.2.11",
        "@rolldown/binding-android-arm64": "1.2.11",
        "@rolldown/binding-darwin-arm64": "1.2.11",
        "@rolldown/binding-darwin-x64": "1.2.11",
        "@rolldown/binding-freebsd-x64": "1.2.11",
        "@rolldown/binding-linux-arm-gnueabihf": "1.2.11",
        "@rolldown/binding-linux-arm64-gnu": "1.2.11",
        "@rolldown/binding-linux-arm64-musl": "1.2.11",
        "@rolldown/binding-linux-ppc64-gnu": "1.2.11",
        "@rolldown/binding-linux-s390x-gnu": "1.2.11",
        "@rolldown/binding-linux-x64-gnu": "1.2.11",
        "@rolldown/binding-linux-x64-musl": "1.2.11",
        "@rolldown/binding-openharmony-arm64": "1.2.11",
        "@rolldown/binding-win32-arm64-msvc": "1.2.11",
        "@rolldown/binding-win32-x64-msvc": "1.2.11"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "dev": true
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw=="
    },
    "node_modules/typescript": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-6.0.3.tgz",
      "integrity": "sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==",
      "dev": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.3.tgz",
      "integrity": "sha512-pJ2sYawQS0R/WI928Gj5GlPhTGzbMelq0+4INtSYNDV9ErKJcX6xjGWkoG/VnB3dpUm00zALaqkrUD77pO5TDQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/vite": {
      "version": "8.3.1",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.3.1.tgz",
      "integrity": "sha512-/bvH9E9tmCXRGp2uXY3WbOldqpTwFkbha/8ANaEQ6VkxhH60KyqLwgZq6lG2y+4uT55x9+9eUHMpQ7uGnOCKjA==",
      "dev": true,
      "dependencies": {
        "lightningcss": "^1.33.0",
        "picomatch": "^4.0.7",
        "postcss": "^8.5.28",
        "rolldown": "~1.2.9",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.7.1",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite-tsconfig-paths": {
      "version": "6.1.1",
      "resolved": "https://registry.npmjs.org/vite-tsconfig-paths/-/vite-tsconfig-paths-6.1.1.tgz",
      "integrity": "sha512-2cihq7zliibCCZ8P9cKJrQBkfgdvcFkOOc3Y02o3GWUDLgqjWsZudaoiuOwO/gzTzy17cS5F7ZPo4bsnS4DGkg==",
      "dev": true,
      "dependencies": {
        "debug": "^4.1.1",
        "globrex": "^0.1.2",
        "tsconfck": "^3.0.3"
      },
      "peerDependencies": {
        "vite": "*"
      }
    },
    "node_modules/vite-tsconfig-paths/node_modules/tsconfck": {
      "version": "3.1.6",
      "resolved": "https://registry.npmjs.org/tsconfck/-/tsconfck-3.1.6.tgz",
      "integrity": "sha512-ks6Vjr/jEw0P1gmOVwutM3B7fWxoWBL2KRDb1JfqGVawBmO5UsvmWOQFGHBPl5yxYz4eERr19E6L7NMv+Fej4w==",
      "deprecated": "unmaintained",
      "dev": true,
      "bin": {
        "tsconfck": "bin/tsconfck.js"
      },
      "engines": {
        "node": "^18 || >=20"
      },
      "peerDependencies": {
        "typescript": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/vite-tsconfig-paths/node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "optional": true,
      "peer": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/webfontloader": {
      "version": "1.6.28",
      "resolved": "https://registry.npmjs.org/webfontloader/-/webfontloader-1.6.28.tgz",
      "integrity": "sha512-Egb0oFEga6f+nSgasH3E0M405Pzn6y3/9tOVanv/DLfa1YBIgcv90L18YyWnvXkRbIM17v5Kv6IT2N6g1x5tvQ=="
    },
    "node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ=="
    },
    "node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.15",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.15.tgz",
      "integrity": "sha512-MpSEjRiBkA9crSYeOUH32rJC7SVqAbm0Fqcqge/bUi2PPoLcBWKOsG+C8mevmpr8TwXHBVkChbbJiyvkE+i/3A==",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}


==================================================
📂 TYP: KONFIGURATION / PAKETHANTERING
📄 FIL: package.json
==================================================

{
  "name": "planet-game",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "autoprefixer": "^10.6.1",
    "postcss": "^8.5.28",
    "tailwindcss": "^4.3.3",
    "typescript": "~6.0.2",
    "vite": "^8.3.0",
    "vite-tsconfig-paths": "^6.1.1"
  },
  "dependencies": {
    "bootstrap-icons": "^1.13.1",
    "phaser": "^4.2.1",
    "phaser-virtual-joystick": "^0.3.1",
    "phaser3-rex-plugins": "^1.80.20",
    "zustand": "^5.0.15"
  },
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}


==================================================
📂 TYP: KONFIGURATION / PAKETHANTERING
📄 FIL: tailwind.config.js
==================================================

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

==================================================
📂 TYP: KONFIGURATION / PAKETHANTERING
📄 FIL: tsconfig.json
==================================================

{
  "compilerOptions": {
    "target": "es2023",
    "module": "esnext",
    "lib": ["ES2023", "DOM"],
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,

    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,

    "paths": {
      "@/*": ["./src/*"],
      "src/*": ["./src/*"],
      "camera": ["./src/game/camera"],
      "managers": ["./src/game/managers"],
      "house": ["./src/game/house"],
      "player": ["./src/game/player"],
      "planet": ["./src/game/planet"],
      "rocket": ["./src/game/rocket"],
      "scenes": ["./src/scenes"],
      "ui": ["./src/ui"],
      "store": ["./src/store"],
      "types": ["./src/types"],
    },
  },
  "include": ["src", "old/Rocket copy.ts"],
}


==================================================
📂 TYP: KONFIGURATION / PAKETHANTERING
📄 FIL: vite.config.ts
==================================================

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: "/planet-game/",
    plugins: [tsconfigPaths()],
    build: {
        outDir: "docs",
        emptyOutDir: true,
    },
    server: {
        host: true,
    },
});


==================================================
📂 TYP: KÄLLKOD
📄 FIL: CODE_REVIEW.md
==================================================



==================================================
📂 TYP: KÄLLKOD
📄 FIL: GEMINI.md
==================================================



==================================================
📂 TYP: KÄLLKOD
📄 FIL: index.html
==================================================

<!DOCTYPE html>
<html lang="sv">

  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Planet Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"/>
    <link href="/node_modules/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet"/>
    <link rel="manifest" href="/manifest.json">

  </head>

  <body class="font-family 'Orbitron', sans-serif">
    <div id="game-container" class="w-dvw h-dvh"></div>

    <script type="module" src="/src/main.ts"></script>
  </body>

</html>


==================================================
📂 TYP: KÄLLKOD
📄 FIL: pastebin.ts
==================================================

import Phaser from "phaser";
import { Planet } from "./Planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture } from "./playerHelpers";

export class Player {
    private scene: Phaser.Scene;
    private planet: Planet;
    public sprite: Phaser.Physics.Matter.Sprite;
    private readonly settings: PlayerSettings;

    private gravityStrength: number = 0.001;
    private moveSpeed: number = 0.001;
    private jumpForce: number = 0.005;
    private isGrounded: boolean = false;
    private maxVelocity: number = 8;

    private hat: Phaser.GameObjects.Sprite;
    private facingRight: boolean = true;

    // Återanvänd Vector2-objekt för att undvika Garbage Collection
    private gravityVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
    private moveVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
    private jumpVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
        this.settings = { ...DEFAULT_PLAYER_SETTINGS };

        // Stäng av den globala gravitationen i Matter-världen
        this.scene.matter.world.setGravity(0, 0);

        // Skapa spriten på planetens skapade yta
        const startX = planet.center.x;
        const startY = planet.center.y - (planet.config.radius * planet.config.blockSize + 20);

        this.sprite = this.scene.matter.add.sprite(startX, startY, "player_tile");

        const body = this.scene.matter.bodies.rectangle(startX, startY, this.settings.width, this.settings.height, {
            friction: 0.1,
            frictionAir: 0.05,
            restitution: 0,
            chamfer: { radius: 4 },
        });
        this.sprite.setDisplaySize(this.settings.width, this.settings.height);

        if (this.sprite.body) {
            const body = this.sprite.body as MatterJS.BodyType;

            // Aktivera kontinuerlig kollision på Matter-kroppen
            (body as unknown as { isContinuous: boolean }).isContinuous = true;
        }

        // Gör spriten sensor-aktig eller justera fysiken så den inte krockar konstigt
        this.sprite.setExistingBody(body);
        this.sprite.setFixedRotation();

        this.scene.matter.world.on("collisionstart", (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
            event.pairs.forEach((pair) => {
                //console.log("collisionstart", pair, this.sprite.body);
                if (pair.bodyA === this.sprite.body || pair.bodyB === this.sprite.body) {
                    this.isGrounded = true;
                }
            });
        });

        console.log("Player body:", this.sprite.body);
    }

    public spawn(): void {
        if (this.scene.textures.exists("player_tile")) {
            console.log("Texture exists");
        }

        // Skapa hattexturen om den inte redan finns
        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", 0xff0000);
            this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
            this.hat.setOrigin(0.5, 1);
        }
    }

    public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        const velocity = this.sprite.body.velocity;
        const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

        if (currentSpeed > this.maxVelocity) {
            // Räkna ut skalfaktorn för att sänka hastigheten till maxVelocity
            const scale = this.maxVelocity / currentSpeed;

            this.scene.matter.body.setVelocity(this.sprite.body as MatterJS.BodyType, {
                x: velocity.x * scale,
                y: velocity.y * scale,
            });
        }

        if (cursors.space.isDown) {
            console.log("update", cursors, this.isGrounded);
        }

        const playerPos = this.sprite.body.position;
        const center = this.planet.center;

        // 1. Beräkna riktningsvektor mot centrum
        const dx = center.x - playerPos.x;
        const dy = center.y - playerPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        // Enhetsvektor riktad mot centrum
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Applicera konstant gravitation mot centrum
        this.gravityVector.set(dirX * this.gravityStrength, dirY * this.gravityStrength);
        this.sprite.applyForce(this.gravityVector);

        // Beräkna kontinuerlig vinkel mot centrum
        const rawAngle = Math.atan2(dy, dx) - Math.PI / 2;
        // Snappa till närmaste 90-graderssteg (PI / 2 radianer)
        const snapAngle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);
        this.sprite.setRotation(snapAngle);

        // Tangentiell rörelse (Vänster / Höger)
        const tangentX = dirY;
        const tangentY = -dirX;

        /*
// I Player.ts update():
if (cursors.left.isDown) {
  this.sprite.setVelocity(
    this.sprite.body.velocity.x - tangentX * 0.5,
    this.sprite.body.velocity.y - tangentY * 0.5
  );
} else if (cursors.right.isDown) {
  this.sprite.setVelocity(
    this.sprite.body.velocity.x + tangentX * 0.5,
    this.sprite.body.velocity.y + tangentY * 0.5
  );
}

        */

        const currentVel = this.sprite.body.velocity;
        const targetSpeed = 4; // Önskad rörelsehastighet

        if (cursors.left.isDown) {
            // Bevara befintlig hastighet mot/från centrum, men sätt tangenten
            this.sprite.setVelocity(-tangentX * targetSpeed + currentVel.x * 0.1, -tangentY * targetSpeed + currentVel.y * 0.1);
        }

        if (cursors.right.isDown) {
            this.sprite.setVelocity(tangentX * targetSpeed + currentVel.x * 0.1, tangentY * targetSpeed + currentVel.y * 0.1);
        }

        // I Player.ts (update-metoden under punkt 5 - Hopp):
        if (Phaser.Input.Keyboard.JustDown(cursors.up) && this.isGrounded) {
            const jumpSpeed = 8;

            // Beräkna riktningen "upp" utifrån spelarens egen rotation
            // (Inom Phaser/Math motsvarar sprite.rotation - Math.PI / 2 riktningen rakt upp från spriten)
            const upX = Math.cos(this.sprite.rotation - Math.PI / 2);
            const upY = Math.sin(this.sprite.rotation - Math.PI / 2);

            // Sätt hastigheten exakt i spelarens uppåt-riktning
            this.sprite.setVelocity(upX * jumpSpeed, upY * jumpSpeed);

            this.isGrounded = false;
        }

        /*
        if (cursors.left.isDown) {
            this.moveVector.set(-tangentX * this.moveSpeed, -tangentY * this.moveSpeed);
            this.sprite.applyForce(this.moveVector);
            this.facingRight = false;
        }

        if (cursors.right.isDown) {
            this.moveVector.set(tangentX * this.moveSpeed, tangentY * this.moveSpeed);
            this.sprite.applyForce(this.moveVector);
            this.facingRight = true;
        }
           
        // Hopp (Aktivt endast när spelaren står på marken)
        if ((cursors.space.isDown && this.isGrounded) || (Phaser.Input.Keyboard.JustDown(cursors.up) && this.isGrounded)) {
            console.log("HOPPAR");
            // Slungar spelaren rakt ut från centrum (motsatt riktning mot dirX/dirY)
            this.jumpVector.set(-dirX * this.jumpForce, -dirY * this.jumpForce);
            this.sprite.applyForce(this.jumpVector);

            this.isGrounded = false;
        }

         */

        this.updateHatPosition();
    }

    private updateHatPosition(): void {
        if (!this.hat || !this.sprite) return;

        // Använd spelarens snappade rotation för att beräkna hattens "uppåt"-vektor
        const currentRotation = this.sprite.rotation;
        const upAngle = currentRotation - Math.PI / 2;

        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);

        const headOffset = this.settings.height / 2;

        this.hat.setPosition(this.sprite.x + upX * headOffset, this.sprite.y + upY * headOffset);

        this.hat.setRotation(currentRotation);
        this.hat.setFlipX(!this.facingRight);
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: README.md
==================================================

# planet-game

==================================================
📂 TYP: KÄLLKOD
📄 FIL: public\manifest.json
==================================================

{
  "name": "PlanetGame",
  "short_name": "PlanetGame",
  "description":"PlanetGame",
  "start_url": "./",
  "scope": "./",
  "display": "fullscreen",
  "display_override": [ "fullscreen", "standalone" ],
  "background_color": "#3D4C5C",
  "theme_color": "#3D4C5C",
  "prefer_related_applications": false,
  "launch_handler": {
    "client_mode": [ "focus-existing", "auto" ]
  },
  "icons": [
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ]
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\counter.ts
==================================================

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\GameConfig.ts
==================================================

import Phaser from "phaser";
import { DebugScene, MainScene } from "scenes";

export const PhysicsConfig = {
  // Fysik-iterations för Matter.js (förhindrar penetration)
  positionIterations: 24, // DEFAULT 6
  velocityIterations: 24,
  constraintIterations: 24,
} as const;

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  backgroundColor: "#1a1a2e",
  disableContextMenu: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "100%",
    height: "100%",
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 0 },
      runner: {
        fps: 60,
      },
      positionIterations: PhysicsConfig.positionIterations,
      velocityIterations: PhysicsConfig.velocityIterations,
      constraintIterations: PhysicsConfig.constraintIterations,
      debug: true,
    },
  },
  scene: [MainScene, DebugScene],
};


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\global-phaser.ts
==================================================

import Phaser from "phaser";

(window as unknown as { Phaser: typeof Phaser }).Phaser = Phaser;


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\main.ts
==================================================

import Phaser from "phaser";
import { GameConfig } from "./GameConfig";

new Phaser.Game(GameConfig);


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\style.css
==================================================

@import "tailwindcss";


html, body {
  margin: 0;
  padding: 0;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
}

#game-container {
  width: 100%;
  height: 100%;
}

==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\Numpad.ts
==================================================

import Phaser from "phaser";

export class Numpad extends Phaser.Scene {
    // Deklarera ett objekt för att hålla tangentreferenserna
    private numpadKeys!: { [key: string]: Phaser.Input.Keyboard.Key };

    constructor() {
        super({ key: "NumpadScene" });
    }

    public create(): void {
        if (!this.input.keyboard) return;

        // 1. Registrera alla numpad-tangenter (NUMPAD_ZERO till NUMPAD_NINE)
        this.numpadKeys = {
            0: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO),
            1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
            2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
            3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
            4: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR),
            5: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
            6: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX),
            7: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN),
            8: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT),
            9: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE),
        };

        // Alternativ A: Lyssna via Event Listeners (rekommenderas för enstaka tryck)
        Object.keys(this.numpadKeys).forEach((num) => {
            this.numpadKeys[num].on("down", () => {
                this.handleNumpadPress(Number(num));
            });
        });
    }

    public update(): void {
        // Alternativ B: Kontrollera status direkt i spelloopen (update)
        if (Phaser.Input.Keyboard.JustDown(this.numpadKeys["1"])) {
            console.log("Siffra 1 trycktes ned i update-loopen!");
        }
    }

    private handleNumpadPress(digit: number): void {
        console.log("Du tryckte på numpad: " + digit);
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\background\Starfield.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "planet";

interface Star {
    x: number;
    y: number;
    size: number;
    alpha: number;
    baseAlpha: number;
    twinkleSpeed: number;
    color: number;
}

export class Starfield {
    private scene: Phaser.Scene;
    private graphics: Phaser.GameObjects.Graphics;
    private stars: Star[] = [];

    constructor(scene: Phaser.Scene, planet: Planet, starCount: number = 300) {
        this.scene = scene;

        // Sätt lågt depth (t.ex. -100) så att bakgrunden hamnar bakom alla spritar och terräng
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(-100);

        // Beräkna radien för stjärnfältet baserat på planetens storlek
        const mapSizePixels = planet.config.radius * 2 * planet.config.blockSize;
        const spawnRadius = mapSizePixels * 1.5;

        this.generateStars(planet.center.x, planet.center.y, spawnRadius, starCount);
    }

    private generateStars(centerX: number, centerY: number, radius: number, count: number): void {
        const starColors = [0xffffff, 0xffe4e1, 0xb0e0e6, 0xfff8dc]; // Vita, lätt blåa, rosa och gula stjärnor

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Slumpmässigt avstånd för jämn spridning i en cirkel runt planeten
            const dist = Math.sqrt(Math.random()) * radius;

            const x = centerX + Math.cos(angle) * dist;
            const y = centerY + Math.sin(angle) * dist;

            const size = Math.random() < 0.85 ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1.5;
            const baseAlpha = Math.random() * 0.6 + 0.3;
            const twinkleSpeed = Math.random() * 0.003;
            const color = starColors[Math.floor(Math.random() * starColors.length)];

            this.stars.push({
                x,
                y,
                size,
                alpha: baseAlpha,
                baseAlpha,
                twinkleSpeed,
                color,
            });
        }
    }

    public update(): void {
        this.graphics.clear();

        const time = this.scene.time.now;

        for (const star of this.stars) {
            // Skapa en mjuk tindrande effekt med Sinus
            const currentAlpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed) * 0.25;
            const clampedAlpha = Phaser.Math.Clamp(currentAlpha, 0.1, 1);

            this.graphics.fillStyle(star.color, clampedAlpha);
            this.graphics.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\camera\Camera.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "../planet/Planet";
import type { Player } from "../player/Player";

// Dubbellkolla pinch logik på mobilen

export class CameraController {
  private scene: Phaser.Scene;
  private camera: Phaser.Cameras.Scene2D.Camera;
  private planet: Planet;
  private player: Player;

  private defaultZoom: number = 1.8; // 1.8

  private prevPinchDistance: number = 0;
  private isFollowingTarget: boolean = true;
  private currentTarget?: Phaser.GameObjects.GameObject;

  constructor(
    scene: Phaser.Scene,
    planet: Planet,
    player: Player,
    camera?: Phaser.Cameras.Scene2D.Camera, // <--- Ta emot kameran som argument
  ) {
    this.scene = scene;
    this.planet = planet;
    this.player = player;
    this.camera = camera || scene.cameras.main;
    this.currentTarget = player?.sprite;
    this.setupZoomControls();
    this.camera.setZoom(this.defaultZoom);
  }

  public follow(target: Phaser.GameObjects.GameObject, targetZoom?: number): void {
    this.currentTarget = target;
    this.camera.startFollow(target, true, 0.1, 0.1);

    const zoom = targetZoom ?? this.defaultZoom;
    this.camera.zoomTo(zoom, 1000, "Cubic.easeInOut");

    this.camera.setFollowOffset(0, 0);
    this.isFollowingTarget = true;
  }

  public update(): void {
    this.handlePinchZoom();

    const isZoomedOut = this.camera.zoom < 0.5;
    const targetObj = (this.currentTarget as any) || this.player?.sprite;

    if (isZoomedOut) {
      if (this.isFollowingTarget) {
        this.camera.stopFollow();
        this.isFollowingTarget = false;
      }

      // Panorera mjukt manuellt mot centrum
      this.camera.scrollX = Phaser.Math.Linear(this.camera.scrollX, this.planet.center.x - this.camera.width / 2, 0.05);
      this.camera.scrollY = Phaser.Math.Linear(this.camera.scrollY, this.planet.center.y - this.camera.height / 2, 0.05);
    } else {
      if (!this.isFollowingTarget && targetObj) {
        this.camera.startFollow(targetObj, true, 0.1, 0.1);
        this.camera.setFollowOffset(0, 0);
        this.isFollowingTarget = true;
      }
    }

    // Kamera-rotation baserat på målobjektets position relativt planetcentrum
    if (targetObj) {
      const targetPos = {
        x: targetObj.x,
        y: targetObj.y,
      };
      const planetCenter = this.planet.center;
      const camera = this.camera as any;

      const angleToTarget = Phaser.Math.Angle.Between(planetCenter.x, planetCenter.y, targetPos.x, targetPos.y);

      const targetRotation = -angleToTarget - Math.PI / 2;
      const currentRotation = camera.rotation ?? 0;

      const rotationStep = Phaser.Math.Linear(0.015, 0.06, Phaser.Math.Clamp(this.camera.zoom / 1.8, 0, 1));

      const newRotation = Phaser.Math.Angle.RotateTo(currentRotation, targetRotation, rotationStep);

      camera.setRotation(newRotation);
    }
  }

  private setupZoomControls(): void {
    // Zoom via mushjul (Desktop)
    this.scene.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: unknown, _deltaX: number, deltaY: number) => {
      const zoomFactor = deltaY > 0 ? -0.15 : 0.15;
      const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);
      this.camera.setZoom(newZoom);
    });
  }

  private handlePinchZoom(): void {
    const p1 = this.scene.input.pointer1;
    const p2 = this.scene.input.pointer2;

    // Kontrollera att båda pekarna finns och är active/nedtryckta
    if (p1 && p2 && p1.active && p2.active && p1.isDown && p2.isDown) {
      const currentDistance = Phaser.Math.Distance.Between(p1.x, p1.y, p2.x, p2.y);

      if (this.prevPinchDistance > 0) {
        const distanceDelta = currentDistance - this.prevPinchDistance;
        const zoomFactor = distanceDelta * 0.003;
        const newZoom = Phaser.Math.Clamp(this.camera.zoom + zoomFactor, 0.3, 4);

        this.camera.setZoom(newZoom);
      }

      this.prevPinchDistance = currentDistance;
    } else {
      this.prevPinchDistance = 0;
    }
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\camera\index.ts
==================================================

export * from "./Camera";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\house\House.ts
==================================================

import Phaser from "phaser";

export interface HouseBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class House {
    public id: string;
    public bounds: HouseBounds;
    public doorGridPos: { x: number; y: number };
    public isPlayerInside: boolean = false;

    constructor(id: string, bounds: HouseBounds, doorGridPos: { x: number; y: number }) {
        this.id = id;
        this.bounds = bounds;
        this.doorGridPos = doorGridPos;
    }

    public containsPoint(gridX: number, gridY: number): boolean {
        return gridX > this.bounds.minX && gridX < this.bounds.maxX && gridY > this.bounds.minY && gridY < this.bounds.maxY;
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\house\HouseBlueprint.ts
==================================================

import { BlockType } from "types";

// Exempel på en ritning (6 block bred, 5 block hög)
export const HOUSE_BLUEPRINT = [
    [1, 1, 1, 1, 1, 1], // Tak
    [1, 0, 0, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 0, 0, 1], // Väggar & tom insida
    [1, 0, 0, 0, 0, 1], // Ingång/Väggar
    [1, 1, 1, 1, 1, 1], // Golv
];

export const BLUEPRINT_WIDTH = HOUSE_BLUEPRINT[0].length;
export const BLUEPRINT_HEIGHT = HOUSE_BLUEPRINT.length;


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\house\HouseManager.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "../planet/Planet";
import type { Player } from "../player/Player";
import { House, type HouseBounds } from "./House";
import { PlacedBlueprint } from "./PlacedBlueprint";
import { BlockType } from "../../types";
import { HOUSE_BLUEPRINT, BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT } from "./HouseBlueprint";

export class HouseManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;

    public houses: Map<string, House> = new Map();
    public placedBlueprints: PlacedBlueprint[] = [];

    public isPlacingBlueprint: boolean = false; // Om spelaren har ritningsverktyget aktivt

    private enterKey?: Phaser.Input.Keyboard.Key;
    private toggleBlueprintKey?: Phaser.Input.Keyboard.Key;
    private promptText: Phaser.GameObjects.Text;
    private guideGraphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        if (scene.input.keyboard) {
            this.enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            // Tryck på 'B' för att slå på/av ritningsplacering
            this.toggleBlueprintKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        }

        this.promptText = scene.add.text(0, 0, "[E] Gå in i huset", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            backgroundColor: "#000000aa",
            padding: { x: 6, y: 3 },
        });
        this.promptText.setDepth(100);
        this.promptText.setVisible(false);

        this.guideGraphics = scene.add.graphics();
        this.guideGraphics.setDepth(15);

        this.setupInput();
    }

    private setupInput(): void {
        // Klicka med vänstermus för att fästa/placera ut ritningen i världen
        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (!this.isPlacingBlueprint || !pointer.leftButtonDown()) return;

            const targetGrid = this.getHoverGridPosition();
            if (targetGrid) {
                this.placeBlueprintInWorld(targetGrid.x, targetGrid.y);
            }
        });
    }

    public update(): void {
        if (this.toggleBlueprintKey && Phaser.Input.Keyboard.JustDown(this.toggleBlueprintKey)) {
            this.isPlacingBlueprint = !this.isPlacingBlueprint;
            console.log("Ritningsläge:", this.isPlacingBlueprint ? "AKTIVT" : "INAKTIVT");
        }

        this.checkHousesForPlayer();
        this.renderGraphics();
    }

    /**
     * Sätter ner en ritning permanent i spelvärlden
     */
    public placeBlueprintInWorld(startGridX: number, startGridY: number): void {
        const id = startGridX + "," + startGridY + "_" + Date.now();
        const bp = new PlacedBlueprint(id, startGridX, startGridY, HOUSE_BLUEPRINT);

        this.placedBlueprints.push(bp);
        this.isPlacingBlueprint = false; // Stäng av placeringsläget efter klick

        // Stäm av om några block redan finns placerade där
        this.checkBlueprintProgress(bp);
    }

    /**
     * Anropas varje gång ett block placeras eller bryts ner på planeten
     */
    public checkForHouseAt(gridX: number, gridY: number): void {
        for (let i = this.placedBlueprints.length - 1; i >= 0; i--) {
            const bp = this.placedBlueprints[i];

            // Om blocket är inom ritningens område
            if (gridX >= bp.startGridX && gridX < bp.startGridX + bp.width && gridY >= bp.startGridY && gridY < bp.startGridY + bp.height) {
                this.checkBlueprintProgress(bp);

                // Om ritningen nu är helt färdigbyggd!
                if (bp.isComplete()) {
                    this.convertBlueprintToHouse(bp);
                    this.placedBlueprints.splice(i, 1); // Ta bort ritningen ur listan
                }
            }
        }
    }

    private checkBlueprintProgress(bp: PlacedBlueprint): void {
        bp.cells.forEach((cell) => {
            const worldGridX = bp.startGridX + cell.relX;
            const worldGridY = bp.startGridY + cell.relY;
            const key = worldGridX + "," + worldGridY;
            const block = this.planet.blocks.get(key);

            if (cell.required === 1) {
                cell.isFulfilled = Boolean(block && block.type !== BlockType.AIR);
            } else if (cell.required === 0) {
                cell.isFulfilled = !block || block.type === BlockType.AIR;
            }
        });
    }

    private convertBlueprintToHouse(bp: PlacedBlueprint): void {
        const bounds: HouseBounds = {
            minX: bp.startGridX,
            maxX: bp.startGridX + bp.width - 1,
            minY: bp.startGridY,
            maxY: bp.startGridY + bp.height - 1,
        };

        // Sätt dörren i understa raden i mitten av huset
        const doorPos = {
            x: bp.startGridX + Math.floor(bp.width / 2),
            y: bp.startGridY + bp.height - 1,
        };

        const newHouse = new House(bp.id, bounds, doorPos);
        this.houses.set(bp.id, newHouse);

        bp.cells.forEach((cell) => {
            if (cell.required === 1) {
                const worldGridX = bp.startGridX + cell.relX;
                const worldGridY = bp.startGridY + cell.relY;
                const key = worldGridX + "," + worldGridY;
                const block = this.planet.blocks.get(key);

                if (block) {
                    (block as any).isIndestructible = true;

                    if (block.body) {
                        block.body.setDepth(1);
                        if (block.body.body) {
                            this.scene.matter.world.remove(block.body.body);
                            block.body.body = null as any;
                        }
                    }
                }
            }
        });

        this.planet.drawOutline();
    }

    private getHoverGridPosition(): { x: number; y: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerGridX = Math.floor(this.player.sprite.x / blockSize);
        const playerGridY = Math.floor(this.player.sprite.y / blockSize);

        // Placera ritningen lite framför spelaren
        return {
            x: playerGridX + 2,
            y: playerGridY - BLUEPRINT_HEIGHT + 2,
        };
    }

    private renderGraphics(): void {
        this.guideGraphics.clear();

        const blockSize = this.planet.config.blockSize;

        // 1. Rita ut alla existerande placerade ritningar i världen (Gula/Gröna rutor)
        this.placedBlueprints.forEach((bp) => {
            bp.cells.forEach((cell) => {
                const worldX = (bp.startGridX + cell.relX) * blockSize;
                const worldY = (bp.startGridY + cell.relY) * blockSize;

                if (cell.required === 1) {
                    if (cell.isFulfilled) {
                        // Färdigbyggd del (Grön ram)
                        this.guideGraphics.lineStyle(2, 0x00ff00, 0.6);
                        this.guideGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
                    } else {
                        // Saknar block (Gul/Orange streckad förhandsvisning)
                        this.guideGraphics.lineStyle(2, 0xffaa00, 0.8);
                        this.guideGraphics.fillStyle(0xffaa00, 0.15);
                        this.guideGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
                        this.guideGraphics.fillRect(worldX, worldY, blockSize, blockSize);
                    }
                }
            });
        });

        // 2. Om spelaren hålls på att placera en ny ritning (Förhandsgranskning / Ghost)
        if (this.isPlacingBlueprint) {
            const hoverPos = this.getHoverGridPosition();
            if (hoverPos) {
                for (let r = 0; r < BLUEPRINT_HEIGHT; r++) {
                    for (let c = 0; c < BLUEPRINT_WIDTH; c++) {
                        const cellType = HOUSE_BLUEPRINT[r][c];
                        const worldX = (hoverPos.x + c) * blockSize;
                        const worldY = (hoverPos.y + r) * blockSize;

                        if (cellType === 1) {
                            // Blå svävande ritningskontur
                            this.guideGraphics.lineStyle(2, 0x00ffff, 0.9);
                            this.guideGraphics.fillStyle(0x00ffff, 0.3);
                            this.guideGraphics.strokeRect(worldX, worldY, blockSize, blockSize);
                            this.guideGraphics.fillRect(worldX, worldY, blockSize, blockSize);
                        }
                    }
                }
            }
        }
    }

    private checkHousesForPlayer(): void {
        if (!this.player?.sprite) return;

        const blockSize = this.planet.config.blockSize;
        const playerGridX = Math.floor(this.player.sprite.x / blockSize);
        const playerGridY = Math.floor(this.player.sprite.y / blockSize);

        let nearHouseDoor: House | null = null;

        for (const house of this.houses.values()) {
            // Beräkna avståndet till dörren
            const distToDoor = Math.hypot(playerGridX - house.doorGridPos.x, playerGridY - house.doorGridPos.y);

            // Öka radien till 2.5 block så dörren aktiveras både direkt utanför och direkt innanför
            if (distToDoor <= 2.5) {
                nearHouseDoor = house;
                break;
            }
        }

        if (nearHouseDoor) {
            const doorWorldX = nearHouseDoor.doorGridPos.x * blockSize + blockSize / 2;
            const doorWorldY = nearHouseDoor.doorGridPos.y * blockSize;

            this.promptText.setPosition(doorWorldX - 40, doorWorldY - 20);
            this.promptText.setText(nearHouseDoor.isPlayerInside ? "[E] Gå ut" : "[E] Gå in i huset");
            this.promptText.setVisible(true);

            if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                this.togglePlayerInsideHouse(nearHouseDoor);
            }
        } else {
            this.promptText.setVisible(false);
        }
    }

    private togglePlayerInsideHouse(house: House): void {
        house.isPlayerInside = !house.isPlayerInside;

        // Tona ner/upp alla husets block beroende på om spelaren är inuti eller utanför
        for (let x = house.bounds.minX; x <= house.bounds.maxX; x++) {
            for (let y = house.bounds.minY; y <= house.bounds.maxY; y++) {
                const key = x + "," + y;
                const block = this.planet.blocks.get(key);

                if (block && block.body) {
                    // Gör husväggarna halvtransparenta (0.4 alpha) när spelaren är inuti
                    block.body.setAlpha(house.isPlayerInside ? 0.4 : 1.0);
                }
            }
        }

        console.log(house.isPlayerInside ? "Spelaren gick IN i huset" : "Spelaren gick UT ur huset");
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\house\index.ts
==================================================

export * from "./House";
export * from "./HouseManager";
export * from "./HouseBlueprint";
export * from "./PlacedBlueprint";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\house\PlacedBlueprint.ts
==================================================

export interface BlueprintCell {
    relX: number;
    relY: number;
    required: number; // 1 = Kräver block, 0 = Kräver tomrum
    isFulfilled: boolean;
}

export class PlacedBlueprint {
    public id: string;
    public startGridX: number;
    public startGridY: number;
    public width: number;
    public height: number;
    public cells: BlueprintCell[] = [];

    constructor(id: string, startGridX: number, startGridY: number, blueprintMatrix: number[][]) {
        this.id = id;
        this.startGridX = startGridX;
        this.startGridY = startGridY;
        this.height = blueprintMatrix.length;
        this.width = blueprintMatrix[0].length;

        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                this.cells.push({
                    relX: c,
                    relY: r,
                    required: blueprintMatrix[r][c],
                    isFulfilled: false,
                });
            }
        }
    }

    public isComplete(): boolean {
        return this.cells.every((cell) => cell.required === 0 || cell.isFulfilled);
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\managers\BuildingManager.ts
==================================================

import Phaser from "phaser";
import { Planet } from "planet";
import { BlockType } from "types";
import type { Player } from "player";
import { useGameStore } from "store";
import type { MobileInputState } from "ui";
import type { HighlightManager } from "managers";
import type { HouseManager } from "../house/HouseManager";

export class BuildingManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;
    private highlightManager: HighlightManager;
    private houseManager: HouseManager;
    private maxBuildDistance: number = 48;
    private debugGraphics!: Phaser.GameObjects.Graphics;

    private buildKey: Phaser.Input.Keyboard.Key | null = null;
    private canBuild: boolean = true;
    private readonly buildCooldownMs: number = 200;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player, highlightManager: HighlightManager, houseManager: HouseManager) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;
        this.houseManager = houseManager;

        this.scene.game.canvas.oncontextmenu = (e) => e.preventDefault();

        this.setupInput();
        this.createDebug();
    }

    public update(mobileState?: MobileInputState): void {
        if (this.buildKey && this.buildKey.isDown) {
            this.placeInFront();
        }

        if (mobileState && mobileState.secondaryAction) {
            this.placeInFront();
        }

        this.updateDebugGraphics();
    }

    public placeInFront(): void {
        if (!this.canBuild || !this.player?.sprite) return;

        const selectedResource = useGameStore.getState().selectedResource;
        if (!selectedResource) return;

        const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;
        if (inventoryCount <= 0) return;

        const blockType = this.mapResourceToBlockType(selectedResource);
        if (blockType === null) return;

        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldPoint = new Phaser.Math.Vector2(target.gridX * blockSize + blockSize / 2, target.gridY * blockSize + blockSize / 2);

        if (this.isOverlappingPlayer(worldPoint)) return;

        const success = this.planet.placeBlock(target.gridX, target.gridY, blockType);

        if (success) {
            useGameStore.getState().removeResource(selectedResource, 1);
            this.houseManager?.checkForHouseAt(target.gridX, target.gridY);

            this.canBuild = false;
            this.scene.time.delayedCall(this.buildCooldownMs, () => {
                this.canBuild = true;
            });
        }
    }

    private setupInput(): void {
        if (this.scene.input.keyboard) {
            this.buildKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.buildKey.on("down", () => {
                this.placeInFront();
            });
        }

        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (!pointer.rightButtonDown()) return;

            const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);

            if (playerPos.distance(worldPoint) > this.maxBuildDistance) return;

            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);

            if (this.isOverlappingPlayer(worldPoint)) return;

            const selectedResource = useGameStore.getState().selectedResource;
            if (!selectedResource) return;

            const inventoryCount = useGameStore.getState().inventory[selectedResource] || 0;
            if (inventoryCount <= 0) return;

            const blockType = this.mapResourceToBlockType(selectedResource);
            if (blockType === null) return;

            const success = this.planet.placeBlock(gridX, gridY, blockType);

            if (success) {
                useGameStore.getState().removeResource(selectedResource, 1);
                this.houseManager?.checkForHouseAt(gridX, gridY);

                this.canBuild = false;
                this.scene.time.delayedCall(this.buildCooldownMs, () => {
                    this.canBuild = true;
                });
            }
        });
    }

    private isOverlappingPlayer(worldPoint: Phaser.Math.Vector2): boolean {
        const playerBounds = this.player.sprite.getBounds();
        return playerBounds.contains(worldPoint.x, worldPoint.y);
    }

    private mapResourceToBlockType(resource: string | null): BlockType | null {
        if (resource === "dirt") return BlockType.DIRT;
        if (resource === "stone") return BlockType.STONE;
        if (resource === "wood") return BlockType.WOOD;
        if (resource === "sand") return BlockType.SAND;
        if (resource === "core") return BlockType.CORE;
        if (resource === "coal") return BlockType.COAL;
        if (resource === "iron_ore") return BlockType.IRON_ORE;
        if (resource === "copper_ore") return BlockType.COPPER_ORE;
        if (resource === "silver_ore") return BlockType.SILVER_ORE;
        if (resource === "gold_ore") return BlockType.GOLD_ORE;
        if (resource === "diamond") return BlockType.DIAMOND;
        if (resource === "chest") return BlockType.CHEST;
        if (resource === "bed") return BlockType.BED;
        if (resource === "torch") return BlockType.TORCH;
        return null;
    }

    private createDebug() {
        this.debugGraphics = this.scene.add.graphics();
    }

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;

            this.debugGraphics.lineStyle(2, 0xffff00, 0.8);
            this.debugGraphics.fillStyle(0xffff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxBuildDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxBuildDistance);
        }
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\managers\CombatManager.ts
==================================================

import Phaser from "phaser";
import { useGameStore } from "store";
import type { Player } from "player";

export class CombatManager {
    private scene: Phaser.Scene;
    private player: Player;
    private canAttack: boolean = true;
    private readonly defaultCooldownMs: number = 200;

    constructor(scene: Phaser.Scene, player: Player) {
        this.scene = scene;
        this.player = player;
    }

    public attack(): void {
        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool || currentTool.type !== "sword" || !this.canAttack) return;

        // 1. Spela upp den visuella animationen
        this.player.swingWeapon();

        // 2. Beräkna hitbox baserat på spelarens riktning
        this.checkHitbox(currentTool.damage);

        // 3. Hantera cooldown baserat på vapnets speed
        this.canAttack = false;
        const cooldown = currentTool.speed ?? this.defaultCooldownMs;
        this.scene.time.delayedCall(cooldown, () => {
            this.canAttack = true;
        });
    }

    private checkHitbox(damage: number): void {
        if (!this.player.sprite) return;

        const blockSize = 16;
        const direction = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        // Upp- och högervektorer baserat på rotation
        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);
        const rightX = -upY;
        const rightY = upX;

        let attackX = this.player.sprite.x;
        let attackY = this.player.sprite.y;

        // Placera hitboxen framför spelaren utifrån riktning
        if (direction.includes("right")) {
            attackX += rightX * blockSize;
            attackY += rightY * blockSize;
        } else if (direction.includes("left")) {
            attackX -= rightX * blockSize;
            attackY -= rightY * blockSize;
        }

        // Sök efter fiender inom attackområdet (Matter.js query)
        const attackRadius = 24;
        const bodies = this.scene.matter.world.getAllBodies();

        // Filtrera fram fiender (antag att fiender har data-egenskapen 'isEnemy')
        const hitBodies = this.scene.matter.query.point(bodies, { x: attackX, y: attackY });

        hitBodies.forEach((body) => {
            const gameObject = body.gameObject as Phaser.Physics.Matter.Sprite;
            if (gameObject && gameObject.getData("isEnemy")) {
                const enemy = gameObject.getData("enemyInstance");
                if (enemy && typeof enemy.takeDamage === "function") {
                    enemy.takeDamage(damage);
                }
            }
        });
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\managers\HighlightManager.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "planet";
import type { Player } from "player";
import { useGameStore } from "store";

export class HighlightManager {
    private scene: Phaser.Scene;
    private planet: Planet;
    private player: Player;
    private graphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;

        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(20);
    }

    public update(): void {
        this.graphics.clear();

        const target = this.getTargetGridPosition();
        if (!target) return;

        const blockSize = this.planet.config.blockSize;
        const worldX = target.gridX * blockSize;
        const worldY = target.gridY * blockSize;

        const worldPoint = new Phaser.Math.Vector2(worldX + blockSize / 2, worldY + blockSize / 2);

        const key = target.gridX + "," + target.gridY;
        const existingBlock = this.planet.blocks.get(key);

        const selectedResource = useGameStore.getState().selectedResource;
        const inventoryCount = selectedResource ? useGameStore.getState().inventory[selectedResource] || 0 : 0;
        const isOverlapping = this.isOverlappingPlayer(worldPoint);
        const hasResources = inventoryCount > 0;

        let color = 0x00ff00; // Grön = Byggbar tom ruta

        if (existingBlock) {
            color = 0xffff00; // Gul = Finns block (Mine)
        } else if (!hasResources || isOverlapping) {
            color = 0xff0000; // Röd = Ingen resurs eller spelaren i vägen
        }

        this.graphics.lineStyle(2, color, 0.9);
        this.graphics.fillStyle(color, 0.2);

        this.graphics.strokeRect(worldX, worldY, blockSize, blockSize);
        this.graphics.fillRect(worldX, worldY, blockSize, blockSize);
    }

    public getTargetGridPosition(): { gridX: number; gridY: number } | null {
        if (!this.player?.sprite) return null;

        const blockSize = this.planet.config.blockSize;
        const playerDirection = this.player.getDirection();
        const rotation = this.player.sprite.rotation;

        const upX = Math.cos(rotation - Math.PI / 2);
        const upY = Math.sin(rotation - Math.PI / 2);

        const rightX = -upY;
        const rightY = upX;

        const diag = Math.SQRT1_2; // ~0.7071 (cos/sin för 45 grader)

        let dirX = 0;
        let dirY = 0;

        switch (playerDirection) {
            case "right":
                dirX = rightX;
                dirY = rightY;
                break;
            case "left":
                dirX = -rightX;
                dirY = -rightY;
                break;
            case "up":
                dirX = upX;
                dirY = upY;
                break;
            case "down":
                dirX = -upX;
                dirY = -upY;
                break;
            case "up-right":
                dirX = rightX * diag + upX * diag;
                dirY = rightY * diag + upY * diag;
                break;
            case "up-left":
                dirX = -rightX * diag + upX * diag;
                dirY = -rightY * diag + upY * diag;
                break;
            case "down-right":
                dirX = rightX * diag - upX * diag;
                dirY = rightY * diag - upY * diag;
                break;
            case "down-left":
                dirX = -rightX * diag - upX * diag;
                dirY = -rightY * diag - upY * diag;
                break;
        }

        const targetX = this.player.sprite.x + dirX * blockSize;
        const targetY = this.player.sprite.y + dirY * blockSize;

        return {
            gridX: Math.floor(targetX / blockSize),
            gridY: Math.floor(targetY / blockSize),
        };
    }

    private isOverlappingPlayer(worldPoint: Phaser.Math.Vector2): boolean {
        const playerBounds = this.player.sprite.getBounds();
        return playerBounds.contains(worldPoint.x, worldPoint.y);
    }

    public destroy(): void {
        this.graphics.destroy();
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\managers\index.ts
==================================================

export * from "./MiningManager";
export * from "./HighlightManager";
export * from "./BuildingManager";
export * from "./CombatManager";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\managers\MiningManager.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "planet";
import { BlockType, REQUIRED_TOOL_TYPE, REQUIRED_TOOL_POWER } from "types";
import type { Player } from "player";
import { useGameStore } from "store";
import type { MobileInputState } from "ui";
import type { HighlightManager } from "managers";

export class MiningManager {
    private debugGraphics!: Phaser.GameObjects.Graphics;
    private debugText!: Phaser.GameObjects.Text;

    private readonly scene: Phaser.Scene;
    private readonly planet: Planet;
    private readonly player: Player;
    private readonly highlightManager: HighlightManager;
    private readonly maxMiningDistance: number = 24;

    private mineKey: Phaser.Input.Keyboard.Key | null = null;
    private canMine: boolean = true;
    private readonly defaultMineCooldownMs: number = 200;

    constructor(scene: Phaser.Scene, planet: Planet, player: Player, highlightManager: HighlightManager) {
        this.scene = scene;
        this.planet = planet;
        this.player = player;
        this.highlightManager = highlightManager;

        this.setupInput();
        this.createDebug();
    }

    public update(mobileState?: MobileInputState): void {
        if (this.mineKey && this.mineKey.isDown) {
            this.mineInFront();
        }

        if (mobileState && mobileState.primaryAction) {
            this.mineInFront();
        }

        this.updateDebugGraphics();
    }

    public mineInFront(): void {
        if (!this.canMine || !this.player?.sprite) return;

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool) return;

        const target = this.highlightManager.getTargetGridPosition();
        if (!target) return;

        const key = target.gridX + "," + target.gridY;
        const block = this.planet.blocks.get(key);

        if (block) {
            this.damageBlock(target.gridX, target.gridY);

            // Använd verktygets speed om det finns, annars standard-cooldown
            const cooldown = currentTool.speed ?? this.defaultMineCooldownMs;

            this.canMine = false;
            this.scene.time.delayedCall(cooldown, () => {
                this.canMine = true;
            });
        }
    }

    private setupInput(): void {
        if (this.scene.input.keyboard) {
            this.mineKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            this.mineKey.on("down", () => {
                this.mineInFront();
            });
        }

        this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const currentTool = useGameStore.getState().currentTool;
            if (!currentTool) return;

            const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
            const playerPos = new Phaser.Math.Vector2(this.player.sprite.x, this.player.sprite.y);

            if (playerPos.distance(worldPoint) > this.maxMiningDistance) return;

            const gridX = Math.floor(worldPoint.x / this.planet.config.blockSize);
            const gridY = Math.floor(worldPoint.y / this.planet.config.blockSize);
            const key = gridX + "," + gridY;

            const block = this.planet.blocks.get(key);
            if (block) {
                this.damageBlock(gridX, gridY);
            }
        });
    }

    public damageBlock(x: number, y: number): void {
        const key = x + "," + y;
        const block = this.planet.blocks.get(key);
        if (!block) return;

        // 1. Kontrollera om blocket tillhör ett färdigt hus och är oförstörbart
        if ((block as any).isIndestructible) {
            // Blinka rött för att visa spelaren att blocket inte går att förstöra
            block.body.setTint(0xff0000);
            this.scene.time.delayedCall(150, () => {
                if (block.body?.active) {
                    block.body.setTint(0xcccccc); // Återställ till husets nyans
                }
            });
            return; // Avbryt brytningen!
        }

        const currentTool = useGameStore.getState().currentTool;
        if (!currentTool) return;

        const requiredType = REQUIRED_TOOL_TYPE[block.type] ?? "none";
        const requiredPower = REQUIRED_TOOL_POWER[block.type] ?? 0;

        const hasCorrectType = requiredType === "none" || currentTool.type === requiredType;
        const hasCorrectPower = currentTool.power >= requiredPower;

        // Om fel verktygstyp eller för låg power -> Blinka rött och avbryt
        if (!hasCorrectType || !hasCorrectPower) {
            block.body.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => {
                if (block.body?.active) {
                    block.body.clearTint();
                }
            });
            return;
        }

        // Applicera skada på blocket
        block.hp -= currentTool.damage;

        const hpPercent = Math.max(0, block.hp / block.maxHp);

        const red = 255;
        const green = Math.floor(255 * hpPercent);
        const blue = Math.floor(255 * hpPercent);
        const damageTint = (red << 16) | (green << 8) | blue;

        // Träffeffekt (vit blixt)
        block.body.setTint(0xffffff);

        this.scene.time.delayedCall(80, () => {
            if (block.body?.active) {
                if (hpPercent < 1) {
                    block.body.setTint(damageTint);
                } else {
                    block.body.clearTint();
                }
            }
        });

        if (block.hp <= 0) {
            this.planet.removeBlock(x, y);
        }
    }

    private createDebug() {
        this.debugGraphics = this.scene.add.graphics();
        this.debugText = this.scene.add.text(0, 0, "", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#ffffff",
            backgroundColor: "#00000088",
        });
        this.debugText.setDepth(100);
    }

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.player?.sprite) {
            const playerX = this.player.sprite.x;
            const playerY = this.player.sprite.y;

            this.debugGraphics.lineStyle(2, 0x00ff00, 0.8);
            this.debugGraphics.fillStyle(0x00ff00, 0.1);

            this.debugGraphics.strokeCircle(playerX, playerY, this.maxMiningDistance);
            this.debugGraphics.fillCircle(playerX, playerY, this.maxMiningDistance);
        } else {
            this.debugText.setVisible(false);
        }
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\planet\index.ts
==================================================

export * from "./Planet";
export * from "./planetOutline";
export * from "./planetHelpers";
export * from "./planetOptimizer";
export * from "./planetConfig";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\planet\Planet.ts
==================================================

import Phaser from "phaser";
import { BlockType, type BlockData } from "types";
import { SimplexNoise } from "./planetHelpers";
import { DEFAULT_PLANET_CONFIG, type PlanetConfig } from "./planetConfig";
import { PlanetOutline, CATEGORY_TERRAIN, CATEGORY_LOOT } from "./planetOutline";
import { PLANET_BIOMES, type PlanetType, type PlanetBiomeConfig } from "./planetConfig";
import { useGameStore } from "store";
import type { ResourceType } from "types";

export interface ExtendedPlanetConfig extends PlanetConfig {
  planetType?: PlanetType;
}

export class Planet {
  private scene: Phaser.Scene;
  public config: ExtendedPlanetConfig;
  public biome: PlanetBiomeConfig;
  public center: { x: number; y: number };
  private noise: SimplexNoise = new SimplexNoise();
  public blocks: Map<string, BlockData> = new Map();
  private outline!: PlanetOutline;

  constructor(scene: Phaser.Scene, config: Partial<ExtendedPlanetConfig> = {}) {
    this.scene = scene;
    this.config = Object.assign({}, DEFAULT_PLANET_CONFIG, { planetType: "EARTH" }, config);

    const type = this.config.planetType || "EARTH";
    this.biome = PLANET_BIOMES[type];

    const totalPixels = this.config.radius * 2 * this.config.blockSize;
    this.center = {
      x: totalPixels / 2,
      y: totalPixels / 2,
    };

    this.outline = new PlanetOutline(scene, this);
  }

  public createTextures(): void {
    const colors = this.biome.colors;

    this.createBlockTexture("dirt_tile", colors.dirt_tile || 0x8b5a2b);
    this.createBlockTexture("stone_tile", colors.stone_tile || 0x808080);
    this.createBlockTexture("core_tile", colors.core_tile || 0xff4500);
    this.createBlockTexture("player_tile", 0x00ff00);
    this.createBlockTexture("coal_tile", 0x000000);
    this.createBlockTexture("iron_ore_tile", 0x808080);
    this.createBlockTexture("gold_ore_tile", 0xffd700);
    this.createBlockTexture("diamond_tile", 0x00ffff);
    this.createBlockTexture("wood_tile", 0x5c4033);
    this.createBlockTexture("leaves_tile", 0x228b22);
    this.createBlockTexture("sand_tile", colors.sand_tile || 0xe0c068);

    // Nya texturer
    this.createBlockTexture("chest_tile", 0x8b4513);
    this.createBlockTexture("bed_tile", 0xff0000);
    this.createBlockTexture("torch_tile", 0xffcc00);
  }

  private createBlockTexture(key: string, color: number): void {
    const textureSize = 64;

    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(color, 1);
    graphics.fillRect(0, 0, textureSize, textureSize);

    const strokeWidth = Math.max(1, textureSize / this.config.blockSize);
    graphics.lineStyle(strokeWidth, 0x000000, 0.2);
    graphics.strokeRect(0, 0, textureSize, textureSize);

    graphics.generateTexture(key, textureSize, textureSize);
    graphics.destroy();
  }

  public generate(): void {
    const radius = this.config.radius;
    const blockSize = this.config.blockSize;
    const mapSize = radius * 2;

    const caveScaleFactor = this.config.caveScaleFactor ?? 8.0;
    const caveScale = Math.max(0.25, caveScaleFactor / radius);
    const caveThreshold = this.config.caveThreshold ?? 0.76;
    const mountainScale = this.config.mountainScale ?? 3.0;
    const mountainIntensity = this.config.mountainIntensity ?? 0.3;
    const stoneRadiusRatio = this.config.stoneRadiusRatio ?? 0.825;
    const coreRadiusRatio = this.config.coreRadiusRatio ?? 0.15;

    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {
        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const angle = Math.atan2(dy, dx);
        const mountainNoise = this.noise.noise2D(Math.cos(angle) * mountainScale, Math.sin(angle) * mountainScale);
        const dynamicRadius = radius + mountainNoise * mountainIntensity;

        let blockType: BlockType = BlockType.AIR;

        if (distance <= dynamicRadius) {
          const caveNoise = this.noise.noise2D(x * caveScale, y * caveScale);
          const isCave = caveNoise > caveThreshold && distance > Math.max(3, radius * 0.3);

          if (!isCave) {
            if (distance <= Math.max(2, radius * coreRadiusRatio)) {
              blockType = this.biome.coreBlock;
            } else if (distance <= dynamicRadius * stoneRadiusRatio) {
              blockType = this.getOreOrBlock(this.biome.deepBlock);
            } else {
              blockType = this.biome.surfaceBlock;
            }
          }
        }

        if (blockType !== BlockType.AIR) {
          const worldX = x * blockSize + blockSize / 2;
          const worldY = y * blockSize + blockSize / 2;
          const textureKey = this.getTextureKey(blockType);

          const image = this.scene.add.image(worldX, worldY, textureKey);
          image.setDisplaySize(blockSize, blockSize);

          image.setInteractive();
          image.setData("gridX", x);
          image.setData("gridY", y);

          const maxHp = this.getBlockMaxHp(blockType);
          const key = x + "," + y;

          this.blocks.set(key, {
            x,
            y,
            type: blockType,
            hp: maxHp,
            maxHp,
            body: image,
          });
        }
      }
    }

    if (this.biome.decorations && this.biome.decorations.length > 0) {
      this.generateSurfaceObjects();
    }

    this.drawOutline();
  }

  private getOreOrBlock(defaultBlock: BlockType): BlockType {
    const rand = Math.random();
    let cumulative = 0;

    for (const ore of this.biome.ores) {
      cumulative += ore.chance;
      if (rand < cumulative) {
        return ore.type;
      }
    }

    return defaultBlock;
  }

  private generateSurfaceObjects(): void {
    const radius = this.config.radius;
    const mapSize = radius * 2;
    const outerSurfaceMap = new Map<string, { x: number; y: number }>();

    const angleSteps = 360;
    for (let i = 0; i < angleSteps; i++) {
      const angle = (i * Math.PI * 2) / angleSteps;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);

      let furthestBlock: { x: number; y: number; dist: number } | null = null;

      for (let r = Math.floor(radius * 0.3); r <= mapSize; r++) {
        const checkX = Math.floor(radius + dirX * r);
        const checkY = Math.floor(radius + dirY * r);
        const key = checkX + "," + checkY;

        const block = this.blocks.get(key);
        if (block && (block.type === BlockType.DIRT || block.type === BlockType.STONE || block.type === BlockType.SAND)) {
          const dist = Math.hypot(checkX - radius, checkY - radius);
          if (!furthestBlock || dist > furthestBlock.dist) {
            furthestBlock = { x: checkX, y: checkY, dist };
          }
        }
      }

      if (furthestBlock) {
        const surfaceKey = furthestBlock.x + "," + furthestBlock.y;
        outerSurfaceMap.set(surfaceKey, { x: furthestBlock.x, y: furthestBlock.y });
      }
    }

    const surfaceBlocks = Array.from(outerSurfaceMap.values());

    for (let i = surfaceBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = surfaceBlocks[i];
      surfaceBlocks[i] = surfaceBlocks[j];
      surfaceBlocks[j] = temp;
    }

    const maxTrees = 5 + Math.floor(Math.random() * 6);
    let treeCount = 0;
    const treePositions: { x: number; y: number }[] = [];
    const minTreeDistance = 8;

    surfaceBlocks.forEach((surface) => {
      if (treeCount < maxTrees) {
        const tooClose = treePositions.some((pos) => {
          return Math.hypot(pos.x - surface.x, pos.y - surface.y) < minTreeDistance;
        });

        if (!tooClose) {
          this.buildTreeOutward(surface.x, surface.y);
          treePositions.push({ x: surface.x, y: surface.y });
          treeCount++;
          return;
        }
      }

      if (Math.random() < 0.1) {
        const dx = surface.x - radius;
        const dy = surface.y - radius;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let stepX = 0;
        let stepY = 0;

        if (absX > absY) {
          stepX = dx > 0 ? 1 : -1;
        } else {
          stepY = dy > 0 ? 1 : -1;
        }

        const targetX = surface.x + stepX;
        const targetY = surface.y + stepY;

        this.placeBlock(targetX, targetY, BlockType.STONE);
      }
    });
  }

  private buildTreeOutward(startX: number, startY: number): void {
    const radius = this.config.radius;

    const dx = startX - radius;
    const dy = startY - radius;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    let dirX = 0;
    let dirY = 0;

    if (absX > absY) {
      dirX = dx > 0 ? 1 : -1;
    } else {
      dirY = dy > 0 ? 1 : -1;
    }

    const sideX = -dirY;
    const sideY = dirX;

    const trunkHeight = 2 + Math.floor(Math.random() * 2);

    let currentX = startX;
    let currentY = startY;

    for (let i = 1; i <= trunkHeight; i++) {
      const targetX = startX + dirX * i;
      const targetY = startY + dirY * i;

      this.placeBlock(targetX, targetY, BlockType.WOOD);
      currentX = targetX;
      currentY = targetY;
    }

    const crownLayers = [
      { forward: 1, sides: [-1, 0, 1] },
      { forward: 2, sides: [-1, 0, 1] },
      { forward: 3, sides: [0] },
    ];

    crownLayers.forEach((layer) => {
      layer.sides.forEach((sideOffset) => {
        const leafX = currentX + dirX * layer.forward + sideX * sideOffset;
        const leafY = currentY + dirY * layer.forward + sideY * sideOffset;

        this.placeBlock(leafX, leafY, BlockType.LEAVES);
      });
    });
  }

  public drawOutline(): void {
    this.outline.draw();
  }

  public getBlockMaxHp(type: BlockType): number {
    if (this.config.blockHp && typeof this.config.blockHp[type] === "number") {
      return this.config.blockHp[type];
    }
    return 1;
  }

  public isFullyMined(): boolean {
    for (const block of this.blocks.values()) {
      if (block.type !== BlockType.CORE) {
        return false;
      }
    }
    return true;
  }

  public removeBlock(x: number, y: number): void {
    const key = x + "," + y;
    const block = this.blocks.get(key);

    if (block) {
      const blockType = block.type;

      if (block.body.body) {
        this.scene.matter.world.remove(block.body.body);
      }
      block.body.destroy();
      this.blocks.delete(key);

      this.spawnLoot(x, y, blockType);

      if (blockType === BlockType.WOOD || blockType === BlockType.LEAVES) {
        this.removeConnectedLeaves(x, y);
      }

      this.drawOutline();

      if (this.isFullyMined()) {
        this.scene.events.emit("planet-cleared");
      }
    }
  }

  private removeConnectedLeaves(startX: number, startY: number): void {
    const neighbors = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
    ];

    const queue: { x: number; y: number }[] = [];

    for (const offset of neighbors) {
      const nx = startX + offset.x;
      const ny = startY + offset.y;
      const key = nx + "," + ny;
      const neighborBlock = this.blocks.get(key);

      if (neighborBlock && neighborBlock.type === BlockType.LEAVES) {
        queue.push({ x: nx, y: ny });
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      const key = current.x + "," + current.y;
      const block = this.blocks.get(key);

      if (!block || block.type !== BlockType.LEAVES) continue;

      let hasTrunkSupport = false;

      for (const offset of neighbors) {
        const checkKey = current.x + offset.x + "," + (current.y + offset.y);
        const checkBlock = this.blocks.get(checkKey);

        if (checkBlock && checkBlock.type === BlockType.WOOD) {
          hasTrunkSupport = true;
          break;
        }
      }

      if (!hasTrunkSupport) {
        if (block.body.body) {
          this.scene.matter.world.remove(block.body.body);
        }
        block.body.destroy();
        this.blocks.delete(key);

        for (const offset of neighbors) {
          const nx = current.x + offset.x;
          const ny = current.y + offset.y;
          const nextKey = nx + "," + ny;
          const nextBlock = this.blocks.get(nextKey);

          if (nextBlock && nextBlock.type === BlockType.LEAVES) {
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }
  }

  private spawnLoot(gridX: number, gridY: number, blockType: BlockType): void {
    if (blockType === BlockType.AIR || blockType === BlockType.CORE) return;

    const blockSize = this.config.blockSize;
    const worldX = gridX * blockSize + blockSize / 2;
    const worldY = gridY * blockSize + blockSize / 2;
    const textureKey = this.getTextureKey(blockType);

    const itemSize = blockSize * 0.4;

    const item = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
      shape: "circle",
      friction: 1.0,
      frictionStatic: 10.0,
      frictionAir: 0.02,
      restitution: 0.0,
      density: 0.05,
    });

    if (item.body) {
      this.scene.matter.body.setInertia(item.body as MatterJS.BodyType, Infinity);
    }

    item.setCollisionCategory(CATEGORY_LOOT);
    item.setCollidesWith([CATEGORY_TERRAIN]);

    item.setDisplaySize(itemSize, itemSize);
    item.setData("itemType", blockType);
    item.setData("isLoot", true);

    const randomAngle = Math.random() * Math.PI * 2;
    item.setRotation(randomAngle);

    const dx = worldX - this.center.x;
    const dy = worldY - this.center.y;
    const dist = Math.hypot(dx, dy) || 1;
    const outX = dx / dist;
    const outY = dy / dist;

    item.setVelocity(outX * 1.5, outY * 1.5);

    let isTouchingGround = false;

    const onCollisionStart = (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
      if (!item.body) return;

      for (const pair of event.pairs) {
        if (pair.bodyA === item.body || pair.bodyB === item.body) {
          isTouchingGround = true;
          item.setFrictionAir(0.2);
          break;
        }
      }
    };

    const onCollisionEnd = (event: Phaser.Physics.Matter.Events.CollisionEndEvent) => {
      if (!item.body) return;

      for (const pair of event.pairs) {
        if (pair.bodyA === item.body || pair.bodyB === item.body) {
          isTouchingGround = false;
          item.setFrictionAir(0.02);
          break;
        }
      }
    };

    this.scene.matter.world.on("collisionstart", onCollisionStart);
    this.scene.matter.world.on("collisionend", onCollisionEnd);

    const updateListener = () => {
      if (!item.active) return;

      const player = this.scene.children.list.find((child) => child.getData("isPlayer")) as Phaser.Physics.Matter.Image | undefined;
      if (player && player.active) {
        const pickupRadius = blockSize * 0.8;
        const playerDist = Math.hypot(player.x - item.x, player.y - item.y);

        if (playerDist <= pickupRadius) {
          const resourceType = this.mapBlockToResource(blockType);
          if (resourceType) {
            const success = useGameStore.getState().mineBlock(resourceType, 1);
            if (success) {
              this.scene.events.emit("collect-item", blockType);
              cleanupListeners();
              item.destroy();
              return;
            }
          }
        }
      }

      if (item.body) {
        const body = item.body as MatterJS.BodyType;

        const cDx = this.center.x - item.x;
        const cDy = this.center.y - item.y;
        const absX = Math.abs(cDx);
        const absY = Math.abs(cDy);

        let downX = 0;
        let downY = 0;

        if (absX > absY) {
          downX = cDx > 0 ? 1 : -1;
        } else {
          downY = cDy > 0 ? 1 : -1;
        }

        const currentGridX = Math.floor(item.x / blockSize);
        const currentGridY = Math.floor(item.y / blockSize);

        const targetGridX = currentGridX + downX;
        const targetGridY = currentGridY + downY;

        const targetWorldX = targetGridX * blockSize + blockSize / 2;
        const targetWorldY = targetGridY * blockSize + blockSize / 2;

        const blockDx = targetWorldX - item.x;
        const blockDy = targetWorldY - item.y;
        const blockDist = Math.hypot(blockDx, blockDy);

        if (blockDist > 0) {
          const dirX = blockDx / blockDist;
          const dirY = blockDy / blockDist;

          const gravity = 0.003;
          const force = new Phaser.Math.Vector2(dirX * gravity * body.mass, dirY * gravity * body.mass);
          item.applyForce(force);
        }

        if (isTouchingGround) {
          const vx = body.velocity.x;
          const vy = body.velocity.y;

          const dot = vx * downX + vy * downY;

          this.scene.matter.body.setVelocity(body, {
            x: downX * dot,
            y: downY * dot,
          });
        }
      }
    };

    const cleanupListeners = () => {
      this.scene.events.off("update", updateListener);
      this.scene.matter.world.off("collisionstart", onCollisionStart);
      this.scene.matter.world.off("collisionend", onCollisionEnd);
    };

    this.scene.events.on("update", updateListener);
  }

  public placeBlock(x: number, y: number, blockType: BlockType): boolean {
    const key = x + "," + y;
    if (this.blocks.has(key)) return false;

    const blockSize = this.config.blockSize;
    const worldX = x * blockSize + blockSize / 2;
    const worldY = y * blockSize + blockSize / 2;
    const textureKey = this.getTextureKey(blockType);

    const image = this.scene.matter.add.image(worldX, worldY, textureKey, undefined, {
      isStatic: true,
      friction: 0,
      collisionFilter: {
        category: CATEGORY_TERRAIN,
      },
    });
    image.setDisplaySize(blockSize, blockSize);

    image.setInteractive();
    image.setData("gridX", x);
    image.setData("gridY", y);

    const maxHp = this.getBlockMaxHp(blockType);

    this.blocks.set(key, {
      x,
      y,
      type: blockType,
      hp: maxHp,
      maxHp,
      body: image,
    });

    this.drawOutline();

    return true;
  }

  private getTextureKey(blockType: BlockType): string {
    if (blockType === BlockType.CORE) return "core_tile";
    if (blockType === BlockType.STONE) return "stone_tile";
    if (blockType === BlockType.IRON_ORE) return "iron_ore_tile";
    if (blockType === BlockType.COPPER_ORE) return "copper_ore_tile";
    if (blockType === BlockType.SILVER_ORE) return "silver_ore_tile";
    if (blockType === BlockType.GOLD_ORE) return "gold_ore_tile";
    if (blockType === BlockType.DIAMOND) return "diamond_tile";
    if (blockType === BlockType.COAL) return "coal_tile";
    if (blockType === BlockType.WOOD) return "wood_tile";
    if (blockType === BlockType.LEAVES) return "leaves_tile";
    if (blockType === BlockType.SAND) return "sand_tile";
    if (blockType === BlockType.CHEST) return "chest_tile";
    if (blockType === BlockType.BED) return "bed_tile";
    if (blockType === BlockType.TORCH) return "torch_tile";
    return "dirt_tile";
  }

  private mapBlockToResource(type: BlockType): ResourceType | null {
    if (type === BlockType.DIRT) return "dirt";
    if (type === BlockType.STONE) return "stone";
    if (type === BlockType.COAL) return "coal";
    if (type === BlockType.IRON_ORE) return "iron_ore";
    if (type === BlockType.COPPER_ORE) return "copper_ore";
    if (type === BlockType.SILVER_ORE) return "silver_ore";
    if (type === BlockType.GOLD_ORE) return "gold_ore";
    if (type === BlockType.DIAMOND) return "diamond";
    if (type === BlockType.WOOD) return "wood";
    if (type === BlockType.SAND) return "sand";
    if (type === BlockType.CHEST) return "chest";
    if (type === BlockType.BED) return "bed";
    if (type === BlockType.TORCH) return "torch";
    return null;
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\planet\planetConfig.ts
==================================================

// GameTypes.ts eller planetConfig.ts
import { BlockType } from "types";

export type PlanetType = "EARTH" | "ICE" | "VOLCANO" | "DESERT";

export interface PlanetBiomeConfig {
    surfaceBlock: BlockType;
    subSurfaceBlock: BlockType;
    deepBlock: BlockType;
    coreBlock: BlockType;
    decorations?: BlockType[];
    ores: { type: BlockType; chance: number }[];
    colors: Record<string, number>; // Färger för texturgenerering
}

export const PLANET_BIOMES: Record<PlanetType, PlanetBiomeConfig> = {
    EARTH: {
        surfaceBlock: BlockType.DIRT,
        subSurfaceBlock: BlockType.DIRT,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        decorations: [BlockType.WOOD, BlockType.LEAVES],
        ores: [
            { type: BlockType.COAL, chance: 0.05 },
            { type: BlockType.IRON_ORE, chance: 0.03 },
            { type: BlockType.GOLD_ORE, chance: 0.01 },
        ],
        colors: {
            dirt_tile: 0x8b5a2b,
            stone_tile: 0x808080,
            core_tile: 0xff4500,
        },
    },
    ICE: {
        surfaceBlock: BlockType.SAND, // Kan återanvändas som 'Snö/Is' eller lägg till ny BlockType
        subSurfaceBlock: BlockType.STONE,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.DIAMOND, chance: 0.02 },
            { type: BlockType.SILVER_ORE, chance: 0.04 },
        ],
        colors: {
            sand_tile: 0xe0ffff, // Ljusis
            stone_tile: 0x4682b4, // Mörkis
            core_tile: 0x00ffff,
        },
    },
    VOLCANO: {
        surfaceBlock: BlockType.STONE,
        subSurfaceBlock: BlockType.STONE,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.GOLD_ORE, chance: 0.04 },
            { type: BlockType.COPPER_ORE, chance: 0.06 },
        ],
        colors: {
            stone_tile: 0x2b2b2b, // Basalt/Obsidian
            core_tile: 0xff0000,
        },
    },
    DESERT: {
        surfaceBlock: BlockType.SAND,
        subSurfaceBlock: BlockType.SAND,
        deepBlock: BlockType.STONE,
        coreBlock: BlockType.CORE,
        ores: [
            { type: BlockType.GOLD_ORE, chance: 0.03 },
            { type: BlockType.COPPER_ORE, chance: 0.05 },
        ],
        colors: {
            sand_tile: 0xedc9af,
            stone_tile: 0xd2b48c,
            core_tile: 0xff8c00,
        },
    },
};
export interface PlanetConfig {
    radius: number;
    blockSize: number;
    gravityStrength: number;
    outlineDepth?: number;
    padding?: number;
    caveScaleFactor?: number;
    caveThreshold?: number;
    mountainScale?: number;
    mountainIntensity?: number;
    stoneRadiusRatio?: number;
    coreRadiusRatio?: number;
    blockHp?: Partial<Record<BlockType, number>>;
}

export const DEFAULT_PLANET_CONFIG: PlanetConfig = {
    radius: 30,
    blockSize: 16,
    gravityStrength: 1,
    outlineDepth: 10,
    padding: 0.5,
    caveScaleFactor: 8.0,
    caveThreshold: 0.76,
    mountainScale: 3.0,
    mountainIntensity: 0.3,
    stoneRadiusRatio: 0.825,
    coreRadiusRatio: 0.15,
    blockHp: {
        [BlockType.CORE]: 100,
        [BlockType.STONE]: 3,
        [BlockType.COAL]: 2,
        [BlockType.IRON_ORE]: 5,
        [BlockType.GOLD_ORE]: 8,
        [BlockType.DIAMOND]: 15,
        [BlockType.WOOD]: 2,
        [BlockType.DIRT]: 1,
        [BlockType.CHEST]: 2,
        [BlockType.BED]: 1,
        [BlockType.TORCH]: 1,
        [BlockType.AIR]: 0,
    },
};


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\planet\planetHelpers.ts
==================================================

export type { PlanetConfig } from "./planetConfig";
export { DEFAULT_PLANET_CONFIG } from "./planetConfig";

export class SimplexNoise {
  private p: Uint8Array = new Uint8Array(256);
  private perm: Uint8Array = new Uint8Array(512);

  constructor() {
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  public noise2D(xin: number, yin: number): number {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1 = 0;
    let j1 = 1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    let n0 = 0;
    if (t0 > 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.gi(this.perm[ii + this.perm[jj]], x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    let n1 = 0;
    if (t1 > 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.gi(this.perm[ii + i1 + this.perm[jj + j1]], x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    let n2 = 0;
    if (t2 > 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.gi(this.perm[ii + 1 + this.perm[jj + 1]], x2, y2);
    }

    return 70.0 * (n0 + n1 + n2);
  }

  private gi(i: number, x: number, y: number): number {
    const h = i & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\planet\planetOptimizer.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "./Planet";

export function createCombinedBodies(scene: Phaser.Scene, planet: Planet, targetBlockKeys: Set<string>): MatterJS.BodyType[] {
    const blockSize = planet.config.blockSize;
    const padding = planet.config.padding ?? 0.5;
    const visited = new Set<string>();
    const bodies: MatterJS.BodyType[] = [];

    const sortedKeys = Array.from(targetBlockKeys).sort((a: string, b: string) => {
        const [x1, y1] = a.split(",").map(Number);
        const [x2, y2] = b.split(",").map(Number);
        return y1 !== y2 ? y1 - y2 : x1 - x2;
    });

    for (const key of sortedKeys) {
        if (visited.has(key)) continue;

        const [startX, startY] = key.split(",").map(Number);

        let width = 0;
        while (targetBlockKeys.has(startX + width + "," + startY) && !visited.has(startX + width + "," + startY)) {
            width++;
        }

        let height = 1;
        let canExpandDown = true;

        while (canExpandDown) {
            const nextY = startY + height;
            for (let x = 0; x < width; x++) {
                const checkKey = startX + x + "," + nextY;
                if (!targetBlockKeys.has(checkKey) || visited.has(checkKey)) {
                    canExpandDown = false;
                    break;
                }
            }
            if (canExpandDown) {
                height++;
            }
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                visited.add(startX + x + "," + (startY + y));
            }
        }

        const worldX = startX * blockSize + (width * blockSize) / 2;
        const worldY = startY * blockSize + (height * blockSize) / 2;

        const rectWidth = width * blockSize + padding;
        const rectHeight = height * blockSize + padding;

        const body = scene.matter.add.rectangle(worldX, worldY, rectWidth, rectHeight, {
            isStatic: true,
            friction: 0.8,
            frictionStatic: 1.0,
            restitution: 0,
            slop: 0,
        });

        bodies.push(body);
    }

    return bodies;
}

export class PlanetOptimizer {
    private scene: Phaser.Scene;
    private planet: Planet;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
    }

    public createCombinedBodies(targetBlockKeys: Set<string>): MatterJS.BodyType[] {
        return createCombinedBodies(this.scene, this.planet, targetBlockKeys);
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\planet\planetOutline.ts
==================================================

import Phaser from "phaser";
import type { Planet } from "./Planet";
import { PlanetOptimizer } from "./planetOptimizer";
import { BlockType } from "types";

export const CATEGORY_PLAYER = 0x0001;
export const CATEGORY_TERRAIN = 0x0002;
export const CATEGORY_LOOT = 0x0004;

export class PlanetOutline {
    private scene: Phaser.Scene;
    private planet: Planet;
    public outlineGraphics?: Phaser.GameObjects.Graphics;
    public outlineBodies: MatterJS.BodyType[] = [];
    private optimizer: PlanetOptimizer;

    constructor(scene: Phaser.Scene, planet: Planet) {
        this.scene = scene;
        this.planet = planet;
        this.optimizer = new PlanetOptimizer(scene, planet);
    }

    public draw(depth?: number): void {
        const targetDepth = depth ?? this.planet.config.outlineDepth ?? 10;

        if (this.outlineGraphics) {
            this.outlineGraphics.clear();
        } else {
            this.outlineGraphics = this.scene.add.graphics();
            this.outlineGraphics.setDepth(targetDepth);
        }

        this.outlineBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });
        this.outlineBodies = [];

        const coreBlockKeys = new Set<string>();
        const mainBlockKeys = new Set<string>();

        this.planet.blocks.forEach((block, key) => {
            if (block.type === BlockType.CORE) {
                coreBlockKeys.add(key);
            } else {
                mainBlockKeys.add(key);
            }
        });

        if (mainBlockKeys.size > 0) {
            const planetBody = this.createCompoundFromKeys(mainBlockKeys);
            if (planetBody) {
                this.outlineBodies.push(planetBody);
            }
        }

        if (coreBlockKeys.size > 0) {
            const coreBody = this.createCompoundFromKeys(coreBlockKeys);
            if (coreBody) {
                this.outlineBodies.push(coreBody);
            }
        }
    }
    private createCompoundFromKeys(keys: Set<string>): MatterJS.BodyType | undefined {
        const rectBodies = this.optimizer.createCombinedBodies(keys);

        if (rectBodies.length === 0) return undefined;

        rectBodies.forEach((body) => {
            body.collisionFilter.category = CATEGORY_TERRAIN;
        });

        if (rectBodies.length === 1) {
            return rectBodies[0];
        }

        rectBodies.forEach((body) => {
            this.scene.matter.world.remove(body);
        });

        const compoundBody = this.scene.matter.body.create({
            parts: rectBodies,
            isStatic: true,
            friction: 0.8, // Ändrat från 0 till 0.8
            frictionStatic: 1.0, // Ändrat från 0 till 1.0
            restitution: 0,
            slop: 0,
            collisionFilter: {
                category: CATEGORY_TERRAIN,
                mask: 0xffffffff,
                group: 0,
            },
        });

        this.scene.matter.world.add(compoundBody);
        return compoundBody;
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\player\index.ts
==================================================

export * from "./Player";
export * from "./playerConfig";
export * from "./playerHelpers";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\player\Player.ts
==================================================

import Phaser from "phaser";
import { Planet } from "planet";
import { type PlayerSettings, DEFAULT_PLAYER_SETTINGS, createPlayerHatTexture, createPlayerTexture } from "player";
import { CATEGORY_PLAYER, CATEGORY_TERRAIN } from "planet";
import type { MobileInputState } from "ui";
import { BlockType } from "types";
import { useGameStore } from "store";

type Directions = {
    tangentX: number;
    tangentY: number;
    currentVelocity: Phaser.Math.Vector2 | MatterJS.Vector;
    dirX: number;
    dirY: number;
    dx: number;
    dy: number;
    upX: number;
    upY: number;
    distanceToPlanetCenter: number;
};

export type PlayerDirection = "right" | "left" | "up" | "down" | "up-right" | "up-left" | "down-right" | "down-left";

export class Player {
    private debugGraphics!: Phaser.GameObjects.Graphics;
    private debugText!: Phaser.GameObjects.Text;

    private scene: Phaser.Scene;
    private planet: Planet;
    public sprite: Phaser.Physics.Matter.Sprite;
    private readonly settings: PlayerSettings;

    private isGrounded: boolean = false;
    private isClimbing: boolean = false;

    // Cooldown för klättring
    private lastJumpTime: number = 0;

    private bodySprite!: Phaser.GameObjects.Sprite; // Separat visningsgrafik för kroppen
    private hat!: Phaser.GameObjects.Sprite;
    private eyesGraphics!: Phaser.GameObjects.Graphics;
    private armorGraphics!: Phaser.GameObjects.Graphics; // Grafik för utrustning (hjälm, kläder, skor)
    private direction: PlayerDirection = "right";

    private weaponGraphics!: Phaser.GameObjects.Graphics;

    // Stabil vinkel för gravitation och rotation
    private currentSnapAngle: number = 0;
    private currentDirections?: Directions;
    private activeBlockPos?: { x: number; y: number };

    // Återanvänd Vector2-objekt för att undvika Garbage Collection
    private gravityVector: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

    private numpadKeys?: Record<string, Phaser.Input.Keyboard.Key>;
    private shiftKey!: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, planet: Planet, customSettings?: Partial<PlayerSettings>) {
        this.scene = scene;
        this.planet = planet;
        this.settings = { ...DEFAULT_PLAYER_SETTINGS, ...customSettings };

        if (scene.input.keyboard) {
            this.numpadKeys = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT,
                down: Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
                left: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
                right: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX,
            }) as Record<string, Phaser.Input.Keyboard.Key>;

            this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        }

        // Hitta en säker spawn-position fri från träd och hinder
        const spawnPos = this.findSpawnPosition();
        const startX = spawnPos.x;
        const startY = spawnPos.y;

        // Kvadratisk fysikkropp (12x12) så att rotation vid hörn inte trycker in spelaren i marken
        const bodySize = Math.min(this.settings.width, this.settings.height);
        const body = this.scene.matter.bodies.rectangle(startX, startY, bodySize, bodySize, {
            friction: this.settings.friction,
            frictionStatic: this.settings.frictionStatic,
            frictionAir: this.settings.frictionAir,
            restitution: this.settings.restitution,
            slop: 0,
            chamfer: { radius: 2 },
        });

        this.sprite = this.scene.matter.add.sprite(startX, startY, "player_tile");
        this.sprite.setDisplaySize(this.settings.width, this.settings.height);

        if (this.sprite.body) {
            const body = this.sprite.body as MatterJS.BodyType;
            (body as unknown as { isContinuous: boolean }).isContinuous = true;
        }

        this.sprite.setData("isPlayer", true);

        // Sätt att spelaren tillhör CATEGORY_PLAYER och ENDAST krockar med CATEGORY_TERRAIN
        this.sprite.setCollisionCategory(CATEGORY_PLAYER);
        this.sprite.setCollidesWith([CATEGORY_TERRAIN]);

        this.sprite.setExistingBody(body);
        this.sprite.setFixedRotation();
        this.sprite.setVisible(false);

        this.createDebug();
    }

    public spawn(): void {
        if (!this.scene.textures.exists("player_tile")) {
            createPlayerTexture(this.scene, "player_tile", this.settings.bodyColor);
        }

        this.bodySprite = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_tile");
        this.bodySprite.setDisplaySize(this.settings.width, this.settings.height);
        this.bodySprite.setDepth(10);

        if (!this.scene.textures.exists("player_hat")) {
            createPlayerHatTexture(this.scene, "player_hat", this.settings.hatColor);
            this.hat = this.scene.add.sprite(this.sprite.x, this.sprite.y, "player_hat");
            this.hat.setScale(this.settings.hatScale);
            this.hat.setOrigin(0.5, 1);
            this.hat?.setDepth(12);
        }

        this.armorGraphics = this.scene.add.graphics();
        this.armorGraphics?.setDepth(11);

        this.eyesGraphics = this.scene.add.graphics();
        this.eyesGraphics?.setDepth(13);

        this.weaponGraphics = this.scene.add.graphics();
        this.weaponGraphics.setDepth(14);
    }

    private findSpawnPosition(): { x: number; y: number } {
        const radius = this.planet.config.radius;
        const mapSize = radius * 2;
        const blockSize = this.planet.config.blockSize;

        let bestGridX = Math.floor(radius);
        let bestSurfaceY = -1;

        // Sök efter en lämplig kolumn i närheten av mitten (x = radius)
        for (let offsetX = 0; offsetX < radius; offsetX = offsetX <= 0 ? -offsetX + 1 : -offsetX) {
            const checkX = Math.floor(radius) + offsetX;
            if (checkX < 0 || checkX >= mapSize) continue;

            // Hitta det översta blocket i den aktuella kolumnen
            let highestBlockY = -1;
            let highestBlockType: BlockType | null = null;

            for (let y = 0; y < mapSize; y++) {
                const block = this.planet.blocks.get(checkX + "," + y);
                if (block) {
                    highestBlockY = y;
                    highestBlockType = block.type;
                    break;
                }
            }

            // Om det översta blocket är DIRT eller STONE är det säkert att spawna ovanför
            if (highestBlockY !== -1 && (highestBlockType === BlockType.DIRT || highestBlockType === BlockType.STONE)) {
                bestGridX = checkX;
                bestSurfaceY = highestBlockY;
                break;
            }
        }

        // Om ingen ren mark hittades, fall tillbaka på toppen av den mittersta kolumnen
        if (bestSurfaceY === -1) {
            for (let y = 0; y < mapSize; y++) {
                const block = this.planet.blocks.get(Math.floor(radius) + "," + y);
                if (block) {
                    bestSurfaceY = y;
                    break;
                }
            }
        }

        const worldX = bestGridX * blockSize + blockSize / 2;
        // Placera spelaren precis ovanför det översta blocket
        const worldY = (bestSurfaceY - 1) * blockSize + blockSize / 2;

        return { x: worldX, y: worldY };
    }

    public getDirection(): PlayerDirection {
        return this.direction;
    }

    private isBoarded: boolean = false;

    public setBoarded(boarded: boolean, position?: { x: number; y: number }): void {
        this.isBoarded = boarded;
        this.bodySprite?.setVisible(!boarded);
        this.hat?.setVisible(!boarded);
        this.eyesGraphics?.setVisible(!boarded);
        this.armorGraphics?.setVisible(!boarded);
        this.sprite.setSensor(boarded);

        if (position) {
            this.sprite.setPosition(position.x, position.y);
            const body = this.sprite.body as MatterJS.BodyType;
            if (body) {
                this.scene.matter.body.setPosition(body, position);
                this.scene.matter.body.setVelocity(body, { x: 0, y: 0 });
            }
        }
    }

    public update(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: MobileInputState,
        joystickState?: {
            up: boolean;
            down: boolean;
            left: boolean;
            right: boolean;
            direction?: PlayerDirection | null;
        },
    ): void {
        if (this.isBoarded) return;
        this.updatePlayer(cursors, mobileState, joystickState);
        this.updateBodyPosition();
        this.updateHatPosition();
        this.drawEyes();
        this.drawEquipment();
        this.updateDebugGraphics();
    }

    private updatePlayer(
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        mobileState?: MobileInputState,
        joystickState?: {
            up: boolean;
            down: boolean;
            left: boolean;
            right: boolean;
            direction?: PlayerDirection | null;
        },
    ) {
        if (!this.sprite.body || !this.sprite.body.velocity || !this.sprite.body.position) return;

        const time = this.scene.time.now;

        const directions = this.calculateDirections();
        if (!directions || directions.distanceToPlanetCenter === 0) return;

        if (!this.isClimbing) {
            this.applyGravity(directions);
        }

        this.isGrounded = this.checkGroundedWithRay(directions);

        const isUp = Boolean(this.numpadKeys?.up?.isDown) || Boolean(cursors?.up?.isDown) || Boolean(mobileState?.up);
        const isDown = Boolean(this.numpadKeys?.down?.isDown) || Boolean(cursors?.down?.isDown) || Boolean(mobileState?.down);
        const isLeft = Boolean(this.numpadKeys?.left?.isDown) || Boolean(cursors?.left?.isDown) || Boolean(mobileState?.left);
        const isRight = Boolean(this.numpadKeys?.right?.isDown) || Boolean(cursors?.right?.isDown) || Boolean(mobileState?.right);

        const isHoldingShift = Boolean(this.shiftKey?.isDown);

        if (joystickState?.direction) {
            this.direction = joystickState.direction;
        } else if (isUp && isRight) {
            this.direction = "up-right";
        } else if (isUp && isLeft) {
            this.direction = "up-left";
        } else if (isDown && isRight) {
            this.direction = "down-right";
        } else if (isDown && isLeft) {
            this.direction = "down-left";
        } else if (isUp) {
            this.direction = "up";
        } else if (isDown) {
            this.direction = "down";
        } else if (isLeft) {
            this.direction = "left";
        } else if (isRight) {
            this.direction = "right";
        }

        const shouldMoveLeft = !isHoldingShift && (isLeft || Boolean(joystickState?.left));
        const shouldMoveRight = !isHoldingShift && (isRight || Boolean(joystickState?.right));

        // Hastighetsmultiplikator baserad på skor
        const boots = useGameStore.getState().equipment.boots;
        const speedMultiplier = boots && boots.speedBonus ? boots.speedBonus : 1;
        const effectiveMoveSpeed = this.settings.moveSpeed * speedMultiplier;

        if (!this.isClimbing) {
            if (shouldMoveLeft || shouldMoveRight) {
                const dirSign = shouldMoveRight ? 1 : -1;
                const blockAhead = this.hasBlockInFront(directions, shouldMoveRight);

                let moveX = directions.tangentX * dirSign;
                let moveY = directions.tangentY * dirSign;

                if (blockAhead) {
                    const length = Math.SQRT2;
                    moveX = (moveX + directions.upX) / length;
                    moveY = (moveY + directions.upY) / length;
                }

                this.sprite.setVelocity(
                    moveX * effectiveMoveSpeed + directions.currentVelocity.x * 0.1,
                    moveY * effectiveMoveSpeed + directions.currentVelocity.y * 0.1,
                );
            } else {
                const body = this.sprite.body as MatterJS.BodyType;

                const currentTangentSpeed = body.velocity.x * directions.tangentX + body.velocity.y * directions.tangentY;
                const upSpeed = body.velocity.x * directions.upX + body.velocity.y * directions.upY;

                const newTangentSpeed = currentTangentSpeed * 0.8;

                this.scene.matter.body.setVelocity(body, {
                    x: directions.tangentX * newTangentSpeed + directions.upX * upSpeed,
                    y: directions.tangentY * newTangentSpeed + directions.upY * upSpeed,
                });
            }
        }

        const isSpaceJustDown = Boolean(cursors?.space) && Phaser.Input.Keyboard.JustDown(cursors.space);
        const isMobileJump = Boolean(mobileState?.jump);
        const canJump = time - this.lastJumpTime > this.settings.jumpCooldown;

        const isJumpPressed = (isSpaceJustDown || isMobileJump) && canJump;

        if (isJumpPressed && this.isGrounded && !this.isClimbing) {
            const isMovingRight = this.direction.includes("right");

            if (this.canClimb(directions, isMovingRight)) {
                this.isClimbing = true;
                const dirSign = isMovingRight ? 1 : -1;
                const stepSize = this.planet.config.blockSize;

                const body = this.sprite.body as MatterJS.BodyType;

                const targetX = this.sprite.x + directions.upX * stepSize + directions.tangentX * stepSize * dirSign;
                const targetY = this.sprite.y + directions.upY * stepSize + directions.tangentY * stepSize * dirSign;

                this.sprite.setSensor(true);

                this.scene.tweens.add({
                    targets: this.sprite,
                    x: targetX,
                    y: targetY,
                    duration: this.settings.climbDuration,
                    ease: "Linear",
                    onUpdate: () => {
                        this.scene.matter.body.setPosition(body, {
                            x: this.sprite.x,
                            y: this.sprite.y,
                        });
                    },
                    onComplete: () => {
                        this.scene.matter.body.setPosition(body, {
                            x: targetX,
                            y: targetY,
                        });
                        this.scene.matter.body.setVelocity(body, { x: 0, y: 0 });

                        this.sprite.setSensor(false);
                        this.isClimbing = false;
                        this.lastJumpTime = time;
                    },
                });
            }
        }

        const body = this.sprite.body as MatterJS.BodyType;
        const velX = body.velocity.x;
        const velY = body.velocity.y;

        const tangentSpeed = velX * directions.tangentX + velY * directions.tangentY;

        if (Math.abs(tangentSpeed) > this.settings.maxVelocity && !this.isClimbing) {
            const clampedTangent = Math.sign(tangentSpeed) * this.settings.maxVelocity;
            const diff = clampedTangent - tangentSpeed;

            this.scene.matter.body.setVelocity(body, {
                x: velX + directions.tangentX * diff,
                y: velY + directions.tangentY * diff,
            });
        }
    }

    private checkGroundedWithRay(directions: Directions): boolean {
        if (!this.sprite.body) return false;

        const startX = this.sprite.x;
        const startY = this.sprite.y;

        const rayLength = this.settings.height / 2 + 3;
        const halfWidth = this.settings.width / 2 - 1;

        const allBodies = this.scene.matter.world.getAllBodies();
        const bodiesToTest = allBodies.filter((body) => body !== this.sprite.body);

        const offsets = [-halfWidth, 0, halfWidth];

        for (const offset of offsets) {
            const originX = startX + directions.tangentX * offset;
            const originY = startY + directions.tangentY * offset;

            const endX = originX - directions.upX * rayLength;
            const endY = originY - directions.upY * rayLength;

            const collisions = this.scene.matter.query.ray(bodiesToTest, { x: originX, y: originY }, { x: endX, y: endY });

            if (collisions.length > 0) {
                return true;
            }
        }

        return false;
    }

    private applyGravity(directions: Directions): void {
        if (!this.sprite.body) return;

        // Gravitationen drar mot planetens centrum (-upX, -upY)
        this.gravityVector.set(-directions.upX * this.settings.gravityStrength, -directions.upY * this.settings.gravityStrength);
        this.sprite.applyForce(this.gravityVector);

        this.sprite.setRotation(this.currentSnapAngle);
    }

    private calculateDirections(): Directions | undefined {
        if (!this.sprite.body) return;

        const playerPos = this.sprite.body.position;
        const planetCenter = this.planet.center;

        const dx = planetCenter.x - playerPos.x;
        const dy = planetCenter.y - playerPos.y;
        const distanceToPlanetCenter = Math.sqrt(dx * dx + dy * dy);

        if (distanceToPlanetCenter === 0) return;

        const dirX = dx / distanceToPlanetCenter;
        const dirY = dy / distanceToPlanetCenter;
        const blockSize = this.planet.config.blockSize;

        // Bestäm vinkeln utifrån spelarens position relativt planetens centrum (0, 90, 180, 270 deg)
        const margin = 12;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        let targetAngle = this.currentSnapAngle;

        if (absX > absY + margin) {
            targetAngle = dx > 0 ? -Math.PI / 2 : Math.PI / 2;
        } else if (absY > absX + margin) {
            targetAngle = dy > 0 ? 0 : Math.PI;
        }

        // Byt vinkel på fysikkroppen vid sidändring
        if (targetAngle !== this.currentSnapAngle) {
            this.currentSnapAngle = targetAngle;
            const body = this.sprite.body as MatterJS.BodyType;
            this.scene.matter.body.setVelocity(body, { x: 0, y: 0 });
            this.scene.matter.body.setAngle(body, targetAngle);
        }

        const upX = Math.sin(this.currentSnapAngle);
        const upY = -Math.cos(this.currentSnapAngle);

        // Hitta markblocket direkt under fötterna för debug-visning
        const currentGridX = Math.floor(playerPos.x / blockSize);
        const currentGridY = Math.floor(playerPos.y / blockSize);
        const feetGridX = currentGridX - Math.round(upX);
        const feetGridY = currentGridY - Math.round(upY);
        const feetKey = feetGridX + "," + feetGridY;

        if (this.planet.blocks.has(feetKey)) {
            this.activeBlockPos = { x: feetGridX, y: feetGridY };
        } else {
            this.activeBlockPos = undefined;
        }

        const tangentX = -upY;
        const tangentY = upX;

        const currentVelocity = this.sprite.body.velocity;

        const directionsResult = { tangentX, tangentY, currentVelocity, dirX, dirY, dx, dy, upX, upY, distanceToPlanetCenter };
        this.currentDirections = directionsResult;

        return directionsResult;
    }

    private canClimb(directions: Directions, isMovingRight: boolean): boolean {
        const blockSize = this.planet.config.blockSize;
        const dirSign = isMovingRight ? 1 : -1;

        const wallX = Math.floor((this.sprite.x + directions.tangentX * blockSize * dirSign) / blockSize);
        const wallY = Math.floor((this.sprite.y + directions.tangentY * blockSize * dirSign) / blockSize);

        const headX = Math.floor((this.sprite.x + directions.upX * blockSize) / blockSize);
        const headY = Math.floor((this.sprite.y + directions.upY * blockSize) / blockSize);

        const targetX = Math.floor((this.sprite.x + directions.upX * blockSize + directions.tangentX * blockSize * dirSign) / blockSize);
        const targetY = Math.floor((this.sprite.y + directions.upY * blockSize + directions.tangentY * blockSize * dirSign) / blockSize);

        const hasWall = this.planet.blocks.has(wallX + "," + wallY);
        const hasCeiling = this.planet.blocks.has(headX + "," + headY);
        const isTargetBlocked = this.planet.blocks.has(targetX + "," + targetY);

        return hasWall && !hasCeiling && !isTargetBlocked;
    }

    private hasBlockInFront(directions: Directions, isRight: boolean): boolean {
        const blockSize = this.planet.config.blockSize;
        const dirSign = isRight ? 1 : -1;

        const frontX = this.sprite.x + directions.tangentX * blockSize * dirSign;
        const frontY = this.sprite.y + directions.tangentY * blockSize * dirSign;

        const gridX = Math.floor(frontX / blockSize);
        const gridY = Math.floor(frontY / blockSize);

        return this.planet.blocks.has(gridX + "," + gridY);
    }

    private updateBodyPosition(): void {
        if (!this.bodySprite || !this.sprite) return;

        const currentRotation = this.sprite.rotation;
        const upAngle = currentRotation - Math.PI / 2;

        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);

        // Beräkna förskjutningen i "upp"-riktningen baserat på kroppens rotation
        const offsetX = upX;
        const offsetY = upY * +2;

        this.bodySprite.setPosition(this.sprite.x + offsetX, this.sprite.y + offsetY);
        this.bodySprite.setRotation(currentRotation);
    }

    private updateHatPosition(): void {
        if (!this.hat || !this.sprite) return;

        const currentRotation = this.sprite.rotation;
        const upAngle = currentRotation - Math.PI / 2;

        const upX = Math.cos(upAngle);
        const upY = Math.sin(upAngle);

        const headOffset = this.settings.height / 2 + 2;

        this.hat.setPosition(this.sprite.x + upX * headOffset, this.sprite.y + upY * headOffset);
        this.hat.setRotation(currentRotation);
        this.hat.setFlipX(this.direction.includes("left"));
    }

    private drawEquipment(): void {
        if (!this.armorGraphics || !this.sprite) return;

        this.armorGraphics.clear();
        this.armorGraphics.setPosition(this.sprite.x, this.sprite.y);
        this.armorGraphics.setRotation(this.sprite.rotation);

        const equipment = useGameStore.getState().equipment;

        // 1. Kläder (Chest)
        if (equipment.chest) {
            this.armorGraphics.fillStyle(equipment.chest.color, 1);
            this.armorGraphics.fillRect(-6, -4, 12, 8);
        }

        // 2. Skor (Boots)
        if (equipment.boots) {
            this.armorGraphics.fillStyle(equipment.boots.color, 1);
            this.armorGraphics.fillRect(-6, 4, 5, 4);
            this.armorGraphics.fillRect(1, 4, 5, 4);
        }

        // 3. Hjälm (Helmet)
        if (equipment.helmet) {
            this.armorGraphics.fillStyle(equipment.helmet.color, 1);
            this.armorGraphics.fillRect(-7, -10, 14, 5);
        }
    }

    private drawEyes(): void {
        if (!this.eyesGraphics || !this.sprite) return;

        this.eyesGraphics.clear();
        this.eyesGraphics.setPosition(this.sprite.x, this.sprite.y - 2);
        this.eyesGraphics.setRotation(this.sprite.rotation);

        this.eyesGraphics.setScale(this.settings.eyeScale);

        let pupilOffsetX = 0;
        let pupilOffsetY = 0;

        if (this.direction.includes("right")) pupilOffsetX = 4;
        if (this.direction.includes("left")) pupilOffsetX = -4;
        if (this.direction.includes("up")) pupilOffsetY = -4;
        if (this.direction.includes("down")) pupilOffsetY = 4;

        this.eyesGraphics.fillStyle(0xffffff, 1);
        this.eyesGraphics.fillRect(-16, -16, 12, 16);
        this.eyesGraphics.fillRect(4, -16, 12, 16);

        this.eyesGraphics.fillStyle(0x000000, 1);
        this.eyesGraphics.fillRect(-12 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);
        this.eyesGraphics.fillRect(8 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);
    }

    public swingWeapon(): void {
        if (!this.weaponGraphics || !this.sprite) return;

        const currentTool = useGameStore.getState().currentTool;
        if (currentTool?.type !== "sword") return;

        this.weaponGraphics.clear();
        this.weaponGraphics.setPosition(this.sprite.x, this.sprite.y);
        this.weaponGraphics.setRotation(this.sprite.rotation);

        // Rita en bågformad attackbåge (svepning)
        this.weaponGraphics.lineStyle(3, 0xffffff, 0.9);
        this.weaponGraphics.beginPath();
        this.weaponGraphics.arc(0, 0, 20, -Math.PI / 4, Math.PI / 4, false);
        this.weaponGraphics.strokePath();

        // Tona ut svärdsvepningen snabbt
        this.scene.tweens.add({
            targets: this.weaponGraphics,
            alpha: { from: 1, to: 0 },
            duration: 150,
            onComplete: () => {
                this.weaponGraphics.clear();
                this.weaponGraphics.setAlpha(1);
            },
        });
    }

    private createDebug() {
        this.debugGraphics = this.scene.add.graphics();
        this.debugText = this.scene.add.text(0, 0, "", {
            fontFamily: "monospace",
            fontSize: "16px",
            align: "center",
            color: "#ffffff",
            backgroundColor: "#00000088",
        });
        this.debugText.setDepth(100);
        this.debugText.setScale(0.5);
    }

    private updateDebugGraphics(): void {
        this.debugGraphics.clear();

        const isDebugActive = this.scene.matter.world.drawDebug;

        if (isDebugActive && this.sprite && this.currentDirections) {
            const playerX = this.sprite.x;
            const playerY = this.sprite.y;
            const blockSize = this.planet.config.blockSize;

            // 1. Markera det aktiva markblocket med en färgad ram (om det finns ett)
            if (this.activeBlockPos) {
                const blockWorldX = this.activeBlockPos.x * blockSize;
                const blockWorldY = this.activeBlockPos.y * blockSize;

                const activeBlockColor = 0x9933ff;
                this.debugGraphics.lineStyle(2, activeBlockColor, 1);
                this.debugGraphics.fillStyle(activeBlockColor, 0.8);
                this.debugGraphics.strokeRect(blockWorldX, blockWorldY, blockSize, blockSize);
                this.debugGraphics.fillRect(blockWorldX, blockWorldY, blockSize, blockSize);
            }

            // 2. Rita gravitationsvektorn i rött (pekar mot centrum)
            const vectorLength = 24;
            const gravityDirX = -this.currentDirections.upX;
            const gravityDirY = -this.currentDirections.upY;

            const endX = playerX + gravityDirX * vectorLength;
            const endY = playerY + gravityDirY * vectorLength;

            const gravityColor = 0xff0000; // Röd (Gravitationspilen)
            this.debugGraphics.lineStyle(3, gravityColor, 1);
            this.debugGraphics.lineBetween(playerX, playerY, endX, endY);
            this.debugGraphics.fillStyle(gravityColor, 1);
            this.debugGraphics.fillCircle(endX, endY, 4);

            // 3. Rita tangent/rörelseriktning i blått
            const tangentColor = 0x0088ff; // Blå (Rörelseriktning/tangent)
            const facingSign = this.direction.includes("left") ? -1 : 1;
            const tangentEndX = playerX + this.currentDirections.tangentX * facingSign * 24;
            const tangentEndY = playerY + this.currentDirections.tangentY * facingSign * 24;
            this.debugGraphics.lineStyle(1, tangentColor, 0.8);
            this.debugGraphics.lineBetween(playerX, playerY, tangentEndX, tangentEndY);

            // 4. Debug-text
            const direction = this.getDirection();
            this.debugText.setPosition(playerX - 10, playerY - 32);
            this.debugText.setText("Dir: " + direction);
            this.debugText.setVisible(false);
        } else {
            this.debugText.setVisible(false);
        }
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\player\playerConfig.ts
==================================================

export interface PlayerSettings {
    gravityStrength: number;
    frictionAir: number;

    density: number;
    friction: number;
    frictionStatic: number;
    restitution: number;
    width: number;
    height: number;
    moveSpeed: number;
    maxVelocity: number;
    jumpForce: number;
    maxJumpBlocks: number;
    groundNormalThreshold: number;
    landingVelocityScale: number;

    // Klättring & Cooldowns
    jumpCooldown: number;
    climbDuration: number;

    // Utseende & Färger
    bodyColor: number;
    hatColor: number;
    hatScale: number;
    eyeScale: number;
}

export const DEFAULT_PLAYER_SETTINGS: PlayerSettings = {
    // Planet & Fysikmiljö
    gravityStrength: 0.001,
    frictionAir: 0.1,

    // Spelarens fysikegenskaper
    density: 0.1,
    friction: 0,
    frictionStatic: 1,
    restitution: 0, // Ingen studs för att förhindra penetration

    // Storlek på spelaren och dess hit-box
    width: 12,
    height: 16,

    // Rörelsevärden
    moveSpeed: 2,
    maxVelocity: 2,
    jumpForce: 0.005,
    maxJumpBlocks: 1.5, // Spelaren hoppar maximalt 1.5 block högt över marken

    // Markkontakt
    groundNormalThreshold: 0.4,

    // Andelen av den nedåtriktade hastigheten som behålls när spelaren landar
    landingVelocityScale: 0.5,

    // Klättring & Cooldowns
    jumpCooldown: 250,
    climbDuration: 180,

    // Utseende & Färger
    bodyColor: 0x00ff00,
    hatColor: 0xff0000,
    hatScale: 0.25,
    eyeScale: 0.25,
};


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\player\playerHelpers.ts
==================================================

import Phaser from "phaser";

// Genererar den högupplösta spelartexturen
export function createPlayerTexture(scene: Phaser.Scene, key: string, color: number = 0x00ff00): void {
  const textureWidth = 48;
  const textureHeight = 64;

  const graphics = scene.make.graphics({ x: 0, y: 0 });

  // Fyllnad för spelarens kropp
  graphics.fillStyle(color, 1);
  graphics.fillRect(0, 0, textureWidth, textureHeight);

  // Konturlinje i högupplösning
  graphics.lineStyle(2, 0x000000, 0.4);
  graphics.strokeRect(0, 0, textureWidth, textureHeight);

  graphics.generateTexture(key, textureWidth, textureHeight);
  graphics.destroy();
}

// Genererar hattexturen direkt i spelardomänen
export function createPlayerHatTexture(scene: Phaser.Scene, key: string, color: number): void {
  const scale = 4;
  const width = 14 * scale;
  const height = 8 * scale;

  const graphics = scene.make.graphics({ x: 0, y: 0 });

  // Hattkulle
  graphics.fillStyle(color, 1);
  graphics.fillRect(2 * scale, 2 * scale, 8 * scale, 4 * scale);

  // Hattskärm åt höger
  graphics.fillRect(2 * scale, 6 * scale, 12 * scale, 2 * scale);

  // Konturlinje för hatten
  graphics.lineStyle(1 * scale, 0x000000, 0.3);
  graphics.strokeRect(2 * scale, 2 * scale, 8 * scale, 4 * scale);

  graphics.generateTexture(key, width, height);
  graphics.destroy();

  // Tvinga skarpare/mjukare filtrering när texturen skalas ner
  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\rocket\index.ts
==================================================

export { Rocket } from "./Rocket";
export { createRocketTexture } from "./rocketHelpers";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\rocket\Rocket.ts
==================================================

import Phaser from "phaser";
import { Planet, CATEGORY_TERRAIN } from "planet";
import type { Player } from "../player/Player";
import type { CameraController } from "../camera/Camera";
import { createRocketTexture } from "./rocketHelpers";
import type { MobileInputState } from "ui";

export const CATEGORY_ROCKET = 0x0008;

export class Rocket {
  private scene: Phaser.Scene;
  private planet: Planet;
  public sprite!: Phaser.Physics.Matter.Sprite;

  public isBoarded: boolean = false;
  private player?: Player;
  private cameraController?: CameraController;

  private promptText!: Phaser.GameObjects.Text;
  private flameGraphics!: Phaser.GameObjects.Graphics;

  private eKey?: Phaser.Input.Keyboard.Key;
  private wKey?: Phaser.Input.Keyboard.Key;
  private aKey?: Phaser.Input.Keyboard.Key;
  private sKey?: Phaser.Input.Keyboard.Key;
  private dKey?: Phaser.Input.Keyboard.Key;

  private thrustPower: number = 0.003;

  constructor(scene: Phaser.Scene, planet: Planet) {
    this.scene = scene;
    this.planet = planet;

    if (scene.input.keyboard) {
      this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
  }

  public setPlayerAndCamera(player: Player, cameraController: CameraController): void {
    this.player = player;
    this.cameraController = cameraController;
  }

  public spawn(): void {
    if (!this.scene.textures.exists("rocket_tile")) {
      createRocketTexture(this.scene, "rocket_tile");
    }

    const radius = this.planet.config.radius;
    const mapSize = radius * 2;
    const blockSize = this.planet.config.blockSize;

    // Hitta en bra plats att spawna på
    // Måste vara minst 10 block från mitten (där spelaren spawnar)
    // Måste ha minst 2 block bred platt yta av DIRT (typ 0) utan träd eller stenar ovanpå
    let bestGridX = Math.floor(radius);
    let bestGridY = 0;

    for (let x = Math.floor(radius) + 10; x < mapSize - 2; x++) {
      let y1 = -1;
      let y2 = -1;
      let type1 = -1;
      let type2 = -1;

      // Hitta översta blocket för x
      for (let y = 0; y < mapSize; y++) {
        const block = this.planet.blocks.get(x + "," + y);
        if (block) {
          y1 = y;
          type1 = block.type;
          break;
        }
      }

      // Hitta översta blocket för x + 1
      for (let y = 0; y < mapSize; y++) {
        const block = this.planet.blocks.get(x + 1 + "," + y);
        if (block) {
          y2 = y;
          type2 = block.type;
          break;
        }
      }

      // Kolla om ytan är platt och består av rent gräs/smuts (DIRT = 0)
      if (y1 !== -1 && y1 === y2 && type1 === 0 && type2 === 0) {
        bestGridX = x;
        bestGridY = y1;
        break; // Hittade en perfekt landningsplats!
      }
    }

    const rocketWidth = 128;
    const rocketHeight = 72;

    // Centrera raketen mellan de två platta blocken
    const spawnX = bestGridX * blockSize + blockSize;
    const spawnY = bestGridY * blockSize - rocketHeight / 2 - 15;

    // Dynamisk sprit från start så att massa och fysik beräknas korrekt utan NaN
    this.sprite = this.scene.matter.add.sprite(spawnX, spawnY, "rocket_tile", undefined, {
      friction: 0.8,
      frictionStatic: 1.0,
      frictionAir: 0.02,
      density: 0.05,
      restitution: 0,
    });

    this.sprite.setCollisionCategory(CATEGORY_ROCKET);
    this.sprite.setCollidesWith([CATEGORY_TERRAIN]);
    this.sprite.setFixedRotation();

    this.sprite.setDisplaySize(rocketWidth, rocketHeight);
    this.sprite.setData("isRocket", true);
    this.sprite.setDepth(5);

    // Prompt för att hoppa in i raketen
    this.promptText = this.scene.add.text(spawnX, spawnY - 65, "[E] Gå in i raketen", {
      fontFamily: "sans-serif",
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#000000aa",
      padding: { x: 8, y: 4 },
    });
    this.promptText.setOrigin(0.5);
    this.promptText.setDepth(100);
    this.promptText.setVisible(false);

    this.promptText.setInteractive({ useHandCursor: true });
    this.promptText.on("pointerdown", () => {
      if (!this.isBoarded) {
        this.boardRocket();
      } else {
        this.exitRocket();
      }
    });

    // Flamma grafik
    this.flameGraphics = this.scene.add.graphics();
    this.flameGraphics.setDepth(4);
  }

  public update(
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys,
    mobileState?: MobileInputState,
    joystickState?: { up: boolean; down: boolean; left: boolean; right: boolean },
  ): void {
    if (!this.sprite || !this.sprite.active || isNaN(this.sprite.x) || isNaN(this.sprite.y)) return;

    const playerSprite = this.player?.sprite;

    // Gravitation mot planetens centrum (gäller alltid för raketen)
    const planetCenter = this.planet.center;
    const dx = planetCenter.x - this.sprite.x;
    const dy = planetCenter.y - this.sprite.y;
    const distToCenter = Math.hypot(dx, dy);

    if (distToCenter > 0) {
      const body = this.sprite.body as MatterJS.BodyType;
      if (body) {
        const gravityMag = 0.001 * body.mass;
        const gravityForce = new Phaser.Math.Vector2((dx / distToCenter) * gravityMag, (dy / distToCenter) * gravityMag);
        this.sprite.applyForce(gravityForce);
      }
    }

    // Om spelaren inte är i raketen: Kolla avstånd för prompt
    if (!this.isBoarded && playerSprite) {
      const dist = Phaser.Math.Distance.Between(playerSprite.x, playerSprite.y, this.sprite.x, this.sprite.y);

      if (dist < 80) {
        const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
        this.promptText.setPosition(this.sprite.x + Math.cos(angleRad) * 65, this.sprite.y + Math.sin(angleRad) * 65);
        this.promptText.setRotation(this.sprite.rotation);
        this.promptText.setText("[E] Gå in i raketen");
        this.promptText.setVisible(true);

        if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
          this.boardRocket();
        }
      } else {
        this.promptText.setVisible(false);
      }

      this.flameGraphics.clear();
      return;
    }

    // Om spelaren är i raketen:
    if (this.isBoarded) {
      if (playerSprite && playerSprite.body) {
        this.scene.matter.body.setPosition(playerSprite.body as MatterJS.BodyType, {
          x: this.sprite.x,
          y: this.sprite.y,
        });
      }

      const body = this.sprite.body as MatterJS.BodyType;
      const speed = body ? body.speed : 0;
      const isLanded = speed < 0.5;

      if (isLanded) {
        const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
        this.promptText.setPosition(this.sprite.x + Math.cos(angleRad) * 75, this.sprite.y + Math.sin(angleRad) * 75);
        this.promptText.setRotation(this.sprite.rotation);
        this.promptText.setText("[E] Lämna raketen");
        this.promptText.setVisible(true);

        // Kolla om spelaren vill lämna raketen
        if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
          this.exitRocket();
          return;
        }
      } else {
        this.promptText.setVisible(false);
      }

      // Flygkontroller
      const isThrusting =
        Boolean(this.wKey?.isDown) || Boolean(cursors?.up?.isDown) || Boolean(mobileState?.up) || Boolean(joystickState?.up);
      const isRotatingLeft =
        Boolean(this.aKey?.isDown) || Boolean(cursors?.left?.isDown) || Boolean(mobileState?.left) || Boolean(joystickState?.left);
      const isRotatingRight =
        Boolean(this.dKey?.isDown) || Boolean(cursors?.right?.isDown) || Boolean(mobileState?.right) || Boolean(joystickState?.right);
      const isBraking =
        Boolean(this.sKey?.isDown) || Boolean(cursors?.down?.isDown) || Boolean(mobileState?.down) || Boolean(joystickState?.down);

      // Rotation (endast tillåten när raketen har lättat från marken)
      if (!isLanded) {
        if (isRotatingLeft) {
          this.sprite.setAngle(this.sprite.angle - 2.5);
        }
        if (isRotatingRight) {
          this.sprite.setAngle(this.sprite.angle + 2.5);
        }
      }

      // Drivkraft (Thrust)
      this.flameGraphics.clear();
      if (isThrusting) {
        const body = this.sprite.body as MatterJS.BodyType;
        if (body) {
          const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
          const forceMag = this.thrustPower * body.mass;
          const thrustX = Math.cos(angleRad) * forceMag;
          const thrustY = Math.sin(angleRad) * forceMag;

          this.sprite.applyForce(new Phaser.Math.Vector2(thrustX, thrustY));

          // Rita motorflamma vid utblåset
          this.drawEngineFlame();
        }
      }

      if (isBraking) {
        const body = this.sprite.body as MatterJS.BodyType;
        if (body) {
          this.scene.matter.body.setVelocity(body, {
            x: body.velocity.x * 0.95,
            y: body.velocity.y * 0.95,
          });
        }
      }
    }
  }

  private boardRocket(): void {
    if (!this.player) return;
    this.isBoarded = true;
    this.player.setBoarded(true);

    // Sätt kameran att följa raketen och zooma ut mjukt
    if (this.cameraController) {
      this.cameraController.follow(this.sprite, 0.8);
    }
  }

  private exitRocket(): void {
    if (!this.player) return;
    this.isBoarded = false;

    // Placera spelaren bredvid raketen
    const exitX = this.sprite.x + 40;
    const exitY = this.sprite.y;

    this.player.setBoarded(false, { x: exitX, y: exitY });

    // Återställ kameran att följa spelaren och zooma in till normalnivå
    if (this.cameraController && this.player.sprite) {
      this.cameraController.follow(this.player.sprite, 2.0);
    }

    this.promptText.setVisible(false);
    this.flameGraphics.clear();
  }

  private drawEngineFlame(): void {
    const angleRad = Phaser.Math.DegToRad(this.sprite.angle - 90);
    const bottomX = this.sprite.x - Math.cos(angleRad) * 45;
    const bottomY = this.sprite.y - Math.sin(angleRad) * 45;

    this.flameGraphics.fillStyle(0xff6600, 0.9);
    this.flameGraphics.fillCircle(bottomX + (Math.random() * 6 - 3), bottomY + (Math.random() * 6 - 3), 10 + Math.random() * 8);

    this.flameGraphics.fillStyle(0xffff00, 1);
    this.flameGraphics.fillCircle(bottomX, bottomY, 5 + Math.random() * 4);
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\game\rocket\rocketHelpers.ts
==================================================

import Phaser from "phaser";

/**
 * Genererar en 8-bitars utomjordisk rymdfarkost med Phaser Graphics.
 */
export function createRocketTexture(scene: Phaser.Scene, key = "rocket_tile"): void {
  const width = 128;
  const height = 72;

  const g = scene.make.graphics({ x: 0, y: 0 });
  const offsetY = 8;

  // 1. Sidovapen (Vänster och Höger)
  g.fillStyle(0x00e5ff, 1);
  g.fillRect(2, 32 + offsetY, 10, 8);
  g.fillRect(116, 32 + offsetY, 10, 8);

  g.fillStyle(0x333333, 1);
  g.fillRect(12, 30 + offsetY, 8, 12);
  g.fillRect(108, 30 + offsetY, 8, 12);

  // 2. Vingelement / Sido-thrusters
  g.fillStyle(0x7b1fa2, 1);
  g.fillRect(16, 24 + offsetY, 16, 24);
  g.fillRect(96, 24 + offsetY, 16, 24);

  g.fillStyle(0x4a148c, 1);
  g.fillRect(16, 40 + offsetY, 16, 8);
  g.fillRect(96, 40 + offsetY, 16, 8);

  // 3. Huvudskrov (Tefat / UFO-kropp)
  g.fillStyle(0x9c27b0, 1);
  g.fillRect(28, 20 + offsetY, 72, 32);

  g.fillStyle(0xba68c8, 1);
  g.fillRect(32, 16 + offsetY, 58 + 6, 8);

  g.fillStyle(0x4a148c, 1);
  g.fillRect(24, 44 + offsetY, 80, 12);

  // 4. Detaljer & Paneler (Mörka skrovlinjer)
  g.fillStyle(0x212121, 1);
  g.fillRect(28, 34 + offsetY, 72, 3);

  // Ljusande neondioder på tefatet
  g.fillStyle(0x00e5ff, 1);
  g.fillRect(36, 48 + offsetY, 6, 4);
  g.fillRect(53, 48 + offsetY, 6, 4);
  g.fillRect(70, 48 + offsetY, 6, 4);
  g.fillRect(86, 48 + offsetY, 6, 4);

  // 5. Cockpit-kupol (Glas)
  g.fillStyle(0x00e5ff, 0.7);
  g.fillRect(48, 6, 32, 22);
  g.fillRect(52, 0, 24, 6);

  // Reflektion i glaset
  g.fillStyle(0xffffff, 0.9);
  g.fillRect(52, 8, 6, 6);

  // 7. Undre Motor / Glöd
  g.fillStyle(0x00ff66, 0.9);
  g.fillRect(46, 56 + offsetY, 36, 6);
  g.fillStyle(0xffff00, 1);
  g.fillRect(50, 58 + offsetY, 28, 4);

  // Generera texturen
  g.generateTexture(key, width, height);
  g.destroy();

  // Sätt skarpa pixlar utan oskärpa för 8-bitarskänsla
  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.NEAREST);
  }
}

export function createRocketTexture2(scene: Phaser.Scene, key: string = "rocket_tile"): void {
  const width = 64;
  const height = 128;

  const g = scene.make.graphics({ x: 0, y: 0 });

  // 1. Thruster Nozzle (botten)
  g.fillStyle(0x333333, 1);
  g.fillRect(24, 108, 16, 16);
  g.lineStyle(2, 0x111111, 1);
  g.strokeRect(24, 108, 16, 16);

  // Thruster glöd (orange innerdel)
  g.fillStyle(0xff6600, 0.9);
  g.fillRect(28, 116, 8, 10);

  // 2. Vänster och höger fenor (bottom fins)
  // Vänster fena
  g.fillStyle(0xd32f2f, 1);
  g.beginPath();
  g.moveTo(20, 80);
  g.lineTo(4, 116);
  g.lineTo(20, 116);
  g.closePath();
  g.fillPath();
  g.lineStyle(2, 0x800000, 1);
  g.strokePath();

  // Höger fena
  g.fillStyle(0xd32f2f, 1);
  g.beginPath();
  g.moveTo(44, 80);
  g.lineTo(60, 116);
  g.lineTo(44, 116);
  g.closePath();
  g.fillPath();
  g.lineStyle(2, 0x800000, 1);
  g.strokePath();

  // 3. Raketkropp (skrov) - Silvrig/Vit cylinder
  g.fillStyle(0xe0e0e0, 1);
  g.fillRect(18, 36, 28, 74);

  // Highlights / skuggning på kroppen för 3D-känsla
  g.fillStyle(0xffffff, 0.6);
  g.fillRect(20, 36, 6, 74); // Ljus highlight
  g.fillStyle(0x9e9e9e, 0.4);
  g.fillRect(40, 36, 6, 74); // Skugga

  // Röd rand på raketkroppen
  g.fillStyle(0xd32f2f, 1);
  g.fillRect(18, 68, 28, 10);

  // Skrovlinje
  g.lineStyle(2, 0x212121, 1);
  g.strokeRect(18, 36, 28, 74);

  // 4. Noskon (Top nose cone)
  g.fillStyle(0xd32f2f, 1);
  g.beginPath();
  g.moveTo(32, 4);
  g.lineTo(18, 36);
  g.lineTo(46, 36);
  g.closePath();
  g.fillPath();
  g.lineStyle(2, 0x800000, 1);
  g.strokePath();

  // Highlight på noskon
  g.fillStyle(0xff8a80, 0.5);
  g.beginPath();
  g.moveTo(32, 8);
  g.lineTo(22, 34);
  g.lineTo(32, 34);
  g.closePath();
  g.fillPath();

  // 5. Fönster / Porthole
  // Yttre ram
  g.fillStyle(0x424242, 1);
  g.fillCircle(32, 52, 10);
  g.lineStyle(2, 0x111111, 1);
  g.strokeCircle(32, 52, 10);

  // Glaset (cyan glow)
  g.fillStyle(0x00e5ff, 1);
  g.fillCircle(32, 52, 7);

  // Reflektion i glaset
  g.fillStyle(0xffffff, 0.8);
  g.fillCircle(30, 50, 3);

  g.generateTexture(key, width, height);
  g.destroy();

  if (scene.textures.exists(key)) {
    scene.textures.get(key).setFilter(Phaser.Textures.FilterMode.LINEAR);
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\scenes\DebugScene.ts
==================================================

import Phaser from "phaser";
import { createPlayerTexture, createPlayerHatTexture } from "player";
import { createRocketTexture, createRocketTexture2 } from "../game/rocket/rocketHelpers";

export class DebugScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;

    constructor() {
        super({ key: "DebugScene" });
    }

    preload(): void {
        createPlayerTexture(this, "player_tile", 0x00ff00);
        createPlayerHatTexture(this, "player_hat", 0xff0000);
        createRocketTexture(this, "ufo_starcruiser");
        createRocketTexture2(this, "classic_rocket");
    }

    create(): void {
        // Stäng av global gravitation för tomrum
        this.matter.world.setGravity(0, 0);

        // Aktivera Matter.js debug-rendering för kollisionskroppar
        this.enableMatterDebug();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Bakgrundsnät
        const gridGraphics = this.add.graphics();
        gridGraphics.lineStyle(1, 0x333355, 0.5);
        const gridSize = 32;
        for (let x = -2000; x < 4000; x += gridSize) {
            gridGraphics.lineBetween(x, -2000, x, 4000);
        }
        for (let y = -2000; y < 4000; y += gridSize) {
            gridGraphics.lineBetween(-2000, y, 4000, y);
        }

        // UI Info-text
        const uiText = this.add.text(20, 20, "DEBUG SCENE - Matter.js Colliders & Visuals", {
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#00ff00",
            backgroundColor: "#000000aa",
            padding: { x: 10, y: 5 },
        });
        uiText.setScrollFactor(0);

        // -------------------------------------------------------------
        // 1. SPELAREN (Sprite, Collider, Hatt & Ögon)
        // -------------------------------------------------------------
        const playerX = centerX - 200;
        const playerY = centerY;
        const playerWidth = 12;
        const playerHeight = 16;

        // A. Matter Body & Sprite
        const playerBody = this.matter.bodies.rectangle(playerX, playerY, playerWidth, playerHeight, {
            friction: 0,
            restitution: 0,
            chamfer: { radius: 2 },
        });

        const playerSprite = this.matter.add.sprite(playerX, playerY, "player_tile");
        playerSprite.setExistingBody(playerBody);
        playerSprite.setDisplaySize(playerWidth, playerHeight);
        playerSprite.setFixedRotation();
        playerSprite.setDepth(10);

        // B. Hatt (Samma positionering som i Player.ts)
        const hatScale = 0.25;
        const headOffset = playerHeight / 2 + 2;

        const playerHat = this.add.sprite(playerX, playerY - headOffset, "player_hat");
        playerHat.setScale(hatScale);
        playerHat.setOrigin(0.5, 1);
        playerHat.setDepth(12);

        // C. Ögon (Exakt samma grafik och skalning som i Player.ts)
        const eyeScale = 0.25;
        const eyes = this.add.graphics();
        eyes.setPosition(playerX, playerY - 2);
        eyes.setScale(eyeScale);
        eyes.setDepth(13);

        // Ögonvitor
        eyes.fillStyle(0xffffff, 1);
        eyes.fillRect(-16, -16, 12, 16);
        eyes.fillRect(4, -16, 12, 16);

        // Pupiller (tittar åt höger)
        const pupilOffsetX = 4;
        const pupilOffsetY = 0;
        eyes.fillStyle(0x000000, 1);
        eyes.fillRect(-12 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);
        eyes.fillRect(8 + pupilOffsetX, -12 + pupilOffsetY, 8, 8);

        this.add
            .text(playerX, playerY + 30, "Player Collider (12x16)", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // -------------------------------------------------------------
        // 2. UFO / RYMDFARKOST (Sprite & Collider)
        // -------------------------------------------------------------
        const ufoX = centerX;
        const ufoY = centerY;
        const ufoWidth = 128;
        const ufoHeight = 72;

        const ufoBody = this.matter.bodies.rectangle(ufoX, ufoY, ufoWidth, ufoHeight, {
            friction: 0.8,
            density: 0.05,
        });

        const ufoSprite = this.matter.add.sprite(ufoX, ufoY, "ufo_starcruiser");
        ufoSprite.setExistingBody(ufoBody);
        ufoSprite.setDisplaySize(ufoWidth, ufoHeight);
        ufoSprite.setFixedRotation();
        ufoSprite.setDepth(10);

        this.add
            .text(ufoX, ufoY + 65, "UFO Collider (128x92)", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // -------------------------------------------------------------
        // 3. KLASSISK RAKET (Sprite & Collider)
        // -------------------------------------------------------------
        const rocketX = centerX + 200;
        const rocketY = centerY;
        const rocketWidth = 64;
        const rocketHeight = 128;

        const rocketBody = this.matter.bodies.rectangle(rocketX, rocketY, rocketWidth, rocketHeight, {
            friction: 0.8,
            density: 0.05,
        });

        const rocketSprite = this.matter.add.sprite(rocketX, rocketY, "classic_rocket");
        rocketSprite.setExistingBody(rocketBody);
        rocketSprite.setDisplaySize(rocketWidth, rocketHeight);
        rocketSprite.setFixedRotation();
        rocketSprite.setDepth(10);

        this.add
            .text(rocketX, rocketY + 80, "Rocket Collider (64x128)", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#ffffff",
            })
            .setOrigin(0.5);

        // Tangentbordskontroller
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        // Musnavigering (Dra & Zoom)
        this.setupMouseNavigation();
    }

    private enableMatterDebug(): void {
        this.matter.world.drawDebug = true;

        if (this.matter.world.debugGraphic) {
            // Sätt debug-lagret under hatten/ögonen så att de inte skyms
            this.matter.world.debugGraphic.setDepth(11);
        }

        const debugConfig = this.matter.world.debugConfig as unknown as {
            showBody: boolean;
            showStaticBody: boolean;
            showVelocity: boolean;
            fillColor?: number;
            fillOpacity?: number;
            lineColor?: number;
            lineOpacity?: number;
        };

        debugConfig.showBody = true;
        debugConfig.showStaticBody = true;
        debugConfig.showVelocity = true;

        // Färgkonfiguration för collider-konturer
        debugConfig.fillColor = 0x00ff00;
        debugConfig.fillOpacity = 0.2; // Låg opacitet så grafiken syns igenom
        debugConfig.lineColor = 0xffff00;
        debugConfig.lineOpacity = 0.8;
    }

    private setupMouseNavigation(): void {
        const camera = this.cameras.main;
        this.cameras.main.setZoom(2.5);

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            this.isDragging = true;
            this.dragStartX = pointer.x;
            this.dragStartY = pointer.y;
        });

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (!this.isDragging) return;

            const dx = (pointer.x - this.dragStartX) / camera.zoom;
            const dy = (pointer.y - this.dragStartY) / camera.zoom;

            camera.scrollX -= dx;
            camera.scrollY -= dy;

            this.dragStartX = pointer.x;
            this.dragStartY = pointer.y;
        });

        this.input.on("pointerup", () => {
            this.isDragging = false;
        });

        this.input.on(
            "wheel",
            (_pointer: Phaser.Input.Pointer, _gameObjects: Phaser.GameObjects.GameObject[], _deltaX: number, deltaY: number) => {
                const zoomFactor = 0.1;
                const newZoom = deltaY > 0 ? camera.zoom - zoomFactor : camera.zoom + zoomFactor;
                const clampedZoom = Phaser.Math.Clamp(newZoom, 0.2, 5.0);
                camera.setZoom(clampedZoom);
            },
        );
    }

    override update(): void {
        const speed = 5 / this.cameras.main.zoom;

        if (this.cursors) {
            if (this.cursors.left.isDown) this.cameras.main.scrollX -= speed;
            if (this.cursors.right.isDown) this.cameras.main.scrollX += speed;
            if (this.cursors.up.isDown) this.cameras.main.scrollY -= speed;
            if (this.cursors.down.isDown) this.cameras.main.scrollY += speed;
        }
    }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\scenes\index.ts
==================================================

export * from "./MainScene";
export * from "./DebugScene";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\scenes\MainScene.ts
==================================================

import Phaser from "phaser";
import { Planet, DEFAULT_PLANET_CONFIG } from "planet";
import { Player } from "player";
import { Rocket } from "../game/rocket";
import { CameraController } from "camera";
import { MiningManager, HighlightManager, BuildingManager, CombatManager } from "managers";
//import { VirtualJoystick } from "phaser-virtual-joystick";
import { Starfield } from "../game/background/Starfield";
import { HouseManager } from "house";

import { Header, MobileControls, VirtualJoystick } from "ui";
import { useGameStore } from "store";

export class MainScene extends Phaser.Scene {
  private planet!: Planet;
  private player!: Player;
  private rocket!: Rocket;
  private starfield!: Starfield;
  private cameraController!: CameraController;
  private combatManager!: CombatManager;
  private highlightManager!: HighlightManager;
  private miningManager!: MiningManager;
  private buildingManager!: BuildingManager;
  public houseManager!: HouseManager;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  mobileControls!: MobileControls;
  virtualJoystick!: VirtualJoystick;
  header!: Header;

  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    this.planet = new Planet(this, {
      ...DEFAULT_PLANET_CONFIG,
      planetType: "EARTH", // Try "ICE", "DESERT", or "EARTH"
    });
    this.planet.createTextures();
  }

  create(): void {
    // Stäng av den globala gravitationen i Matter-världen
    this.matter.world.setGravity(0, 0);

    //
    this.planet.generate();

    this.starfield = new Starfield(this, this.planet, 350);

    this.player = new Player(this, this.planet);
    this.player.spawn();

    this.rocket = new Rocket(this, this.planet);
    this.rocket.spawn();

    this.cameraController = new CameraController(this, this.planet, this.player);
    this.cameraController.follow(this.player.sprite);

    this.rocket.setPlayerAndCamera(this.player, this.cameraController);

    // Initiera Highlight Manager först och skicka med den till Mining och Building

    this.houseManager = new HouseManager(this, this.planet, this.player);
    this.combatManager = new CombatManager(this, this.player);

    this.highlightManager = new HighlightManager(this, this.planet, this.player);
    this.miningManager = new MiningManager(this, this.planet, this.player, this.highlightManager);
    this.buildingManager = new BuildingManager(this, this.planet, this.player, this.highlightManager, this.houseManager);

    // Keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    // UI
    this.virtualJoystick = document.createElement("virtual-joystick") as VirtualJoystick;
    document.body.appendChild(this.virtualJoystick);

    this.mobileControls = document.createElement("controls-ui") as MobileControls;
    document.body.prepend(this.mobileControls);
    this.header = document.createElement("header-ui") as Header;
    document.body.prepend(this.header);

    // Event-lyssnare
    this.events.on("planet-cleared", () => {
      alert("Hela planeten är utgrävd förutom kärnan!");

      // Starta nästa bana, ge poäng eller visa en Vinst-UI
    });

    //
    this.createDebug();

    console.log("MainScene.create()", this);
  }

  override update(): void {
    if (!this.player || !this.highlightManager || !this.miningManager || !this.buildingManager) return;

    this.starfield?.update();

    this.player.update(this.cursors, this.mobileControls?.state, this.virtualJoystick.state);
    this.rocket?.update(this.cursors, this.mobileControls?.state, this.virtualJoystick?.state);
    this.cameraController.update();

    // Uppdatera markören samt båda managers med mobiltillståndet
    this.highlightManager.update();

    if (this.mobileControls?.state.primaryAction) {
      const currentTool = useGameStore.getState().currentTool;
      if (currentTool?.type === "sword") {
        this.combatManager.attack();
      } else {
        this.miningManager.mineInFront();
      }
    }

    this.buildingManager.update(this.mobileControls.state);
    this.houseManager.update();
  }

  private createDebug() {
    this.matter.world.drawDebug = true;
    if (this.matter.world.debugGraphic) {
      this.matter.world.debugGraphic.setDepth(999);
    }

    //this.matter.world.debugGraphic.clear();
    const debugConfig = this.matter.world.debugConfig as unknown as {
      showBody: boolean;
      showStaticBody: boolean;
      showVelocity: boolean;
      fillColor?: number;
      fillOpacity?: number;
      lineColor?: number;
      lineOpacity?: number;
    };

    debugConfig.showBody = true;
    debugConfig.showStaticBody = true;
    debugConfig.showVelocity = true;

    // Sätt tydliga färger och opacitet för spelaren
    debugConfig.fillColor = 0x00ff00; // Grön fyllning
    debugConfig.fillOpacity = 0.5; // Halvgenomskinlig
    debugConfig.lineColor = 0xffff00; // Gul linje runt spelaren
    debugConfig.lineOpacity = 1.0;
  }
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\store\gameStoreHelpers.ts
==================================================

// src/store/gameStoreHelpers.ts

import { ALL_TOOLS } from "./gameStoreTypes";
import type { ResourceType, ToolType, Tool } from "types";
import { RESOURCE_INFO } from "ui";

const MAX_STACK_SIZE = 64;

export function findToolByName(toolName: string | null): Tool | null {
    if (!toolName) return null;
    return ALL_TOOLS[toolName as ToolType] || null;
}

export function calculateTotalItems(inventory: Record<string, number>): number {
    let usedSlots = 0;

    Object.keys(inventory).forEach((key) => {
        const count = inventory[key];
        if (count <= 0) return;

        const info = RESOURCE_INFO[key];

        // Verktyg och rustning tar alltid 1 hel slot per föremål
        if (info && (info.isTool || info.isArmor)) {
            usedSlots += count;
        } else {
            // Vanliga resurser stakar sig upp till MAX_STACK_SIZE
            usedSlots += Math.ceil(count / MAX_STACK_SIZE);
        }
    });

    return usedSlots;
}

export function updateHotbarWithResource(
    currentHotbar: (string | null)[],
    resourceType: ResourceType,
): { newHotbar: (string | null)[]; updated: boolean } {
    const newHotbar = [...currentHotbar];

    const info = RESOURCE_INFO[resourceType];
    if (info && (info.isTool || info.isArmor)) {
        return { newHotbar, updated: false };
    }

    if (!newHotbar.includes(resourceType)) {
        const emptyIndex = newHotbar.indexOf(null);
        if (emptyIndex !== -1) {
            newHotbar[emptyIndex] = resourceType;
            return { newHotbar, updated: true };
        }
    }

    return { newHotbar, updated: false };
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\store\gameStoreTypes.ts
==================================================

import type { ToolType, Tool, ArmorItem, EquipmentSlot } from "types";

export const MAX_INVENTORY_SLOTS = 20;

export const ALL_TOOLS: Record<ToolType, Tool> = {
    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", power: 0.1, damage: 0.1, price: 0, type: "pickaxe", speed: 200 },
    "Iron Pickaxe": { name: "Iron Pickaxe", power: 1, damage: 1, price: 10, type: "pickaxe", speed: 150 },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", power: 10, damage: 10, price: 100, type: "pickaxe", speed: 50 },

    // Axes
    "Wood Axe": { name: "Wood Axe", power: 0.1, damage: 0.1, price: 0, type: "axe", speed: 200 },
    "Iron Axe": { name: "Iron Axe", power: 1, damage: 1, price: 10, type: "axe", speed: 150 },
    "Diamond Axe": { name: "Diamond Axe", power: 10, damage: 10, price: 100, type: "axe", speed: 50 },

    // Spades
    "Wood Shovel": { name: "Wood Shovel", power: 0.1, damage: 0.1, price: 0, type: "shovel", speed: 200 },
    "Iron Shovel": { name: "Iron Shovel", power: 1, damage: 1, price: 10, type: "shovel", speed: 150 },
    "Diamond Shovel": { name: "Diamond Shovel", power: 10, damage: 10, price: 100, type: "shovel", speed: 50 },

    // Swords
    "Wood Sword": { name: "Wood Sword", power: 0.1, damage: 0.1, price: 0, type: "sword", speed: 200 },
    "Iron Sword": { name: "Iron Sword", power: 1, damage: 1, price: 10, type: "sword", speed: 150 },
    "Diamond Sword": { name: "Diamond Sword", power: 10, damage: 10, price: 100, type: "sword", speed: 50 },
};

// Register över alla rustningsföremål
export const ALL_ARMOR: Record<string, ArmorItem> = {
    "Iron Helmet": { name: "Iron Helmet", slot: "helmet", armor: 5, color: 0xc0c0c0 },
    "Leather Clothes": { name: "Leather Clothes", slot: "armor", armor: 3, color: 0x8b5a2b },
    "Iron Clothes": { name: "Iron Clothes", slot: "armor", armor: 8, color: 0xc0c0c0 },
    "Speed Boots": { name: "Speed Boots", slot: "boots", armor: 2, speedBonus: 1.5, color: 0x00ffff },
};

export interface GameState {
    hp: number;
    maxHp: number;
    takeDamage: (amount: number) => void;
    heal: (amount: number) => void;

    inventory: Record<string, number>;
    maxSlots: number;
    currentTool: Tool | null;
    equipTool: (toolName: string | null) => void;

    // Nya fält för utrustning
    equipment: Record<EquipmentSlot, ArmorItem | null>;
    equipArmor: (slot: EquipmentSlot, item: ArmorItem | null) => void;

    hotbar: (string | null)[];
    selectedHotbarIndex: number;
    selectedResource: string | null;
    isInventoryOpen: boolean;

    getTotalItems: () => number;
    canPickUp: () => boolean;
    mineBlock: (type: any, amount: number) => boolean;
    craftTool: (type: ToolType) => void;
    setSelectedResource: (resource: string | null) => void;
    setSelectedHotbarIndex: (index: number) => void;
    setHotbarSlot: (index: number, resource: string | null) => void;
    toggleInventory: () => void;
    addResource: (type: any, amount: number) => boolean;
    removeResource: (type: any, amount: number) => void;
    craftItem: (itemKey: string) => boolean;
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\store\index.ts
==================================================

export * from "./useGameStore";
export * from "./gameStoreTypes";
export * from "./gameStoreHelpers";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\store\useGameStore.ts
==================================================

// src/store/useGameStore.ts

import { create } from "zustand";
import { ALL_TOOLS, ALL_ARMOR, MAX_INVENTORY_SLOTS, type GameState } from "./gameStoreTypes";
import { findToolByName, calculateTotalItems, updateHotbarWithResource } from "./gameStoreHelpers";
import { RESOURCE_INFO } from "ui";

export { ALL_TOOLS, ALL_ARMOR, MAX_INVENTORY_SLOTS };

export const useGameStore = create<GameState>((set, get) => ({
    hp: 100,
    maxHp: 100,
    takeDamage: (amount) =>
        set((state) => {
            const totalArmor = Object.values(state.equipment).reduce((acc, item) => acc + (item ? item.armor : 0), 0);
            const damageAfterArmor = Math.max(1, amount - totalArmor);
            return { hp: Math.max(0, state.hp - damageAfterArmor) };
        }),
    heal: (amount) => set((state) => ({ hp: Math.min(state.maxHp, state.hp + amount) })),

    inventory: {
        "Iron Sword": 1,
        // Startverktyg
        "Wood Pickaxe": 1,
        "Iron Pickaxe": 1,
        "Diamond Pickaxe": 1,
        "Wood Axe": 1,
        "Iron Axe": 1,
        "Wood Shovel": 1,

        // Rustning
        "Iron Helmet": 1,
        "Leather Clothes": 1,
        "Speed Boots": 1,
        wood: 0,
        dirt: 0,
        stone: 0,
        coal: 0,
        iron_ore: 0,
        iron_ingot: 0,
        copper_ore: 0,
        copper: 0,
        copper_ingot: 0,
        silver_ore: 0,
        silver: 0,
        silver_ingot: 0,
        gold_ore: 0,
        diamond: 0,
        core: 0,
    },
    maxSlots: MAX_INVENTORY_SLOTS,
    currentTool: ALL_TOOLS["Iron Sword"],

    equipment: {
        helmet: null,
        armor: null,
        boots: null,
    },

    equipArmor: (slot, item) =>
        set((state) => ({
            equipment: {
                ...state.equipment,
                [slot]: item,
            },
        })),

    equipTool: (toolName) => {
        const tool = findToolByName(toolName);
        if (toolName === null || (tool && (get().inventory[toolName] || 0) > 0)) {
            set({ currentTool: tool });
        }
    },

    hotbar: [null, null, null, null],
    selectedHotbarIndex: 0,
    selectedResource: null,
    isInventoryOpen: false,

    getTotalItems: () => calculateTotalItems(get().inventory),

    canPickUp: () => get().getTotalItems() < get().maxSlots,

    mineBlock: (type, amount) => {
        const state = get();
        if (state.getTotalItems() + amount > state.maxSlots) return false;

        const newInventory = {
            ...state.inventory,
            [type]: (state.inventory[type] || 0) + amount,
        };

        const { newHotbar, updated } = updateHotbarWithResource(state.hotbar, type);

        set({
            inventory: newInventory,
            hotbar: updated ? newHotbar : state.hotbar,
            selectedResource: newHotbar[state.selectedHotbarIndex],
        });

        return true;
    },

    craftTool: (type) =>
        set((state) => {
            const tool = ALL_TOOLS[type];
            if (!tool) return {};

            const currentAmount = state.inventory[type] || 0;
            const newInventory = {
                ...state.inventory,
                [type]: currentAmount + 1,
            };

            return {
                inventory: newInventory,
                currentTool: tool,
            };
        }),

    craftItem: (itemKey: string) => {
        const info = RESOURCE_INFO[itemKey];
        if (!info || !info.isCraftable || !info.recipe) return false;

        const state = get();
        const inventory = state.inventory;

        // Kontrollera om spelaren har tillräckligt av alla ingredienser
        const hasIngredients = Object.entries(info.recipe).every(
            ([ingredient, neededAmount]) => (inventory[ingredient] || 0) >= neededAmount,
        );

        if (!hasIngredients || !state.canPickUp()) return false;

        // Dra av ingredienserna från inventory
        const newInventory = { ...inventory };
        Object.entries(info.recipe).forEach(([ingredient, neededAmount]) => {
            newInventory[ingredient] -= neededAmount;
        });

        // Lägg till den tillverkade enheten (t.ex. 1 ingot eller 1 chest)
        newInventory[itemKey] = (newInventory[itemKey] || 0) + 1;

        set({ inventory: newInventory });
        return true;
    },

    setSelectedResource: (resource) => set({ selectedResource: resource }),

    setSelectedHotbarIndex: (index) => {
        const state = get();
        set({
            selectedHotbarIndex: index,
            selectedResource: state.hotbar[index],
        });
    },

    setHotbarSlot: (index, resource) => {
        if (resource) {
            const info = RESOURCE_INFO[resource];
            if (info && (info.isTool || info.isArmor)) {
                return;
            }
        }

        const state = get();
        const newHotbar = [...state.hotbar];

        // Om resursen redan finns i hotbaren, rensa den tidigare sloten (flytta istället för duplicera)
        if (resource) {
            const existingIndex = newHotbar.indexOf(resource);
            if (existingIndex !== -1 && existingIndex !== index) {
                newHotbar[existingIndex] = null;
            }
        }

        newHotbar[index] = resource;
        set({
            hotbar: newHotbar,
            selectedResource: newHotbar[state.selectedHotbarIndex],
        });
    },

    toggleInventory: () => set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),

    addResource: (type, amount) => get().mineBlock(type, amount),

    removeResource: (type, amount) =>
        set((state) => {
            const newAmount = Math.max(0, (state.inventory[type] || 0) - amount);
            const newInventory = { ...state.inventory, [type]: newAmount };
            const newHotbar = [...state.hotbar];

            if (newAmount === 0) {
                const index = newHotbar.indexOf(type);
                if (index !== -1) newHotbar[index] = null;
            }

            return {
                inventory: newInventory,
                hotbar: newHotbar,
                selectedResource: newHotbar[state.selectedHotbarIndex],
            };
        }),
}));


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\types\GameTypes.ts
==================================================

// Item & Resource Types
export type ResourceType =
    | "dirt"
    | "stone"
    | "coal"
    | "copper_ore"
    | "copper"
    | "copper_ingot"
    | "silver_ore"
    | "silver"
    | "silver_ingot"
    | "iron_ore"
    | "iron_ingot"
    | "gold_ore"
    | "gold_ingot"
    | "diamond"
    | "wood"
    | "sand"
    | "core"
    | "chest"
    | "bed"
    | "torch";

// Planet & Block Types
export const BlockType = {
    AIR: -1,
    DIRT: 0,
    STONE: 1,
    COAL: 2,
    IRON_ORE: 3,
    COPPER_ORE: 4,
    SILVER_ORE: 5,
    GOLD_ORE: 6,
    DIAMOND: 7,
    WOOD: 8,
    LEAVES: 9,
    SAND: 10,
    CHEST: 11,
    BED: 12,
    TORCH: 13,
    CORE: 99,
} as const;

export type BlockType = (typeof BlockType)[keyof typeof BlockType];

export type ToolType =
    | "Wood Pickaxe"
    | "Iron Pickaxe"
    | "Diamond Pickaxe"
    | "Wood Axe"
    | "Iron Axe"
    | "Diamond Axe"
    | "Wood Shovel"
    | "Iron Shovel"
    | "Diamond Shovel"
    | "Wood Sword"
    | "Iron Sword"
    | "Diamond Sword";

export interface Tool {
    name: string;
    power: number;
    damage: number;
    price: number;
    type: "pickaxe" | "axe" | "shovel" | "sword";
    speed?: number; // Hastighetsmultiplikator eller cooldown i ms
}

export type EquipmentSlot = "helmet" | "armor" | "boots";

export interface ArmorItem {
    name: string;
    slot: EquipmentSlot;
    armor: number; // Ger skydd / minskar skada
    speedBonus?: number; // T.ex. skor som gör att man springer snabbare
    color: number; // Färg som ritas på spelaren
}

// Krav på verktygstyp för respektive block
export const REQUIRED_TOOL_TYPE: Record<BlockType, "pickaxe" | "axe" | "shovel" | "none"> = {
    [BlockType.AIR]: "none",
    [BlockType.DIRT]: "none",
    [BlockType.LEAVES]: "none",
    [BlockType.SAND]: "shovel",
    [BlockType.WOOD]: "axe",
    [BlockType.STONE]: "pickaxe",
    [BlockType.COAL]: "pickaxe",
    [BlockType.IRON_ORE]: "pickaxe",
    [BlockType.COPPER_ORE]: "pickaxe",
    [BlockType.SILVER_ORE]: "pickaxe",
    [BlockType.GOLD_ORE]: "pickaxe",
    [BlockType.DIAMOND]: "pickaxe",
    [BlockType.CHEST]: "none",
    [BlockType.BED]: "none",
    [BlockType.TORCH]: "none",
    [BlockType.CORE]: "none",
};

// Minsta verktygsstyrka (power) som krävs för respektive block
export const REQUIRED_TOOL_POWER: Record<BlockType, number> = {
    [BlockType.AIR]: 0,
    [BlockType.DIRT]: 0,
    [BlockType.LEAVES]: 0,
    [BlockType.SAND]: 0.1,
    [BlockType.WOOD]: 0.1,
    [BlockType.STONE]: 0.1,
    [BlockType.COAL]: 0.1,
    [BlockType.IRON_ORE]: 1,
    [BlockType.COPPER_ORE]: 1,
    [BlockType.SILVER_ORE]: 1,
    [BlockType.GOLD_ORE]: 5,
    [BlockType.DIAMOND]: 10,
    [BlockType.CHEST]: 0.1,
    [BlockType.BED]: 0,
    [BlockType.TORCH]: 0,
    [BlockType.CORE]: 999,
};

export interface BlockData {
    x: number;
    y: number;
    type: BlockType;
    hp: number;
    maxHp: number;
    body: Phaser.GameObjects.Image | Phaser.Physics.Matter.Image;
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\types\index.ts
==================================================

export * from "./GameTypes";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\Header.ts
==================================================

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


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\HealthBar.ts
==================================================

import { useGameStore } from "store";

export class HealthBar extends HTMLElement {
    private barFill!: HTMLDivElement;
    private textElement!: HTMLSpanElement;

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("flex", "items-center", "min-w-[340px]", "max-w-[340px]");
        Object.assign(this.style, {
            userSelect: "none",
            pointerEvents: "auto",
        });
    }

    private createDomElements(): void {
        const container = document.createElement("div");
        Object.assign(container.style, {
            width: "100%",
            height: "24px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "2px solid #555555",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });

        // Den röda fyllningen för HP
        this.barFill = document.createElement("div");
        Object.assign(this.barFill.style, {
            position: "absolute",
            left: "0px",
            top: "0px",
            height: "100%",
            width: "100%",
            backgroundColor: "#ff3333",
            transition: "width 0.2s ease-in-out",
        });

        // Textindikator för HP (t.ex. 100 / 100)
        this.textElement = document.createElement("span");
        Object.assign(this.textElement.style, {
            position: "relative",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#ffffff",
            //textShadow: "1px 1px 2px #000000",
        });

        container.appendChild(this.barFill);
        container.appendChild(this.textElement);
        this.appendChild(container);

        this.updateUI();
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();
        const percentage = Math.max(0, Math.min(100, (state.hp / state.maxHp) * 100));

        this.barFill.style.width = percentage + "%";
        this.textElement.innerText = state.hp + " / " + state.maxHp;
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("health-bar-ui")) {
    customElements.define("health-bar-ui", HealthBar);
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\Hotbar.ts
==================================================

import { useGameStore } from "store";
import { RESOURCE_COLORS } from "ui";

export class Hotbar extends HTMLElement {
    private buttons: HTMLButtonElement[] = [];

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("relative", "flex", "gap-2", "w-fit");
        Object.assign(this.style, { userSelect: "none" });
    }

    private createDomElements(): void {
        this.innerHTML = "";
        this.buttons = [];

        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");

            Object.assign(button.style, {
                width: "48px",
                height: "48px",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                color: "#ffffff",
                outline: "none",
                transition: "all 0.1s ease",
                border: "2px solid #444444",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                pointerEvents: "auto",
            });

            const keyBadge = document.createElement("span");
            keyBadge.innerText = String(i + 1);
            Object.assign(keyBadge.style, {
                position: "absolute",
                top: "3px",
                left: "5px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#aaaaaa",
            });

            button.appendChild(keyBadge);

            const index = i;
            button.addEventListener("click", (event: MouseEvent) => {
                event.stopPropagation();
                useGameStore.getState().setSelectedHotbarIndex(index);
            });

            this.buttons.push(button);
            this.appendChild(button);
        }

        this.updateUI();
    }

    private setupEvents(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.code.startsWith("Digit")) {
                const digitIndex = parseInt(event.code.replace("Digit", ""), 10) - 1;
                if (digitIndex >= 0 && digitIndex < 4) {
                    useGameStore.getState().setSelectedHotbarIndex(digitIndex);
                }
            }
        });
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();

        this.buttons.forEach((button, index) => {
            const resource = state.hotbar[index];
            const isSelected = state.selectedHotbarIndex === index;

            button.style.border = isSelected ? "3px solid #ffffff" : "2px solid #444444";
            button.style.backgroundColor = isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)";

            while (button.children.length > 1) {
                button.removeChild(button.lastChild!);
            }

            if (resource) {
                const colorPreview = document.createElement("div");
                Object.assign(colorPreview.style, {
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.4)",
                    backgroundColor: RESOURCE_COLORS[resource] || "#ffffff",
                });

                const countText = document.createElement("span");
                countText.innerText = String(state.inventory[resource] || 0);
                Object.assign(countText.style, {
                    position: "absolute",
                    bottom: "3px",
                    right: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                });

                button.appendChild(colorPreview);
                button.appendChild(countText);
            }
        });
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("hotbar-ui")) {
    customElements.define("hotbar-ui", Hotbar);
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\index.ts
==================================================

export * from "./Header";
export * from "./MobileControls";
export * from "./VirtualJoystick";
export * from "./InventoryModal";
export * from "./HealthBar";
export * from "./Hotbar";
export * from "./ToolSlot";
export * from "./UITypes";
export * from "./uiHelpers";


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\InventoryModal.ts
==================================================

// src/ui/InventoryModal.ts

import { useGameStore, ALL_TOOLS, ALL_ARMOR } from "store";
import type { ToolType, EquipmentSlot } from "types";
import { RESOURCE_INFO } from "ui";
import { getToolIcon } from "./uiHelpers";

interface DragPayload {
    source: "inventory" | "hotbar" | "equipment";
    resource: string;
    fromSlot?: EquipmentSlot;
    fromIndex?: number;
}

export class InventoryModal extends HTMLElement {
    private container!: HTMLDivElement;
    private draggedPayload: DragPayload | null = null;

    connectedCallback() {
        this.classList.add("fixed", "inset-0", "z-50", "hidden");

        // Stäng om man klickar på backdropen
        this.addEventListener("click", (e: MouseEvent) => {
            if (e.target === this) {
                e.stopPropagation();
                useGameStore.getState().toggleInventory();
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
            width: "fit-content",
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
        this.subscribeToStore();
        this.updateVisibility();
        this.render();
    }

    private updateVisibility(): void {
        const isInventoryOpen = useGameStore.getState().isInventoryOpen;
        if (isInventoryOpen) {
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
        if (this.classList.contains("hidden")) return;

        this.container.innerHTML = "";

        this.renderHeader();
        this.renderArmorSection(useGameStore.getState());
        this.renderInventoryGrid(useGameStore.getState());
        this.renderEquipmentSection(useGameStore.getState());
    }

    private renderHeader(): void {
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";

        const title = document.createElement("h2");
        title.innerText = "Inventory & Equipment";
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
            useGameStore.getState().toggleInventory();
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        this.container.appendChild(header);
    }

    private renderArmorSection(state: ReturnType<typeof useGameStore.getState>): void {
        const label = document.createElement("p");
        label.innerText = "Utrustning (Rustning):";
        label.style.fontSize = "12px";
        label.style.color = "#aaa";
        this.container.appendChild(label);

        const armorRow = document.createElement("div");
        Object.assign(armorRow.style, {
            width: "fit-content",
            display: "flex",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            gap: "8px",
        });

        const slots: { slot: EquipmentSlot; icon: string; name: string }[] = [
            { slot: "helmet", icon: "🪖", name: "Hjälm" },
            { slot: "armor", icon: "👕", name: "Kläder" },
            { slot: "boots", icon: "🥾", name: "Skor" },
        ];

        slots.forEach(({ slot, icon, name }) => {
            const item = state.equipment[slot];
            const slotEl = document.createElement("div");

            Object.assign(slotEl.style, {
                width: "48px",
                height: "48px",
                backgroundColor: "#1a1a1a",
                border: item ? "2px solid #00ffff" : "2px inset #333333",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: item ? "grab" : "default",
                boxSizing: "border-box",
            });

            if (item) {
                slotEl.draggable = true;

                const iconEl = document.createElement("span");
                iconEl.innerText = icon;
                iconEl.style.fontSize = "14px";
                iconEl.style.pointerEvents = "none";

                const nameEl = document.createElement("span");
                nameEl.innerText = item.name.split(" ")[0];
                nameEl.style.fontSize = "9px";
                nameEl.style.fontWeight = "bold";
                nameEl.style.color = "#00ffff";
                nameEl.style.pointerEvents = "none";

                const statEl = document.createElement("span");
                statEl.innerText = item.speedBonus ? "⚡" + item.speedBonus : "🛡️" + item.armor;
                statEl.style.fontSize = "9px";
                statEl.style.color = "#aaa";
                statEl.style.pointerEvents = "none";

                slotEl.appendChild(iconEl);
                slotEl.appendChild(nameEl);
                slotEl.appendChild(statEl);

                this.setupDragStart(slotEl, {
                    source: "equipment",
                    resource: item.name,
                    fromSlot: slot,
                });

                slotEl.addEventListener("click", () => {
                    const store = useGameStore.getState();
                    store.addResource(item.name, 1);
                    store.equipArmor(slot, null);
                });
            } else {
                const placeholder = document.createElement("span");
                placeholder.innerText = icon;
                placeholder.style.fontSize = "18px";
                placeholder.style.opacity = "0.25";
                placeholder.style.pointerEvents = "none";

                const labelEl = document.createElement("span");
                labelEl.innerText = name;
                labelEl.style.fontSize = "9px";
                labelEl.style.color = "#555";
                labelEl.style.pointerEvents = "none";

                slotEl.appendChild(placeholder);
                slotEl.appendChild(labelEl);
            }

            this.setupDropTarget(slotEl, (resource) => {
                if (resource && ALL_ARMOR[resource]) {
                    const armor = ALL_ARMOR[resource];
                    if (armor.slot === slot) {
                        const store = useGameStore.getState();
                        const currentEquipped = store.equipment[slot];

                        store.removeResource(resource, 1);
                        if (currentEquipped) {
                            store.addResource(currentEquipped.name, 1);
                        }
                        store.equipArmor(slot, armor);
                    }
                }
            });

            armorRow.appendChild(slotEl);
        });

        this.container.appendChild(armorRow);
    }

    private renderInventoryGrid(state: ReturnType<typeof useGameStore.getState>): void {
        const activeResources: { res: string; count: number }[] = [];

        Object.keys(state.inventory).forEach((key) => {
            const count = state.inventory[key];
            if (count <= 0 || !RESOURCE_INFO[key]) return;

            const info = RESOURCE_INFO[key];

            // 1. Om detta är ett verktyg och det är utrustat som nuvarande verktyg -> Dölj från inventoryt
            if (info && info.isTool) {
                if (state.currentTool?.name === key) {
                    return; // Lämnar platsen tom i inventory-gridet!
                }
                for (let i = 0; i < count; i++) {
                    activeResources.push({ res: key, count: 1 });
                }
            }
            // 2. Om detta är en rustning -> Lägg till i mönstret
            else if (info && info.isArmor) {
                for (let i = 0; i < count; i++) {
                    activeResources.push({ res: key, count: 1 });
                }
            }
            // 3. Vanliga byggblock/resurser -> Dölj om resursen ligger i Hotbaren
            else {
                if (state.hotbar.includes(key)) {
                    return; // Lämnar platsen tom i inventory-gridet!
                }
                activeResources.push({ res: key, count });
            }
        });

        const grid = document.createElement("div");
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            width: "fit-content",
        });

        for (let i = 0; i < state.maxSlots; i++) {
            const slotData = activeResources[i];
            const slot = this.createInventorySlot(slotData, state);
            grid.appendChild(slot);
        }

        this.container.appendChild(grid);
    }

    private createInventorySlot(
        slotData: { res: string; count: number } | undefined,
        state: ReturnType<typeof useGameStore.getState>,
    ): HTMLDivElement {
        const slot = document.createElement("div");
        Object.assign(slot.style, {
            width: "48px",
            height: "48px",
            backgroundColor: "#1a1a1a",
            border: "2px inset #333333",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
        });

        if (slotData) {
            slot.draggable = true;
            slot.style.cursor = "grab";

            const info = RESOURCE_INFO[slotData.res];

            if (info && info.isTool) {
                const isEquipped = state.currentTool?.name === slotData.res;
                const toolObj = ALL_TOOLS[slotData.res as ToolType];

                if (isEquipped) {
                    slot.style.borderColor = "#ffd700";
                }

                const name = document.createElement("span");
                name.innerText = slotData.res.split(" ")[0];
                name.style.fontSize = "10px";
                name.style.fontWeight = "bold";
                name.style.color = "#ffd700";
                name.style.pointerEvents = "none";

                const icon = document.createElement("span");
                icon.innerText = getToolIcon(toolObj);
                icon.style.fontSize = "14px";
                icon.style.pointerEvents = "none";

                slot.appendChild(icon);
                slot.appendChild(name);
            } else if (info && info.isArmor) {
                const armorObj = ALL_ARMOR[slotData.res];

                const name = document.createElement("span");
                name.innerText = slotData.res.split(" ")[0];
                name.style.fontSize = "10px";
                name.style.fontWeight = "bold";
                name.style.color = "#00ffff";
                name.style.pointerEvents = "none";

                const icon = document.createElement("span");
                icon.innerText = armorObj?.slot === "helmet" ? "🪖" : armorObj?.slot === "armor" ? "👕" : "🥾";
                icon.style.fontSize = "14px";
                icon.style.pointerEvents = "none";

                slot.appendChild(icon);
                slot.appendChild(name);
            } else if (info && info.color) {
                const colorBox = document.createElement("div");
                Object.assign(colorBox.style, {
                    width: "32px",
                    height: "32px",
                    backgroundColor: info.color,
                    borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.5)",
                    pointerEvents: "none",
                });

                const countBadge = document.createElement("span");
                countBadge.innerText = String(slotData.count);
                Object.assign(countBadge.style, {
                    position: "absolute",
                    bottom: "2px",
                    right: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    textShadow: "1px 1px 2px #000",
                    pointerEvents: "none",
                });

                slot.appendChild(colorBox);
                slot.appendChild(countBadge);
            }

            this.setupDragStart(slot, {
                source: "inventory",
                resource: slotData.res,
            });

            slot.addEventListener("click", () => {
                const store = useGameStore.getState();

                if (info && info.isTool) {
                    // Om verktyget redan är utrustat -> ta av det, annars utrusta det
                    if (store.currentTool?.name === slotData.res) {
                        store.equipTool(null);
                    } else {
                        store.equipTool(slotData.res);
                    }
                } else if (info && info.isArmor) {
                    const armor = ALL_ARMOR[slotData.res];
                    if (armor) {
                        const currentlyEquipped = store.equipment[armor.slot];

                        store.removeResource(slotData.res, 1);
                        if (currentlyEquipped) {
                            store.addResource(currentlyEquipped.name, 1);
                        }

                        store.equipArmor(armor.slot, armor);
                    }
                } else {
                    const currentHotbar = store.hotbar;

                    const existingIndex = currentHotbar.indexOf(slotData.res);
                    if (existingIndex !== -1) {
                        store.setSelectedHotbarIndex(existingIndex);
                    } else {
                        const emptyIdx = currentHotbar.indexOf(null);
                        if (emptyIdx !== -1) {
                            store.setHotbarSlot(emptyIdx, slotData.res);
                        } else {
                            store.setHotbarSlot(store.selectedHotbarIndex, slotData.res);
                        }
                    }
                }
            });
        }

        this.setupDropTarget(slot, () => {
            if (!this.draggedPayload) return;

            const store = useGameStore.getState();

            if (this.draggedPayload.source === "equipment" && this.draggedPayload.fromSlot) {
                const currentEquipped = store.equipment[this.draggedPayload.fromSlot];
                if (currentEquipped) {
                    store.addResource(currentEquipped.name, 1);
                    store.equipArmor(this.draggedPayload.fromSlot, null);
                }
            } else if (this.draggedPayload.source === "hotbar" && typeof this.draggedPayload.fromIndex === "number") {
                store.setHotbarSlot(this.draggedPayload.fromIndex, null);
            }
        });

        return slot;
    }

    private renderEquipmentSection(state: ReturnType<typeof useGameStore.getState>): void {
        const barLabel = document.createElement("p");
        barLabel.innerText = "Snabbslots (Verktyg & Hotbar):";
        barLabel.style.fontSize = "12px";
        barLabel.style.color = "#aaa";
        this.container.appendChild(barLabel);

        const bottomContainer = document.createElement("div");
        Object.assign(bottomContainer.style, {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#111111",
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #333333",
            justifyContent: "center",
            width: "fit-content",
        });

        bottomContainer.appendChild(this.renderToolModalSlot(state));

        const divider = document.createElement("div");
        Object.assign(divider.style, {
            width: "2px",
            height: "40px",
            backgroundColor: "#333333",
        });
        bottomContainer.appendChild(divider);

        bottomContainer.appendChild(this.renderHotbarGrid(state));

        this.container.appendChild(bottomContainer);
    }

    private renderToolModalSlot(state: ReturnType<typeof useGameStore.getState>): HTMLDivElement {
        const toolModalSlot = document.createElement("div");
        Object.assign(toolModalSlot.style, {
            width: "48px",
            height: "48px",
            border: state.currentTool ? "2px solid #ffd700" : "2px inset #333333",
            borderRadius: "6px",
            backgroundColor: "#1a1a1a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: state.currentTool ? "pointer" : "default",
            position: "relative",
        });

        if (state.currentTool) {
            const toolIconBadge = document.createElement("span");
            toolIconBadge.innerText = getToolIcon(state.currentTool);
            Object.assign(toolIconBadge.style, {
                position: "absolute",
                top: "2px",
                left: "4px",
                fontSize: "10px",
                pointerEvents: "none",
            });
            toolModalSlot.appendChild(toolIconBadge);

            const toolName = document.createElement("span");
            toolName.innerText = state.currentTool.name.split(" ")[0];
            Object.assign(toolName.style, {
                fontSize: "10px",
                fontWeight: "bold",
                color: "#ffd700",
                marginTop: "4px",
                pointerEvents: "none",
            });

            const toolPower = document.createElement("span");
            toolPower.innerText = "⚡" + state.currentTool.power;
            Object.assign(toolPower.style, {
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "10px",
                color: "#ffffff",
                pointerEvents: "none",
            });

            toolModalSlot.appendChild(toolName);
            toolModalSlot.appendChild(toolPower);
        }

        toolModalSlot.addEventListener("click", () => {
            if (state.currentTool) {
                useGameStore.getState().equipTool(null);
            }
        });

        this.setupDropTarget(toolModalSlot, (resource) => {
            if (resource && ALL_TOOLS[resource as ToolType]) {
                useGameStore.getState().equipTool(resource);
            }
        });

        return toolModalSlot;
    }

    private renderHotbarGrid(state: ReturnType<typeof useGameStore.getState>): HTMLDivElement {
        const hotbarGrid = document.createElement("div");
        Object.assign(hotbarGrid.style, {
            display: "flex",
            gap: "8px",
        });

        state.hotbar.forEach((slotRes, index) => {
            const slot = document.createElement("div");
            Object.assign(slot.style, {
                width: "48px",
                height: "48px",
                border: "2px inset #333333",
                borderRadius: "6px",
                backgroundColor: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: slotRes ? "grab" : "pointer",
                position: "relative",
            });

            if (slotRes) {
                slot.draggable = true;

                const info = RESOURCE_INFO[slotRes];

                if (info && info.color) {
                    const colorBox = document.createElement("div");
                    Object.assign(colorBox.style, {
                        width: "28px",
                        height: "28px",
                        backgroundColor: info.color,
                        borderRadius: "4px",
                        pointerEvents: "none",
                    });

                    const countText = document.createElement("span");
                    countText.innerText = String(state.inventory[slotRes] || 0);
                    Object.assign(countText.style, {
                        position: "absolute",
                        bottom: "2px",
                        right: "4px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        pointerEvents: "none",
                    });

                    slot.appendChild(colorBox);
                    slot.appendChild(countText);
                }

                this.setupDragStart(slot, {
                    source: "hotbar",
                    resource: slotRes,
                    fromIndex: index,
                });
            }

            slot.addEventListener("click", () => {
                useGameStore.getState().setHotbarSlot(index, null);
            });

            this.setupDropTarget(slot, (resource) => {
                if (resource) {
                    const info = RESOURCE_INFO[resource];
                    if (!info?.isTool && !info?.isArmor) {
                        useGameStore.getState().setHotbarSlot(index, resource);
                    }
                }
            });

            hotbarGrid.appendChild(slot);
        });

        return hotbarGrid;
    }

    private setupDragStart(element: HTMLElement, payload: DragPayload): void {
        element.addEventListener("dragstart", (e: DragEvent) => {
            e.stopPropagation();
            this.draggedPayload = payload;
            if (e.dataTransfer) {
                e.dataTransfer.setData("text/plain", payload.resource);
                e.dataTransfer.effectAllowed = "move";
            }
        });

        element.addEventListener("dragend", (e: DragEvent) => {
            e.stopPropagation();
            this.draggedPayload = null;
        });
    }

    private setupDropTarget(element: HTMLElement, onDrop: (resource: string) => void): void {
        element.addEventListener("dragover", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = "move";
            }
        });

        element.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const resource = this.draggedPayload?.resource || e.dataTransfer?.getData("text/plain") || "";
            onDrop(resource);
            this.draggedPayload = null;
        });
    }

    private subscribeToStore() {
        useGameStore.subscribe(() => {
            this.render();
        });
    }
}

if (!customElements.get("inventory-modal")) {
    customElements.define("inventory-modal", InventoryModal);
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\MobileControls.ts
==================================================

export interface MobileInputState {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    primaryAction: boolean;
    secondaryAction: boolean;
}

export class MobileControls extends HTMLElement {
    public state: MobileInputState = {
        left: false,
        right: false,
        up: false,
        down: false,
        jump: false,
        primaryAction: false,
        secondaryAction: false,
    };

    constructor() {
        super();
    }

    connectedCallback() {
        this.id = "mobile-controls-container";

        this.setupStyles();
        this.createDomElements();
        this.setupEvents();
    }

    private setupStyles(): void {
        this.classList.add(
            "absolute",
            "bottom-0",
            "w-full",
            "flex",
            "justify-between",
            "items-center",
            "text-4xl",
            "pointer-events-none",
            "z-10",
        );
    }

    private createDomElements(): void {
        const leftContainer = this.createContainer("btn-container-left", 1, 1);
        const rightContainer = this.createContainer("btn-container-right", 2, 2);

        this.appendChild(leftContainer);
        this.appendChild(rightContainer);

        const emptyPlaceholder = this.createButton("empty", "", 0, 0);
        const emptyPlaceholder1 = emptyPlaceholder.cloneNode(true) as HTMLButtonElement;

        const upButton = this.createButton("btn-up", "bi-caret-up", 0, 1);
        const leftButton = this.createButton("btn-left", "bi-caret-left", 1, 0);
        const rightButton = this.createButton("btn-right", "bi-caret-right", 1, 2);
        const downButton = this.createButton("btn-down", "bi-caret-down", 2, 1);

        const secondaryActionButton = this.createButton("btn-secondaryAction", "bi-plus", 3, 0);
        const primaryActionButton = this.createButton("btn-primaryAction", "bi-x", 3, 1);

        const jumpButton = this.createButton("btn-jump", "bi-circle", 4, 1);

        // append buttons to dpad in right position
        const dpadContainerLeft = document.getElementById("dpad-container-btn-container-left") as HTMLDivElement;
        dpadContainerLeft.appendChild(emptyPlaceholder);

        const dpadContainerRight = document.getElementById("dpad-container-btn-container-right") as HTMLDivElement;
        dpadContainerRight.appendChild(secondaryActionButton);
        dpadContainerRight.appendChild(primaryActionButton);
        dpadContainerRight.appendChild(emptyPlaceholder1);
        dpadContainerRight.appendChild(jumpButton);
    }

    private createContainer(id: string, rows: number, cols: number): HTMLDivElement {
        // left and right containers, 1 up/down container, 1 action container
        // 4 or 3 containers for buttons

        const container = document.createElement("div");
        container.id = id;
        container.classList.add(
            "w-full",
            "flex",
            id === "btn-container-left" ? "justify-start" : "justify-end",
            "items-center",
            "text-4xl",
            "p-4",
            "pointer-events-none",
            "z-500",
            "rounded-3xl",
        );

        // create 2 rows 2 cols for dpad
        const dpadContainer = document.createElement("div");
        dpadContainer.id = "dpad-container-" + id;
        dpadContainer.classList.add("w-fit", "h-full", "gap-2");
        dpadContainer.classList.add("grid", `grid-cols-${cols}`, `grid-rows-${rows}`);

        container.appendChild(dpadContainer);

        return container;
    }

    private createButton(id: string, icon: string, row: number, column: number): HTMLButtonElement {
        const button = document.createElement("button");

        if (id === "empty") {
            button.id = id;
            button.classList.add("w-20", "h-20");
            return button;
        }

        button.id = id;
        button.classList.add(
            "mx-auto",
            "w-20",
            "h-20",
            "rounded-full",
            "bg-blue-950",
            "text-white",
            "cursor-pointer",
            "flex",
            "items-center",
            "justify-center",
            "active:scale-90",
            "transition-all",
            "pointer-events-auto",
            "select-none",
        );
        button.innerHTML = `<i class="bi ${icon}"></i>`;
        button.dataset.row = row.toString();
        button.dataset.col = column.toString();

        return button;
    }

    private setupEvents(): void {
        this.bindButton("btn-left", "left");
        this.bindButton("btn-right", "right");
        this.bindButton("btn-jump", "jump");
        this.bindButton("btn-up", "up");
        this.bindButton("btn-down", "down");
        this.bindButton("btn-primaryAction", "primaryAction");
        this.bindButton("btn-secondaryAction", "secondaryAction");
    }

    private bindButton(id: string, key: keyof MobileInputState): void {
        const btn = document.getElementById(id);
        if (!btn) return;

        // Hantera touch- och mus-events för mobil och desktop-test
        const startPress = (e: Event) => {
            e.preventDefault();
            this.state[key] = true;
        };

        const endPress = (e: Event) => {
            e.preventDefault();
            this.state[key] = false;
        };

        btn.addEventListener("touchstart", startPress, { passive: false });
        btn.addEventListener("touchend", endPress, { passive: false });
        btn.addEventListener("mousedown", startPress);
        btn.addEventListener("mouseup", endPress);
        btn.addEventListener("mouseleave", endPress);
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("controls-ui")) {
    customElements.define("controls-ui", MobileControls);
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\ToolSlot.ts
==================================================

import { useGameStore, ALL_TOOLS } from "store";
import type { ToolType } from "types";
import { renderSlotContent, getToolIcon } from "./uiHelpers";

export class ToolSlot extends HTMLElement {
    private button!: HTMLButtonElement;

    connectedCallback(): void {
        this.setupStyles();
        this.createDomElements();
        this.subscribeToStore();
    }

    private setupStyles(): void {
        this.classList.add("relative", "inline-flex", "items-center", "z-10");
        Object.assign(this.style, { userSelect: "none" });
    }

    private createDomElements(): void {
        this.innerHTML = "";

        this.button = document.createElement("button");
        Object.assign(this.button.style, {
            width: "48px",
            height: "48px",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#ffffff",
            outline: "none",
            border: "2px solid #444444",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            pointerEvents: "auto",
            cursor: "default",
            transition: "all 0.1s ease",
        });

        this.button.addEventListener("dragover", (e: DragEvent) => {
            e.preventDefault();
            this.button.style.borderColor = "#ffffff";
            this.button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        });

        this.button.addEventListener("dragleave", () => {
            this.updateUI();
        });

        this.button.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            const itemName = e.dataTransfer?.getData("text/plain");
            if (itemName && ALL_TOOLS[itemName as ToolType]) {
                useGameStore.getState().equipTool(itemName);
            }
        });

        this.button.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation();
        });

        this.appendChild(this.button);
        this.updateUI();
    }

    private subscribeToStore(): void {
        useGameStore.subscribe(() => {
            this.updateUI();
        });
    }

    private updateUI(): void {
        const state = useGameStore.getState();

        const hasTool = state.currentTool !== null;
        this.button.style.border = hasTool ? "3px solid #ffffff" : "2px solid #444444";
        this.button.style.backgroundColor = hasTool ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.6)";

        renderSlotContent(this.button, {
            itemKey: state.currentTool?.name,
            isTool: true,
            toolData: state.currentTool,
            icon: getToolIcon(state.currentTool),
        });
    }

    public destroy(): void {
        this.remove();
    }
}

if (!customElements.get("tool-slot-ui")) {
    customElements.define("tool-slot-ui", ToolSlot);
}


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\uiHelpers.ts
==================================================

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


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\UITypes.ts
==================================================

export interface ResourceDetails {
    name: string;
    color?: string;
    isTool?: boolean;
    isArmor?: boolean;
    isCraftable?: boolean; // <--- Din nya flagga
    recipe?: Record<string, number>;
    type?: string;
}

export const RESOURCE_COLORS: Record<string, string> = {
    dirt: "#8b5a2b",
    stone: "#808080",
    coal: "#000000",
    iron_ore: "#808080",
    iron_ingot: "#c0c0c0",
    copper_ore: "#b87333",
    copper_ingot: "#d97724",
    silver_ore: "#a8a8a8",
    silver_ingot: "#e0e0e0",
    gold_ore: "#ffd700",
    gold_ingot: "#ffae00",
    diamond: "#00ffff",
    wood: "#5c4033",
    sand: "#e0c068",
    core: "#ff4500",
    chest: "#8b4513",
    bed: "#ff0000",
    torch: "#ffcc00",
};

export const RESOURCE_INFO: Record<string, ResourceDetails> = {
    dirt: { name: "Jord", color: RESOURCE_COLORS.dirt },
    stone: { name: "Sten", color: RESOURCE_COLORS.stone },
    coal: { name: "Kol", color: RESOURCE_COLORS.coal },
    wood: { name: "Trä", color: RESOURCE_COLORS.wood },
    sand: { name: "Sand", color: RESOURCE_COLORS.sand },
    iron_ore: { name: "Järnmalm", color: RESOURCE_COLORS.iron_ore },
    copper_ore: { name: "Kopparmalm", color: RESOURCE_COLORS.copper_ore },
    silver_ore: { name: "Silvermalm", color: RESOURCE_COLORS.silver_ore },
    gold_ore: { name: "Guldmalm", color: RESOURCE_COLORS.gold_ore },
    diamond: { name: "Diamant", color: RESOURCE_COLORS.diamond },

    // Ingots (Smältning / Crafting)
    iron_ingot: {
        name: "Järntacka",
        color: RESOURCE_COLORS.iron_ingot,
        isCraftable: true,
        recipe: { iron_ore: 1, coal: 1 },
    },
    copper_ingot: {
        name: "Koppartacka",
        color: RESOURCE_COLORS.copper_ingot,
        isCraftable: true,
        recipe: { copper_ore: 1, coal: 1 },
    },
    silver_ingot: {
        name: "Silvertacka",
        color: RESOURCE_COLORS.silver_ingot,
        isCraftable: true,
        recipe: { silver_ore: 1, coal: 1 },
    },
    gold_ingot: {
        name: "Guldtacka",
        color: RESOURCE_COLORS.gold_ingot,
        isCraftable: true,
        recipe: { gold_ore: 1, coal: 1 },
    },

    // Byggbara items & Möbler
    chest: {
        name: "Chest",
        color: RESOURCE_COLORS.chest,
        isCraftable: true,
        recipe: { wood: 8 },
    },
    bed: {
        name: "Bed",
        color: RESOURCE_COLORS.bed,
        isCraftable: true,
        recipe: { wood: 5, dirt: 3 },
    },
    torch: {
        name: "Torch",
        color: RESOURCE_COLORS.torch,
        isCraftable: true,
        recipe: { wood: 1, coal: 1 },
    },

    // Swords
    "Iron Sword": { name: "Iron Sword", isTool: true, type: "sword" },
    "Diamond Sword": { name: "Diamond Sword", isTool: true, type: "sword" },

    // Pickaxes
    "Wood Pickaxe": { name: "Wood Pickaxe", isTool: true, type: "pickaxe" },
    "Iron Pickaxe": { name: "Iron Pickaxe", isTool: true, type: "pickaxe" },
    "Diamond Pickaxe": { name: "Diamond Pickaxe", isTool: true, type: "pickaxe" },

    // Axes
    "Wood Axe": { name: "Wood Axe", isTool: true, type: "axe" },
    "Iron Axe": { name: "Iron Axe", isTool: true, type: "axe" },
    "Diamond Axe": { name: "Diamond Axe", isTool: true, type: "axe" },

    // Shovels
    "Wood Shovel": { name: "Wood Shovel", isTool: true, type: "shovel" },
    "Iron Shovel": { name: "Iron Shovel", isTool: true, type: "shovel" },
    "Diamond Shovel": { name: "Diamond Shovel", isTool: true, type: "shovel" },

    // Rustning
    "Iron Helmet": { name: "Iron Helmet", isArmor: true, type: "helmet" },
    "Leather Clothes": { name: "Leather Clothes", isArmor: true, type: "armor" },
    "Iron Clothes": { name: "Iron Clothes", isArmor: true, type: "armor" },
    "Speed Boots": { name: "Speed Boots", isArmor: true, type: "boots" },
};


==================================================
📂 TYP: KÄLLKOD
📄 FIL: src\ui\VirtualJoystick.ts
==================================================

import type { PlayerDirection } from "player";

export interface JoystickState {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    direction: PlayerDirection | null;
    force: number;
    angle: number;
}

export class VirtualJoystick extends HTMLElement {
    public state: JoystickState = {
        up: false,
        down: false,
        left: false,
        right: false,
        direction: null,
        force: 0,
        angle: 0,
    };

    private base!: HTMLDivElement;
    private thumb!: HTMLDivElement;
    private activePointerId: number | null = null;

    private radius: number = 75;
    private innerThreshold: number = 0.2;
    private outerThreshold: number = 0.6;

    connectedCallback(): void {
        this.render();
        this.setupEvents();
    }

    private render(): void {
        const outerWalkDiameter = this.radius * 2 * this.outerThreshold;

        const style = document.createElement("style");
        style.textContent =
            ":host {" +
            "  position: fixed;" +
            "  bottom: 16px;" +
            "  left: 16px;" +
            "  touch-action: none;" +
            "  user-select: none;" +
            "}" +
            ".joystick-base {" +
            "  width: " +
            this.radius * 2 +
            "px;" +
            "  height: " +
            this.radius * 2 +
            "px;" +
            "  background: rgba(0, 0, 0, 0.4);" +
            "  border: 2px solid rgba(255, 255, 255, 0.2);" +
            "  border-radius: 50%;" +
            "  position: relative;" +
            "  display: flex;" +
            "  align-items: center;" +
            "  justify-content: center;" +
            "}" +
            ".joystick-walk-boundary {" +
            "  width: " +
            outerWalkDiameter +
            "px;" +
            "  height: " +
            outerWalkDiameter +
            "px;" +
            "  border: 1px dashed rgba(255, 255, 255, 0.3);" +
            "  border-radius: 50%;" +
            "  position: absolute;" +
            "  pointer-events: none;" +
            "}" +
            ".joystick-thumb {" +
            "  width: " +
            this.radius * 0.6 +
            "px;" +
            "  height: " +
            this.radius * 0.6 +
            "px;" +
            "  background: rgba(255, 255, 255, 0.8);" +
            "  box-shadow: 0 0 8px rgba(0,0,0,0.3);" +
            "  border-radius: 50%;" +
            "  position: absolute;" +
            "  pointer-events: none;" +
            "  transform: translate(0px, 0px);" +
            "  transition: background-color 0.15s ease;" +
            "}" +
            ".joystick-thumb.walking {" +
            "  background: rgba(0, 255, 150, 0.9);" +
            "}";

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(style);

        this.base = document.createElement("div");
        this.base.className = "joystick-base";

        const walkBoundary = document.createElement("div");
        walkBoundary.className = "joystick-walk-boundary";
        this.base.appendChild(walkBoundary);

        this.thumb = document.createElement("div");
        this.thumb.className = "joystick-thumb";

        this.base.appendChild(this.thumb);
        shadow.appendChild(this.base);
    }

    private setupEvents(): void {
        this.base.addEventListener("pointerdown", (e: PointerEvent) => {
            this.activePointerId = e.pointerId;
            this.base.setPointerCapture(e.pointerId);
            this.updatePosition(e);
        });

        this.base.addEventListener("pointermove", (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.updatePosition(e);
            }
        });

        const handlePointerUp = (e: PointerEvent) => {
            if (e.pointerId === this.activePointerId) {
                this.reset();
            }
        };

        this.base.addEventListener("pointerup", handlePointerUp);
        this.base.addEventListener("pointercancel", handlePointerUp);
    }

    private updatePosition(e: PointerEvent): void {
        const rect = this.base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const clampedDist = Math.min(dist, this.radius);

        const thumbX = Math.cos(angle) * clampedDist;
        const thumbY = Math.sin(angle) * clampedDist;

        this.thumb.style.transform = "translate(" + thumbX + "px, " + thumbY + "px)";

        const force = clampedDist / this.radius;

        let currentDirection: PlayerDirection | null = null;
        let isUp = false;
        let isDown = false;
        let isLeft = false;
        let isRight = false;

        if (force > this.innerThreshold) {
            // Beräkna vinkel i grader (0-360)
            let deg = (angle * 180) / Math.PI;
            if (deg < 0) deg += 360;

            // Indela i 8 sektorer om 45 grader vardera (offset 22.5 grader)
            if (deg >= 337.5 || deg < 22.5) {
                currentDirection = "right";
                isRight = true;
            } else if (deg >= 22.5 && deg < 67.5) {
                currentDirection = "down-right";
                isDown = true;
                isRight = true;
            } else if (deg >= 67.5 && deg < 112.5) {
                currentDirection = "down";
                isDown = true;
            } else if (deg >= 112.5 && deg < 157.5) {
                currentDirection = "down-left";
                isDown = true;
                isLeft = true;
            } else if (deg >= 157.5 && deg < 202.5) {
                currentDirection = "left";
                isLeft = true;
            } else if (deg >= 202.5 && deg < 247.5) {
                currentDirection = "up-left";
                isUp = true;
                isLeft = true;
            } else if (deg >= 247.5 && deg < 292.5) {
                currentDirection = "up";
                isUp = true;
            } else if (deg >= 292.5 && deg < 337.5) {
                currentDirection = "up-right";
                isUp = true;
                isRight = true;
            }
        }

        const isWalking = force >= this.outerThreshold;

        if (isWalking) {
            this.thumb.classList.add("walking");
        } else {
            this.thumb.classList.remove("walking");
        }

        this.state = {
            force: force,
            angle: angle,
            direction: currentDirection,
            left: isLeft && isWalking,
            right: isRight && isWalking,
            up: isUp && isWalking,
            down: isDown && isWalking,
        };
    }

    private reset(): void {
        this.activePointerId = null;
        this.thumb.style.transform = "translate(0px, 0px)";
        this.thumb.classList.remove("walking");
        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            direction: null,
            force: 0,
            angle: 0,
        };
    }
}

if (!customElements.get("virtual-joystick")) {
    customElements.define("virtual-joystick", VirtualJoystick);
}
