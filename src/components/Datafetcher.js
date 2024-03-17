"use server"
const fetchData = async (service, provider, otherParams, currentPage) => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`${process.env.API_BASE_URL}/${service}/${provider}/${otherParams}?page=${currentPage || 1}`);
    const response = await fetch(`${process.env.API_BASE_URL}/${service}/${provider}/${otherParams}?page=${currentPage || 1}`,
        {
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        },
        { next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
}
export default fetchData;
