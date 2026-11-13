# Mekanik Kuleler — APK üretme rehberi

## YOL A — Bilgisayara hiçbir şey kurmadan (GitHub ile, önerilen)
GitHub'ın sunucusu APK'yı senin yerine derler.

1. https://github.com adresinde ücretsiz hesap aç, **New repository** ile boş bir depo oluştur.
2. Bu klasörün **içindekileri** depoya yükle:
   - **Git biliyorsan:** `git init && git add . && git commit -m "ilk" && git branch -M main && git remote add origin <depo-adresi> && git push -u origin main`
   - **Tarayıcıdan:** depo sayfasında *Add file → Upload files*, klasörün içindeki her şeyi sürükle.
     `.github` klasörü gizli olduğu için bazen atlanır. Atlanırsa: *Add file → Create new file*,
     dosya adına `.github/workflows/build-apk.yml` yaz ve `github-workflow/build-apk.yml` içeriğini yapıştır.
3. Depoda **Actions** sekmesine gir. "APK Derle" çalışmaya başlar (ilk seferde 5–10 dk sürer).
   Başlamazsa soldan "APK Derle" → **Run workflow**.
4. Yeşil tik çıkınca çalıştırmaya tıkla, sayfanın altındaki **Artifacts** bölümünden
   `mekanik-kuleler-debug-apk` dosyasını indir, zip'i aç → `app-debug.apk`.
5. APK'yı telefona gönder, dokun, "Bilinmeyen kaynaklardan yüklemeye izin ver" uyarısını onayla.

Kırmızı çarpı çıkarsa çalıştırmaya tıkla, hata veren adımın günlüğünü kopyalayıp bana yapıştır.

> Paket adını (`com.example.mekanikkuleler`) yüklemeden önce `capacitor.config.json` içinde kendi adınla değiştir.

---

## YOL B — Kendi bilgisayarında derleme

## Gerekenler (bir kez kurulur)
1. **Node.js** (LTS) — https://nodejs.org
2. **Android Studio** (güncel sürüm) — https://developer.android.com/studio
   İlk açılışta "Standard" kurulumu seç; Android SDK ve uygun JDK'yı kendisi getirir.

## APK üretme (komut satırı, bu klasörde)
```bash
npm install
npm run libs                 # Three.js'i www/lib içine kopyalar
npx cap add android          # android/ klasörünü oluşturur (bir kez)
npx cap sync android

cd android
./gradlew assembleDebug      # Windows: gradlew.bat assembleDebug
```
APK burada oluşur:
`android/app/build/outputs/apk/debug/app-debug.apk`

> Gradle "SDK location not found" derse `android/local.properties` dosyası oluşturup
> `sdk.dir=/Android/SDK/yolun` satırını ekle (Android Studio → Settings → Android SDK'da yazar).

## Telefona kurma
- **Kablo ile:** Telefonda Geliştirici seçenekleri → USB hata ayıklamayı aç, sonra
  `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`
- **Dosya ile:** APK'yı telefona gönder (Drive, Telegram, kablo), dosyaya dokun ve
  "Bilinmeyen kaynaklardan yüklemeye izin ver" uyarısını onayla.

## Android Studio ile (alternatif)
`npx cap open android` → Build → Build Bundle(s) / APK(s) → Build APK(s).

## Kendi paket adın
`capacitor.config.json` içindeki `appId` değerini **`add android` yapmadan önce** değiştir
(örn. `com.seninadin.mekanikkuleler`). Sonradan değiştirmek için android/ klasörünü silip yeniden ekle.

## Simge ve açılış ekranı
```bash
npm i -D @capacitor/assets
# assets/icon-only.png (1024x1024) ve assets/splash.png (2732x2732) koy
npx capacitor-assets generate --android
```

## Google Play için (sonraki adım)
- Debug APK sadece test içindir. Play için **imzalı AAB** gerekir: `./gradlew bundleRelease`
  (kendi keystore'unla imzala veya Play App Signing kullan).
- Yeni uygulamalar için hedef API seviyesi güncel şartı karşılamalı (Android 16 / API 36).
  `android/variables.gradle` içindeki `targetSdkVersion` değerini kontrol et;
  gerekirse `npm i @capacitor/android@latest @capacitor/core@latest` ile güncelle.

## Oyunu bilgisayarda denemek
`npm install && npm run libs` yaptıktan sonra `www/index.html` dosyasını tarayıcıda aç
(VS Code'da Live Server ile de olur).
