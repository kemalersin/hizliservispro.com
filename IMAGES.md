# Görseller

Tüm dosyalar `public/images/` altındadır. Üretim paleti: soğuk beyaz stüdyo; vurgu olarak canlı sarı `#FFD000`, kırmızı `#E23B2F`, yeşil `#2BB673`; mavi tek renk değil, arada kullanılır. Krem kâğıt ve terracotta sel yok. Aydınlık stüdyo, 2.5D editorial, az nesne.

## Marka

| Dosya | Kullanım | Nasıl |
| --- | --- | --- |
| `logo.svg` | Nav, favicon ile aynı dil | El SVG. Üç noktalı ağ + tekerlek yayı, yuvarlatılmış damga. |
| `emblem-hsp.jpg` | Yedek amblem | Cursor GenerateImage. Prompt: soğuk beyaz zemin, kobalt damga, üç bağlı nokta ve tekerlek yayı, yazısız. |
| `/favicon.svg` | Favicon | `logo.svg` ile aynı geometri, 64 birim. |

## İllüstrasyonlar (üretim)

Cursor içi görsel üretim (çıktı JPEG; uzantı `.jpg`). Kısa prompt özeti:

| Dosya | Sahne | Prompt özeti |
| --- | --- | --- |
| `illust-network.jpg` | Bayi ağı | Kırmızı/sarı/yeşil çatılı atölyeler, motosiklet ve traktör. |
| `illust-coupon.jpg` | Kupon | Garanti fişi, kırmızı mühür, sarı ataş, yeşil dal. |
| `illust-parts.jpg` | Yedek parça | Sarı parça, kırmızı ve yeşil etiket ipleri. |
| `illust-field-road.jpg` | Tarla + yol | Yeşil tarla, kırmızı traktör, sarı motosiklet, mavi bağ. |
| `illust-approve.jpg` | Onay | Kırmızı damga, sarı ataş, yeşil işaret. |
| `illust-trace.jpg` | Şasi izi | Sarı mini scooter, kırmızı-yeşil kesik iz. |
| `illust-message.jpg` | Bildirim | Sarı etiket, kırmızı zil, yeşil yaprak. |
| `illust-brand.jpg` | Uyarlama | Kart; sarı, kırmızı, yeşil çipler. |
| `sector-two-wheels.jpg` | İki tekerlek | Kırmızı motosiklet, sarı scooter, beyaz stüdyo. |
| `sector-agri.jpg` | Tarım | Yeşil traktör, sarı jant. |
| `sector-other.jpg` | Diğer üretici | Sarı etiketli makine, kırmızı anahtar. |
| `og.jpg` | Open Graph | `illust-network.jpg` kopyası. |

`illust-field-road.jpg` ve `illust-trace.jpg` şu an yedek stoktur; sayfada ağ ve şasi için diğer sahneler kullanıldı. İstenirse hero arkasına veya bento’ya takılabilir.

## Temsili ürün arayüzleri

Gerçek screenshot ve ekran görseli yok. Ürün yüzeyi HTML/CSS şematik mockup’tır (`.ui`, `.ui--desk`, `.ui--phone`); görsel dosya üretilmez. Çubuk, hap ve yan menü; foto-gerçek SaaS değildir. `.shot` içindeki `.ui` kapsayıcıyı `inset: 0` ile doldurur.

Masaüstü (`.ui--desk`, 16:10 kapsayıcı):

| Sınıf | Sahne | Konum |
| --- | --- | --- |
| `.ui--sasi` | Şasi ile araç geçmişi | Hero, özellikler bento |
| `.ui--stok` | Stok katmanları ve sipariş | Çözüm 03, özellikler |
| `.ui--onay` | Garanti talep onayı | Nasıl çalışır 03 |
| `.ui--bakim` | İlk montaj ve bakım | Özellikler |
| `.ui--ag` | Bayi ağı ve yetkiler | Nasıl çalışır 01 |

Mobil (`.ui--phone`, CSS telefon çerçevesi 9:19.5):

| Sınıf | Sahne | Konum |
| --- | --- | --- |
| `.ui--kupon` | Kupon kesimi | Hero telefon, mobil sıra |
| `.ui--mbakim` | Bayi bakım kaydı | Nasıl çalışır 02, mobil sıra |
| `.ui--garanti` | Garanti belgesi | Mobil sıra |

Şişkin 3D cihaz mockup’ı yoktur; çerçeve HTML/CSS’tir.

## Kullanılmayan / telif

Üretici logoları gömülmedi. Arora, Borbis, Bolat, Motolux yalnızca yazı wordmark. WhatsApp ve Logo resmi logosu yok; metin placeholder.
