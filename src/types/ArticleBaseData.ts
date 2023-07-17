import Count from "./Count";
import CountDate from "./CountDate";


type ArticleBaseData = {
    total_article_count: Count[];
    article_count_last_day: Count[];
    article_count_by_days: Count[];
    total_article_words_count: Count[];
    article_count_each_hour: CountDate[];
    article_count_each_day: CountDate[];
}

export const defaultArticleBaseData = {
    total_article_count: [],
    article_count_last_day: [],
    article_count_by_days: [],
    total_article_words_count: [],
    article_count_each_hour: [],
    article_count_each_day: []
}


export default ArticleBaseData;