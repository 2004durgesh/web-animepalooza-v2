"use server"
const fetchData = async (service, provider, otherParams, params = {}) => {
    // await new Promise(resolve => setTimeout(resolve, 10000));

    // Manually construct the query string from the params object
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    console.log("url is", `${process.env.API_BASE_URL}/${service}/${provider}/${otherParams}?${queryString}`);
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/${service}/${provider}/${otherParams}?${queryString}`,
            {
                // cache: 'force-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.API_KEY
                },
                next: { revalidate: 3600 }
            });
        // console.log("response", response)
        const data = await response.json();
        // console.log("data", data)
        if (
            data === null ||
            data === undefined
          ) {
            throw new Error("No data found");
          }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(`${error}`);;
    }
}
export default fetchData;
