# Älska Älvdalen — webbplats

Statisk sajt (ren HTML/CSS/JS, inget byggsteg krävs) byggd efter
`Alska_Grafisk_manual_2015.pdf`. Tre sidor i första versionen:

- `index.html` — Startsida
- `om.html` — Om Älska Älvdalen
- `kontakt.html` — Kontakt

## Vad som är på plats

Den logotyp-zip ni bifogade innehöll tomma mappar utan filer, så
logotypen, fotot och färgerna är istället extraherade direkt ur den
grafiska manual-PDF:en (logotypen låg där som vektorgrafik, inte bara
bild — så den gick att få ut i full kvalitet):

- **Logotyp** — `assets/img/logo/` innehåller alla sex officiella
  varianter som SVG (skalbara, används i sajten) + PNG-fallback:
  purpur, solgul, skogsgrön, svart, vit, vit-på-purpur-platta, samt
  purpur-varianten med datumrad. Färgerna är de exakta ur manualens
  avsnitt 3.1 (Pantone/CMYK/RGB), inte uppskattade.
- **Foto** — `assets/img/hero-handfasting.jpg` (bilden med handhållning
  i solnedgång från manualens framsida) används i hero-sektionen.
  **OBS:** manualen anger att detta är den enda bilden av bildspråket som
  inte är en skissbild/mockup, men den är sannolikt licensierad
  stockfotografi kopplad till 2015 års kampanj — kontrollera med er
  ursprungliga designer/byrå att ni har rätt att fortsätta använda den på
  webben innan ni publicerar skarpt, eller ersätt den med egna foton.
- **Övriga bilder** i manualens bildspråk (sid 8) är uttryckligen
  skissbilder/mockupbilder och har därför inte tagits med — de är inte
  avsedda för publicering.
- **Färger** — se `:root` i `assets/css/style.css`, kommenterade med källa.

## Vad som fortfarande saknas

- **Fontfiler** för Ropa Soft Pro och Garamond Premier Pro — se
  `assets/fonts/README.md`. PDF:en innehåller bara ofullständiga
  deluppsättningar av typsnitten (de bokstäver som råkar förekomma i
  manualtexten), så riktiga fontfiler med webblicens behövs fortfarande
  från er leverantör.
- Egna foton för sektionerna märkta "Bild kommer" på start- och
  om-sidan (just nu lila/gula platshållarrutor).
- Riktiga kontaktuppgifter i `kontakt.html` (adress, telefon).

## Köra lokalt

Inget byggverktyg behövs. Öppna `index.html` direkt i webbläsaren, eller
kör en enkel lokal server (rekommenderas, så att relativa sökvägar
fungerar precis som i produktion):

```bash
npx serve .
# eller
python3 -m http.server 5500
```

## Lägga upp på GitHub

```bash
git init
git add .
git commit -m "Älska Älvdalen – första version av sajten"
git branch -M main
git remote add origin https://github.com/<ditt-anvandarnamn>/alska-alvdalen.git
git push -u origin main
```

## Koppla till Vercel + domänen alskaalvdalen.com

1. Gå till [vercel.com](https://vercel.com) och logga in (kan göras med
   ditt GitHub-konto).
2. **Add New → Project**, välj GitHub-repot ni just skapade.
3. Vercel känner automatiskt av att det är en statisk sajt (inget
   ramverk/build command behövs) — klicka **Deploy**.
4. När deployen är klar: gå till projektets **Settings → Domains**,
   lägg till `alskaalvdalen.com` (och gärna `www.alskaalvdalen.com` som
   omdirigerar till den).
5. Vercel visar vilka DNS-poster (A-post/CNAME) som ska läggas till hos er
   domänleverantör. Lägg in dem där ni köpte domänen — det tar oftast
   några minuter upp till några timmar innan det slår igenom.

Efter det: varje `git push` till `main` triggar automatiskt en ny
deploy på alskaalvdalen.com.

## Kontaktformuläret

Formuläret på kontaktsidan är förberett men inte kopplat till någon
mottagare än (statiska sidor har ingen backend). Enklaste lösningen:
skapa ett gratiskonto på [Formspree](https://formspree.io) och byt ut
`YOUR-FORM-ID` i `kontakt.html` mot ert formulär-ID. Se kommentaren i
filen för fler alternativ.
