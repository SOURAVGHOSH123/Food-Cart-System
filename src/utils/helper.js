export const getLikeCount = (reactions) =>
   Object.values(reactions).filter((r) => r === "like").length;

export const getDislikeCount = (reactions) =>
   Object.values(reactions).filter((r) => r === "dislike").length;

export const getAverageReview = (reviews, id) => {
   const review = reviews.filter((r) => r.productId == id)
   const totalRating = review.reduce((totalRating, r) => {
      return totalRating += r.rating
   }, 0)
   console.log(totalRating)
   const avgRating = totalRating > 0 ? Number(totalRating / review.length).toFixed(2) : "4.00"
   // console.log(typeof avgRating)
   // console.log(avgRating)
   return avgRating
}