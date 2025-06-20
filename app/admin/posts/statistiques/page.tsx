import {
  getAveragePostLengths,
  getIconPresenceStats,
  getPostCountByUser,
  getPostsGroupedBy,
  getPublishedStats,
  getTotalPostCount,
} from "@/actions/posts";

export default async function StatistiquePage() {
  const totalPost = await getTotalPostCount();
  const postsByUser = await getPostCountByUser();
  const publishedStats = await getPublishedStats();
  const dailyPost = await getPostsGroupedBy("daily");
  const iconPresenceStats = await getIconPresenceStats();
  const avgPostLength = await getAveragePostLengths();

  return (
    <div>
      <p>{totalPost}</p>
      <p>{JSON.stringify(postsByUser)}</p>
      <p>{JSON.stringify(publishedStats)}</p>
      <p>{JSON.stringify(dailyPost)}</p>
      <p>{JSON.stringify(iconPresenceStats)}</p>
      <p>{JSON.stringify(avgPostLength)}</p>
    </div>
  );
}
