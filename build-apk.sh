#!/bin/bash
set -e

echo "=== 1. Build web app ==="
npm run build

echo "=== 2. Sync to Android ==="
npx cap sync android

echo "=== 3. Build APK ==="
cd android
./gradlew assembleDebug

APK="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK" ]; then
  cp "$APK" ../baby-diary.apk
  echo "=== Done! APK at: baby-diary.apk ==="
  ls -lh ../baby-diary.apk
else
  echo "APK not found. Try opening in Android Studio: npx cap open android"
fi
