import { useEffect, useRef, useState } from "react";

export default function useJsonFetch<T, D>(
    url: string,
    dataInitial: T,
    token: string
    ): [data: T | D, loading: boolean, error: string | null] {
    const [data, setData] = useState(dataInitial);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const timestampRef = useRef<number>();

    useEffect(() => {
        const timestamp = Date.now();
        timestampRef.current = timestamp;
        
        setLoading(true);

        fetch(url, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        }).then((response) => {
                if (response.ok) return response.json();
                throw new Error('Не удалось загрузить данные');
            }).then((data) => {
                if (data) {
                    if (timestampRef.current === timestamp) return setData(data);
                    else return;
                }
                throw new Error('Не удалось прочитать загруженные данные');
            }).catch((err) => {
                setError(err.message)
            }).finally(() => {
                setLoading(false)
            })
    }, [url, token]);

    return [data, loading, error];
}
