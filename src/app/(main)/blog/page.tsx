import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Secangkir Kopi dan Pikiran yang Melayang',
    author: 'Risa Senja',
    publishedAt: '2025-07-28T10:30:00Z',
    content:
      'Pagi ini, aroma kopi hitam memenuhi ruangan. Uapnya menari-nari di udara, membawa serta jejak-jejak kenangan. Aku duduk di dekat jendela, membiarkan mentari pagi memeluk hangat punggungku. Ada banyak hal yang melayang di pikiranku, dari daftar belanja hingga mimpi-mimpi yang belum terjamah. Terkadang, kita hanya butuh jeda sejenak, membiarkan pikiran berkelana, sebelum kembali merangkai kata dan makna. Apa secangkir kopimu hari ini?',
  },
  {
    id: 'blog-2',
    title: 'Petualangan Mencari Kedai Ramen Tersembunyi di Bandung',
    author: 'Bima Jelajah',
    publishedAt: '2025-07-27T15:00:00Z',
    content:
      'Sebagai pecinta ramen sejati, misiku tak pernah berakhir: menemukan kedai ramen tersembunyi. Petualangan kali ini membawaku menyusuri gang-gang kecil di daerah Dipati Ukur, Bandung. Setelah bertanya sana-sini dan hampir tersesat, aku menemukan sebuah kedai kecil dengan pintu kayu yang usang. Tapi begitu masuk... oh, surga! Kuah kental, mie kenyal, dan *chashu* yang meleleh di lidah. Ini dia, ramen tersembunyi yang patut dicoba! Ada rekomendasi lain?',
  },
  {
    id: 'blog-3',
    title: 'Ketika Ide Liar Menjadi Cerpen Singkat',
    author: 'Lina Imajinasi',
    publishedAt: '2025-07-26T08:45:00Z',
    content:
      "Semalam, aku terbangun dengan sebuah ide aneh: bagaimana jika kucing-kucing di komplek ini diam-diam adalah agen rahasia? Ide itu terus mengganggu sampai aku memutuskan untuk menuliskannya. Dari sana, lahirlah sebuah cerpen singkat tentang 'Misi Kucing Hitam di Tengah Malam'. Proses menulis fiksi memang selalu seru, membiarkan imajinasi bebas meliar dan membentuk dunia baru. Jangan takut untuk menuliskan ide paling gilumu, mungkin saja itu adalah karya besarmu berikutnya!",
  },
  {
    id: 'blog-4',
    title: 'Refleksi Diri: Belajar Menerima Ketidakpastian',
    author: 'Ari Santai',
    publishedAt: '2025-07-25T11:20:00Z',
    content:
      'Hidup ini penuh ketidakpastian. Dulu, aku selalu berusaha mengontrol segalanya, merencanakan setiap detail. Tapi kemudian, aku sadar bahwa ada keindahan dalam melepas kendali, dalam menerima bahwa tidak semua hal bisa kita prediksikan. Belajar hidup di tengah ketidakpastian ini adalah sebuah proses panjang, dan aku masih terus belajar. Mungkin, kuncinya adalah menikmati setiap momen, baik yang manis maupun yang pahit. Bagaimana caramu menghadapi ketidakpastian?',
  },
  {
    id: 'blog-5',
    title: 'Manfaat Kecil dari Tidur Siang Singkat',
    author: 'Putri Rehat',
    publishedAt: '2025-07-24T14:10:00Z',
    content:
      'Siapa bilang tidur siang itu cuma buat anak-anak atau orang malas? Sebagai pekerja lepas, tidur siang singkat adalah *power-up* rahasiaku! Cuma 20-30 menit, tapi efeknya luar biasa. Otak jadi lebih segar, konsentrasi meningkat, dan *mood* pun membaik. Rasanya seperti memulai hari dari awal lagi. Jadi, jangan ragu untuk menyelipkan *power nap* di tengah kesibukanmu. Badan dan pikiranmu pasti akan berterima kasih.',
  },
  {
    id: 'blog-6',
    title: 'Mendekorasi Ruang Minimalis dengan Barang Bekas',
    author: 'Kira Kreatif',
    publishedAt: '2025-07-23T09:55:00Z',
    content:
      'Rumah kecilku yang minimalis butuh sentuhan personal, tapi *budget* terbatas. Solusinya? Berburu barang bekas! Dari kursi bekas yang di-cat ulang hingga lampu gantung dari botol kaca, aku berhasil menyulap ruanganku jadi lebih *cozy* dan unik. Bukan cuma hemat, tapi juga ramah lingkungan. Prosesnya seru dan hasilnya memuaskan. Siapa bilang barang bekas tidak bisa jadi cantik? Kreativitas memang tanpa batas!',
  },
];

export default function BlogPage() {
  return (
    <div>
      <section className="py-32">
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              temukan inspirasi terkini
            </Badge>
            <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              Blog Posts
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              Lihat apa yang sedang hangat di nulisterbuka atau temukan kisah
              baru yang menginspirasi.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-all">
                <CardHeader className="">
                  <CardTitle
                    className="text-xl font-semibold line-clamp-2"
                    title={post.title}
                  >
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Oleh {post.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4">{post.content}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-sm">
                    {new Date(post.publishedAt).toLocaleString('id-ID', {
                      hour: 'numeric',
                      minute: 'numeric',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
