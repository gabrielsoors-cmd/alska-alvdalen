# Fontstatus

## ✅ Ropa Soft Pro — på plats

Light, Regular och Bold är konverterade till `.woff2` och inkopplade i
`assets/css/style.css` via `@font-face`. Används till alla rubriker
(`--font-heading`).

## ⏳ Garamond Premier Pro — saknas fortfarande

Brödtexten (`--font-body`) kör just nu på **EB Garamond** (gratis från
Google Fonts) som stand-in, eftersom det är den typografiskt närmaste
gratisersättningen till Garamond Premier Pro. Skicka över de riktiga
fontfilerna (samma sätt som Ropa Soft Pro kom in) så kopplar vi in dem på
samma sätt:

1. Konvertera till `.woff2` om de kommer som `.otf`/`.ttf` (jag kan göra
   det åt dig).
2. Lägg filerna i den här mappen.
3. Lägg till `@font-face`-regler i `assets/css/style.css`, likadant som
   för Ropa Soft Pro ovanför `:root`.
4. Byt `--font-body: 'EB Garamond', 'Garamond Premier Pro', Georgia, serif;`
   till `--font-body: 'Garamond Premier Pro', Georgia, serif;` (eller låt
   EB Garamond ligga kvar som extra fallback).
5. Ta bort Google Fonts-importen (`@import url(...)`) högst upp i filen
   när den inte längre behövs, för snabbare sidladdning.

Kom ihåg: se till att licensen täcker webbanvändning (webfont-licens),
inte bara skrivbordsbruk.
