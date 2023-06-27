

type Newspaper = {
    base_url: string;
    full_name: string;
    provider: string;
    start_url: string;
    logo: string;
    article_count?: number;
}

export const defaultNewspaper = {
    base_url: "",
    full_name: "",
    provider: "",
    start_url: "",
    logo: "",
    article_count: 0
}


export default Newspaper;