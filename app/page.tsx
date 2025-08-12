"use client";
import Image from "next/image";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {/* <section id="section1" className="w-full max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              1. 🧳 必要な物
            </h1>
            <div className="text-center space-y-6">
              <p className="text-lg">
                ご存知? 金を稼ぐ為に金が必要です。
                まずは携帯かパソコンとインターネットが必要です。
                そしたらこの中から一つのウオレットが必要です。
              </p>

              <div className="flex justify-center">
                <Image
                  src={"/meteora/wallets.png"}
                  alt={"different wallets"}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <p className="text-lg">
                Meteoraはソルのチェインのプロトコルなのでよろしくね。
                で後はそこにお金を入れることです。まー僕はソルが好きなので結婚ソルでプレイするんですけど
                USDTとかが好きな人だったらそっちのコイン使ってもオッケーです🙆。
              </p>
              <p className="text-lg">
                携帯でも出来ますけどまーパソコン使った方が早いし見やすい。
                けど携帯でウオレットのアプリをダウンロードしたらもちろんできます。
                外にいたら便利と思います。
              </p>
              <p className="text-lg">
                大きいマーケットキャップのコインもあるし、低いのもありますので色んなプレイができます。
                ただただmemecoin じゃないのでご安心。
              </p>

              <p className="text-lg">
                あとは自分の好きなアプリでマーケットを調べましょう。
                僕の場合はdexscreenerを使います。こちらです:
              </p>

              <div className="flex justify-center">
                <Image
                  src={"/meteora/dexscreener.png"}
                  alt={"dexscreener"}
                  width={800}
                  height={800}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <p className="text-lg">
                これでどのコインを選択するのか決めます。
                ボーナス:少しLPとCLMMをなんだかグーグルで確認してください。
                まー、知らなくてもいいけれど、知っていたらもっと早くmeteoraを理解する事ができます。
                せめてLPぐらいを知った方が良いね。
              </p>
              <p className="text-lg font-bold">
                オッケーこれで準備できました。さてと、ゲームの説明に入ります。
              </p>
            </div>
          </section>*/}
        </div>
      </main>

    </div>
  );
}
