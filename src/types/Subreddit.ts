

type Subreddit = {
    name: string;
    description: string;
    subscribers: number;
    url: string;
}

export const defaultSubreddit = {
    name: "",
    description: "",
    subscsribers: 0,
    url: ""
}

export default Subreddit;