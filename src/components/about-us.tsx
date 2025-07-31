export default function AboutUsContent() {
  return (
    <section className="w-full py-20 lg:py-32 bg-gray-50">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter">
              Apa Itu nulisterbuka?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              nulisterbuka adalah sebuah ruang. Ruang digital yang kami ciptakan
              untuk siapa saja yang ingin{' '}
              <span className="text-primary font-medium">
                berbagi cerita, ide, dan pemikiran tanpa batas
              </span>
              . Kami percaya, setiap orang punya suara yang layak didengar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left mt-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Visi Kami</h3>
              <p className="text-muted-foreground">
                Menciptakan ekosistem tulisan yang inklusif dan suportif, di
                mana setiap individu merasa nyaman untuk berekspresi,
                berdiskusi, dan menemukan inspirasi dari beragam sudut pandang.
                Kami ingin nulisterbuka menjadi rumah bagi semua jenis cerita.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Prinsip Kami</h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>
                  <b>Kebebasan Berekspresi:</b> Tulis apa saja yang ada di
                  benakmu, selama tetap menghormati sesama.
                </li>
                <li>
                  <b>Keterbukaan:</b> Kami mendorong dialog dan pertukaran ide
                  yang sehat.
                </li>
                <li>
                  <b>Inklusivitas:</b> Setiap latar belakang dan perspektif
                  disambut hangat di sini.
                </li>
                <li>
                  <b>Sederhana:</b> Menulis dan membaca haruslah mudah dan
                  menyenangkan.
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-lg md:text-xl text-muted-foreground">
              Mari bergabung dan mulailah perjalanan ceritamu bersama kami!
            </p>
            <a
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-4"
            >
              Gabung nulisterbuka
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-right ml-2"
              >
                <path d="M18 8L22 12L18 16" />
                <path d="M2 12H22" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
