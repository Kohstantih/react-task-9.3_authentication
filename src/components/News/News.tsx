import { Link } from "react-router-dom";

import useJsonFetch from "../../hooks/useJsonFetch";
import NewsItem from "./NewsItem";

import { TObjectNews } from "../../types/TObjectNews";
import { TLogOut } from "../../types/TLogOut";

import './News.css';

export default function News(
        { token, logOut, isDetails, hideToolbar }:
        {
            token: string,
            logOut: TLogOut,
            isDetails: boolean,
            hideToolbar: React.Dispatch<boolean>
        }
    ) {
    const [news, loading, error] = useJsonFetch<[], TObjectNews[]>(import.meta.env.VITE_APP_USER_NEWS, [], token);
    
    if (error) logOut();

    return (
        <>  
            {news && !error && !isDetails &&
                <ul className="news_list">
                    {news.map((n) => <Link
                        className="news-item_link"
                        onClick={() => {hideToolbar(true)}}
                        key={n.id}
                        to={`/news/${n.id}`}
                        state={ {obj: n} } >
                        <NewsItem objectNews={n} />
                    </Link>)}
                </ul>
            }
            {loading && <p>Loading...</p>}
        </>
    )
}
