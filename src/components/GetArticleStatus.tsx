type ArticleStatus = {
    article_count: number;
    size: string;
}

const GetArticleStatus: React.FC<ArticleStatus> = ({ article_count, size }) => {

    let outerSize: string;
    let innerSize: string;


    switch (size) {
        case "sm":
            outerSize = "w-5 h-5";
            innerSize = "w-3 h-3";
            break;
    
        case "md":
            outerSize = "w-7 h-7";
            innerSize = "w-5 h-5";
            break;

        case "lg":
            outerSize = "w-9 h-9";
            innerSize = "w-6 h-6";
            break;
        
        default:
            outerSize = "w-5 h-5";
            innerSize = "w-3 h-3";
            break;
    }

    if (article_count === 0) {
        return (
            <div className={`${outerSize} rounded-full flex items-center justify-center bg-red-100`}>
                <div className={`${innerSize} rounded-full bg-red-300`} />
            </div>
        );
    }

    if (article_count < 50) {
        return (
            <div className={`${outerSize} rounded-full flex items-center justify-center bg-orange-100`}>
                <div className={`${innerSize} rounded-full bg-orange-300`} />
            </div>
        );
    }

    return (
        <div className={`${outerSize} rounded-full flex items-center justify-center bg-emerald-100`}>
            <div className={`${innerSize} rounded-full bg-emerald-300`} />
        </div>
    );
}

export default GetArticleStatus;