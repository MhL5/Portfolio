import { cacheLife } from "next/cache";
import BookmarkMain from "@/app/(with-navigation)/bookmarks/_components/BookmarkMain";

export default async function Page() {
  "use cache";
  cacheLife("weeks");

  return <BookmarkMain />;
}
