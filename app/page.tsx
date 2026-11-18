import { HomePage } from '@/components/Home/HomePage';
import { getHomeStats } from '@/components/Home/stats';

// Product Hunt badge: after launching the template on Product Hunt, import
// `ProductHunt` from '@/components/ProductHunt/ProductHunt' and pass it as
// `<HomePage badge={<ProductHunt />} />`.

// The live numbers (GitHub stars, npm downloads) are fetched here, on the server, and cached for
// an hour: a server build regenerates the page with them, a static export keeps the build's.
export default async function Page() {
  return (
    <main>
      <HomePage stats={await getHomeStats()} />
    </main>
  );
}
