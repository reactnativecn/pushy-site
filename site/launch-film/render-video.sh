#!/bin/bash
# Exports the film as a 1080p60 MP4 with its soundtrack.
#   ./render-video.sh index.html pushy-launch.mp4
#   ./render-video.sh index-en.html cresc-launch.mp4
set -e
cd "$(dirname "$0")"
PAGE=${1:-index.html}; OUT=${2:-launch.mp4}; N=3840; FF=${FFMPEG:-ffmpeg}; J=${JOBS:-4}
SKIP_SITE=1 python3 build.py
node export-audio.mjs
TMP=$(mktemp -d)
for ((i = 0; i < J; i++)); do PAGE=$PAGE node render.mjs $((i * N / J)) $(((i + 1) * N / J)) $TMP/seg$i.mp4 60 & done
wait
for ((i = 0; i < J; i++)); do echo "file $TMP/seg$i.mp4"; done > $TMP/list.txt
$FF -y -loglevel error -f concat -safe 0 -i $TMP/list.txt -i music.wav -c:v copy -c:a aac -b:a 256k -movflags +faststart -shortest "$OUT"
rm -rf $TMP
echo "wrote $OUT"
