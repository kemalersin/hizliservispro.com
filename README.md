# Hızlı Servis Pro — tanıtım sitesi

Üretici, bayi ve servis ekiplerine yönelik tek sayfalık ürün vitrini. Kayıt veya üyelik yoktur; amaç demo talebi almaktır.

## Çalıştırma

Node **18 veya üzeri** gerekir (Vite 6). Bu makinede nvm varsa:

```bash
nvm use 22.13.0
npm install
npm run dev
```

`node -v` hâlâ `v14` gösteriyorsa önce `nvm use 22.13.0` çalıştırın; aksi halde Vite `||=` sözdiziminde düşer.

Adres: [http://localhost:5173](http://localhost:5173)

Üretim derlemesi:

```bash
npm run build
npm run preview
```

Çıktı `dist/` klasörüne yazılır. Statik barındırmaya bu klasör yeter.

## Demo formu

Form backend’e gitmez. Gönderince `mailto:olimpus@olimpus.com.tr` açılır; ad, firma, telefon, e-posta, sektör ve mesaj gövdeye yazılır. Adres ayrıca kopyalanabilir.

## Giriş adresleri

Sitede hesap açılmaz. Mevcut panellere gider:

| Yüzey | URL |
| --- | --- |
| Üretici paneli | https://hizliservispro.com/panel |
| Bayi | https://hizliservispro.com/bayi |
| Sipariş | https://hizliservispro.com/siparis |

## Tasarım token’ları

Renk, yazı, boşluk, yarıçap ve gölge `src/css/tokens.css` içindedir. Tailwind kullanılmaz.

## Görseller

Üretilen illüstrasyonlar ve ekran yer tutucuları `public/images/` altındadır. Hangi dosyanın nasıl üretildiği ve gerçek ekran görüntüsünün nereye konacağı için `IMAGES.md` dosyasına bakın.
