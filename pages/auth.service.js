import cacheData from 'memory-cache';

export default async function fetchCarousel (url) {
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else {
        const hours = 24;
        const res =  await fetch(url);
        const data =  await res.json();
        cacheData.put(url, data.content, hours * 1000 * 60 * 60);
        return data;
    }
}