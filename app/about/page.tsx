// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* HERO */}
      <section className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-sm">
        {/* Background image */}
        <Image
          src="/me.jpg"         // <-- put this in /public
          alt="About hero"
          fill
          priority
  className="object-cover object-[50%_25%] rounded-2xl"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Headline */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <h1 className="font-serif text-white text-4xl md:text-6xl font-extrabold drop-shadow-sm">
              Hello, I’m Shady!
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg">
              Sharing life’s beautiful moments, one post at a time.
            </p>
          </div>
        </div>
      </section>

      {/* WHO AM I */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-gray-900">
          Who Am I?
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          I’m a coffee-loving, memory-keeping enthusiast with a passion for turning
          everyday moments into lasting treasures. By day, I build and tinker with
          tech; by night (and weekends), you’ll find me surrounded by photos, pages,
          and all things crafty. I believe there’s magic in the mundane and beauty in
          the details. This blog is my little corner of the internet to share that
          philosophy with you.
        </p>
      </section>

      {/* WHAT IS THIS BLOG ABOUT */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-gray-900">
          What is This Blog About?
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          It’s more than just posts — it’s a celebration of life’s journey. You’ll
          find inspiration for your own projects, tips and tricks for preserving
          memories, and stories about the simple joys that make life sweet. Whether
          you’re seasoned or just getting started, I hope you find something here
          that inspires you to capture your own beautiful moments.
        </p>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
