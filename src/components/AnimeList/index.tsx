import Link from "next/link";
import Image from "next/image";

interface AnimeData {
  mal_id: number;
  title: string;
  year: number;
  id: number;
  status: string;
  images: {
    webp: {
      image_url: string;
    };
  };
}

interface ApiResponse {
  data: AnimeData[];
}

interface AnimeListProps {
  api: ApiResponse;
}

const AnimeList: React.FC<AnimeListProps> = ({ api }) => {
  const data = api.data;

  return (
    <>
      {data ? (
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 w-full xl:max-w-5/6 mx-auto justify-items-center">
          {data.map((item) => (
            <div key={item.mal_id} className="w-full">
              <Link href={`/${item.mal_id}`} className="group">
                <div className="relative w-full h-auto mx-auto overflow-hidden rounded-lg">
                  <div className="absolute z-10 flex items-center justify-center w-full h-full duration-300 bg-black opacity-0 group-hover:opacity-60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-1/4 h-auto duration-300 group-hover:scale-150"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                      ></path>
                    </svg>
                  </div>
                
                  <Image
                    src={item.images.webp.image_url}
                    alt={item.title}
                    width={200}
                    height={300}
                    className="w-full h-auto rounded-lg hover:scale-105"
                  />
                </div>
                <h3 className="ml-2 mt-2 whitespace-nowrap font-semibold overflow-hidden text-neutral-300 text-ellipsis text-sm">
                  {item.title}
                </h3>
                <p className="ml-2 text-sm text-neutral-500 font-bold">
                  {item.year || "N/A"}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Link href="/" className="group">
            No data available
          </Link>
        </div>
      )}
    </>
  );
}

export default AnimeList;
