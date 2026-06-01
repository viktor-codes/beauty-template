# Site settings → where values appear (B.10)

Edit **Site settings** (`siteSettings-{en|uk|ru}`) for canonical contact data.  
Edit **Landing page** for marketing copy (headlines, labels, form text).

| Site settings field | Overwrites on site |
|-------------------|-------------------|
| `phone` | Contact section phone line; footer phone label |
| `phoneTelHref` | Footer phone `href` (tap-to-call) |
| `email` | Contact section email; footer email + `mailto:` |
| `address` | Contact section address; footer address |
| `directionsHref` | Contact + footer “Directions” link |
| `telegramHref` | Contact Telegram button URL |
| `whatsappHref` | Contact WhatsApp button URL |
| `instagramUrl` | Contact Instagram button; footer Instagram; gallery Instagram (when set) |

## Stays on Landing page only

| Landing field | Purpose |
|---------------|---------|
| Contact `eyebrow`, `title`, `description` | Section copy |
| `phoneLabel`, `emailLabel`, `locationTitle` | Translated UI labels |
| Messenger `ariaLabel` | Accessibility text per button |
| `contactForm` | Form labels, placeholders, validation messages |
| Footer `brandTitle`, `tagline`, link groups | Footer marketing copy |

## Fallback rule

If a Site settings field is **empty**, the mapper uses the matching field on **Landing → Contact** (static fallback when CMS is off).
