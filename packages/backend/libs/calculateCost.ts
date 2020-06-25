/**
 * Buisness logic for calculating the cost for storing posts.
 *
 * This is basically saying that if a user wants to store 10 or fewer posts, we’ll
 * charge them $4 per post. For 11 to 100 posts, we’ll charge $2 and any
 * more than 100 is $1 per post
 * @param postsCount
 */
const calculateCost = (postsCount: number) => {
  const rate = postsCount <= 10
    ? 4
    : postsCount <= 100
      ? 2
      : 1;
  return rate * postsCount * 100;
}

export default calculateCost;
