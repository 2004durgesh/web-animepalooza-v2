"use server"
const fetchData = async (service,provider,otherParams) => {
// await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch(`${process.env.API_BASE_URL}/${service}/${provider}/${otherParams}`,
        {
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });
    const data = await response.json();
    return data;
}
export default fetchData;
