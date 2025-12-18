# Memristor: theorie en hoe het in de demo werkt

## Snelle uitleg bij het rechterpaneel (UI)
- **Memristor (w)**: links blauwgroen = gedopeerd (lage R), rechts paars = ongedopeerd (hoge R). De grens/boundary geeft de positie van de dopants/ionen.
- **schuifstand x (fysiek)**: verhouding van de gedopeerde lengte (0…1). Hogere x = meer geleidend pad = grotere conductantie **G** en lagere **R**.
- **weerstand R**: berekend uit x via het Ron/Roff-model: `R = Roff + (1 - x) * (Ron - Roff)`.
- **read-stroom**: stroom bij een kleine meetspanning (hier 0.10 V). In read-mode bewegen ionen niet; we meten alleen het opgeslagen gewicht.
- **I-V Hysteresis**: de “vingerafdruk”. Bij een spanningscyclus (Start I-V cyclus) sweepen we V positief/negatief. De stroomlus toont het geheugeneffect: bij hogere |V| drift de boundary een beetje, dus de lus is niet lineair/omkeerbaar.
- **Training vs Read**: Training gebruikt hogere V en duwt de boundary/ionen; Read gebruikt lage V en laat x onveranderd.

## Kern van het model (didactisch, vereenvoudigd)
- **Linear-drift memristor** (HP-model): het kanaal is een mix van Ron (gedopeerd) en Roff (ongedopeerd). We benaderen het als:
  - `R(x) = Roff + (1 - x) * (Ron - Roff)` met `0 ≤ x ≤ 1`
  - **Conductantie** `G = 1 / R`
  - **Gewicht w** (in de demo) is geschaald van x naar een bereik `wMin..wMax` (hier 0..3).
- **Training update** (gradient-achtig): `w <- w + η * (z - x*w) * x`. In de UI vertaalt dit naar een verschuiving van x (boundary). Elke puls is één stap naar de gewenste conductantie.
- **Read**: `I = V_read / R(x)`. Geen boundaryshift.

## Wat je op de hysteresis-lus ziet
- Bij lage |V|: bijna lineair (ohms), weinig drift.
- Bij hogere |V|: lichte verschuiving van de lus door ionendrift ⇒ geheugen; de lus is niet perfect gesloten.
- De lusrichting hangt af van sweep-richting (clockwise vs counter-clockwise) en de polariteit die de boundary duwt.

## Praktische duiding (hardware)
- Echte memristors (bijv. oxide-based, RRAM) gebruiken migratie van zuurstofv vacancies of filamentvorming.
- **Non-volatile**: na V=0 blijven ionen/filamenten grotendeels waar ze zijn; de conductantie blijft opgeslagen.
- **Variabiliteit**: Ron/Roff en driftgevoeligheid verschillen per device/pulsduur/temperatuur; daarom werken demo’s vaak met een vereenvoudigd model.
- **Read safety**: read-spanning moet laag genoeg om geen drift te veroorzaken.

## Hoe dit in de demo past
- **x-slider** bepaalt input; **z-slider** het doel. Training verschuift x (fysiek) totdat `|z - x*w| ≤ tolerantie`.
- **tolerantie**: bepaalt het acceptabele venster rond de target-output. We tonen ook het bereik `z ± tolerantie` bij “acceptabel bereik (x*w)”.
- **Train naar doel**: herhaalt pulses tot binnen tolerantie of max stappen. **Read (klein V)** meet zonder wijzigen.
- **I-V cyclus**: triggert een sinus sweep van V; toont het geheugeneffect en beweegt x licht mee bij hogere spanningen.

## Extra referentiepunten (handig om te Googlen)
- “HP memristor linear drift model Ron Roff”
- “Memristor hysteresis loop explanation”
- “Resistive RAM (RRAM) oxygen vacancies” / “filamentary RRAM”
- “Crossbar array memristor matrix-vector multiplication”
