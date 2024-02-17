export const isLikedByReqUser=(reqUserId,post)=>{
    // console.log("Yep ------")
    for(let user of post.liked){
        if(reqUserId===user.id){
            return true
        }
    }
    return false;
}