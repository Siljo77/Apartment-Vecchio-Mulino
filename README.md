# Apartment Vecchio Mulino

A responsive, single-page apartment website prepared for the owner's final photography and verified property details.

The page currently supports English, Croatian, and Italian. It includes a Google Maps embed for Ul. Aldo Negri 4 in Bale, direct Booking.com reservations, WhatsApp enquiries, and a telephone link.

## Preview

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Photography

The complete set of 40 distinct full-resolution apartment photographs is stored in `assets/photos/`. Smaller duplicate downloads were intentionally omitted. Gallery images are lazy-loaded and open in an accessible full-screen viewer.

The Booking buttons currently point to the supplied Booking.com share link.

The verified apartment description, amenities, map, original photography, and owner contact links are implemented. Direct enquiries are available through Maja by WhatsApp, telephone, and email at `belusicmaja@gmail.com`.
