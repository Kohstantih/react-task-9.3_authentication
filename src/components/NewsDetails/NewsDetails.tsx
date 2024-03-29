import { useLocation } from "react-router-dom";
import NewsItem from "../News/NewsItem";

import './NewsDetails.css';

export default function NewsDetails() {
    const { state } = useLocation();

    return (
        <div className="news-details_wrapper">
            <NewsItem objectNews={state.obj} />
        </div>
    )
}