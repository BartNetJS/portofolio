# Memristor uitgelegd (en hoe het verschilt van een klassieke geheugencel)

Een memristor is een **weerstand met geheugen**. De weerstand verandert blijvend wanneer er lading doorheen gaat (ionen verschuiven), en onthoudt die stand zonder voeding. Dat maakt hem geschikt als analoge “gewicht”-opslag, bijvoorbeeld in neuromorfe chips.

## Hoe werkt het fysiek?
- Het materiaal heeft een geleidend (gedopeerd) stuk en een resistief stuk. Waar de **grens** ligt, bepaalt de totale weerstand.
- Een spanning met voldoende grootte duwt ionen/vacancies en verschuift die grens → de weerstand (conductantie) verandert.
- Bij lage meetspanning (“read”) bewegen ionen niet; je leest alleen de stroom bij die vaste toestand.

## Vergelijking met een gewone geheugencel (SRAM/DRAM/Flash)
- **SRAM/DRAM**: slaan bits op via ladingsniveaus op condensatoren/transistors; digitaal, vluchtig (DRAM moet verversen).
- **Flash**: bewaart lading op een floating gate; digitaal, non‑volatile, maar schrijft in grote blokken en slijt.
- **Memristor**: bewaart een **analoge weerstandstoestand** (non‑volatile), kan tussenniveaus nemen (niet alleen 0/1). Schrijven = ionen verschuiven, lezen = kleine meetstroom zonder verschuiven.

## Waarom interessant voor AI / analoge MVM
- Je kunt een memristor zien als een analoge “gewicht”-opslag: **conductantie = gewicht**.
- In een crossbar-array kun je met één spanningspuls per rij een matrix‑vector‑vermenigvuldiging uitvoeren; de stroom somt zich op volgens Kirchhoff.
- Dit is energiezuinig, want rekenen gebeurt in het geheugen zelf (“in-memory compute”).

## Wat je in de animatiepagina ziet
Open de interactieve demo: [memrestistor.html](/Blogs/memresistor-explained/memrestistor.html).

- **Linkerzijde**: sliders voor `x` (invoer), `z` (doel) en `tolerantie`. Knoppen om te trainen, een stap te zetten, te lezen, te resetten.
- **Rechterpaneel**: een memristor als balk met doped/undoped regio’s. De grens verschuift tijdens training; ionen blijven zichtbaar. Je ziet ook `x` (fysiek), de berekende weerstand **R** en de read‑stroom bij lage spanning.
- **Hysteresis-lus**: wanneer je een I‑V cyclus start, sweepen we de spanning; de stroom-lus toont het geheugeneffect (niet perfect gesloten → geheugen).
- **Training**: gebruikt hogere spanning; duwt de grens in kleine stappen totdat `|z - x·w|` binnen de ingestelde tolerantie valt. `w` is de interne multiplier afgeleid van de fysieke positie.
- **Read**: lage spanning, toont alleen de meetpuls; ionen blijven staan.

## In één zin
Een memristor is een weerstand met geheugen: schrijven = ionen verschuiven (R verandert blijvend), lezen = stroom meten bij een kleine V, waardoor hij tegelijk opslag én rekengewicht kan zijn.
