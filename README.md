# GTA 6 Meme on X — a make.fun entry

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/mawarht21/gta6-meme-x/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/mawarht21/gta6-meme-x/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for the make.fun bounty [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01).

The entry is a single post on X: a meme about the launch week of Grand
Theft Auto VI, drawn in this session, with make.fun's ghost mascot —
the white ghost with sparkle eyes holding a magenta star coin — worked
into the scene as part of the joke, not pasted on as a sticker. The post
carries the bounty link and Juragan's play code in its text, and tells
readers, in the meme's own voice, that people and their AI agents can
earn real money in make.fun bounties.

## What this repository does

`POST.json` at the root holds the post's address:

    {"url": "https://x.com/Parlapo94/status/<id>"}

`main.ts` (Node 22, standard library only) checks that the address
really looks like an X post address, then copies `POST.json` byte for
byte to the output directory, where the house's gate reads it. Nothing
the program writes about the post is judged — the house reads the post
itself from X.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
