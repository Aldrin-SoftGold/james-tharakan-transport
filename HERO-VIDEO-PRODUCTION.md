# GCC hero video — production brief

Use this to generate or film the clip that replaces `public/hero/hero-truck.mp4`.

This session cannot export a 30–60s 4K video. Paste the **single prompt** below into Veo, Runway, Kling, or a similar tool, or give the shot list to a cinematographer.

When you have the file:

1. Export **H.264 MP4**, **no audio**, **16:9**, **1080p or 4K**, **30–60 seconds**, loop-friendly.
2. Replace `public/hero/hero-truck.mp4`.
3. Export one still as `public/hero/hero-poster.jpg` (left side darker, truck on the right).
4. Keep the filenames so `src/components/hero/Hero.tsx` does not need a code change.

---

## Single prompt (paste into a video generator)

Photorealistic cinematic 16:9 hero background video, 40–50 seconds, seamless loop, no audio, no text, no logos, no watermarks. Premium corporate documentary footage of GCC heavy cargo road transport. One cohesive sequence, not a travel montage or stock-clip compilation.

A realistic modern heavy truck with a loaded long-haul trailer (building materials: steel, bags, or palletized cargo) travels on a wide multi-lane asphalt highway. The truck stays mostly in the **center-right and right** of frame. The **left third of the frame stays darker, cleaner, and less busy** so large white website headline text can sit there. Do not place the main truck behind the left side.

Environment: dry Gulf region only. Desert highways, sandy and rocky terrain, warm daylight, industrial zones, construction sites, warehouses, cargo yards, port hinterland, concrete and steel, modern GCC highway infrastructure. Dry rocky hills are allowed. No dense forests, no tropical greenery, no European or North American countryside, no alpine green mountains, no farmland, no snow, no tourist landmarks, no flags, no maps.

Unified GCC logistics identity (UAE, Oman, Saudi Arabia, Qatar, Kuwait, Bahrain) as one freight corridor — not six tourist destinations. Calm, confident pace. Slow drone follow, stable side tracking, rear three-quarter follow, wide establishing shots. Natural vehicle motion. Realistic truck proportions, wheels, shadows, and road markings. Early morning or late-afternoon Gulf sun. Natural grade: sand, asphalt, steel, concrete, blue sky. Subtle, not orange Hollywood. No CGI look, no sci-fi trucks, no fast cuts, no zooms, no speed ramps, no fade to black. End on matching highway motion so the last frames loop to the first.

---

## Shot order (about 45 seconds)

Keep cuts slow (4–7 seconds each). Same truck family / paint so it feels like one film.

| Time | Shot |
| --- | --- |
| 0–6s | High drone, wide desert highway. Truck enters from mid-right, travelling away. Left third: darker asphalt / shadow. |
| 6–12s | Rear three-quarter follow of the loaded trailer on a modern multi-lane GCC highway. Industrial haze on the horizon. |
| 12–18s | Side tracking, low and stable. Loaded flatbed or tautliner. Dry rocky Oman-style hills in the far distance, not green. |
| 18–24s | Elevated highway: commercial traffic, our truck prominent on the right. Warehouse / concrete sprawl, not a skyline postcard. |
| 24–30s | Slow approach into an industrial / construction zone. Rebar, aggregates, steel, site fencing. Truck purposeful, not racing. |
| 30–36s | Wide cargo-yard or port hinterland: containers, trailers, cranes far back. Truck crossing right of frame. |
| 36–42s | Long Saudi-style desert highway. Truck receding on the right into warm late light. |
| 42–48s | Return to a wide drone highway shot similar to the opening so the loop can cut or crossfade invisibly. |

---

## Website composition (do not ignore)

The homepage headline sits on the **left**:

> Moving materials.  
> Moving business.

Rules:

- Left ~35% of frame: darker, low detail, no truck cab, no bright sky flare.
- Main subject (truck, road receding, yards): **center-right**.
- No important action under the headline block.
- 16:9, sharp enough for full-bleed desktop.

Brand colours to *complement*, not paint onto the scene:

- Royal `#3355A6`
- Ochre `#A77928`
- Off-white `#ECECEE`

---

## Technical export

- **Length:** 30–60s (target 40–50s)
- **Aspect:** 16:9
- **Resolution:** 4K preferred, 1080p minimum
- **Codec:** H.264 MP4
- **Audio:** none
- **Loop:** last 1–2 seconds visually compatible with first 1–2 seconds
- **File size for web:** after generation, compress toward 8–15 MB if possible (`ffmpeg` H.264, CRF 23–28) so the hero still loads

The site only plays the video when the visitor does not have Reduce Motion, Save-Data, or a 2G connection. Everyone else sees `hero-poster.jpg` first.

---

## Do not include

Text, captions, logos, company name, watermarks, country labels, flags, maps, UI, music, voiceover, fade to black, title cards, green countryside, tourist GCC footage, futuristic trucks, warped vehicles.
