import { useState } from "react";

export const useFetch = (fn) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const func = async (...args) => {
        setLoading(true);
        setError(null);
        try {
           const res = await fn(...args);
           setData(res?.data);
        } catch (err) {
            setError(err.response?.data?.msg || err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return {func, data, loading, error};
}

