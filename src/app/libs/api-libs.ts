

export const getAnimeResponse = async (
source: string, query: string, p0: { next: { revalidate: number; }; }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${source}?${query}`);
    

    const data = await response.json();
    return data;
  
};