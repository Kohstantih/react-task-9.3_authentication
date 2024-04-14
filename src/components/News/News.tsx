import { Link } from "react-router-dom";

import useJsonFetch from "../../hooks/useJsonFetch";
import NewsItem from "./NewsItem";

import { TObjectNews } from "../../types/TObjectNews";
import { TLogOut } from "../../types/TLogOut";

import './News.css';

export default function News(
        { token, logOut, changeDetailsStatus }:
        {
            token: string,
            logOut: TLogOut,
            changeDetailsStatus: (status: boolean) => void
        }
    ) {
    const [news, loading, error] = useJsonFetch<[], TObjectNews[]>(import.meta.env.VITE_APP_USER_NEWS, [], token);
    
    if (error) logOut();

    return (
        <>  
            {news && !error &&
                <ul className="news_list">
                    {news.map((n) => <Link
                        onClick={() => changeDetailsStatus(true)}
                        className="news-item_link"
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
