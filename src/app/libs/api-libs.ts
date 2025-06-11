export const getAnimeResponse = async (
  source: string, 
  query: string, 
  options: { next: { revalidate: number } }
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${source}?${query}`, options);
  const data = await response.json();
  return data;
};