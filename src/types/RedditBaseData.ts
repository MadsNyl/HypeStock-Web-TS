import Count from "./Count";
import CountName from "./CountName";


type RedditBaseData = {
    commentCountPerSubreddit: CountName[];
    totalCommentCount: Count[];
}

export const defaultRedditBaseData = {
    commentCountPerSubreddit: [],
    totalCommentCount: []
}


export default RedditBaseData;