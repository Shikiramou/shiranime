import Link from "next/link"

interface listProps {
    title: string,
    linkHref: string,
    linkTitle: string,
}

const Header: React.FC<listProps> = ({title, linkHref, linkTitle}) => {
    return (
        <div className="w-full xl:max-w-5/6 mx-auto px-4 flex justify-between">
    <h1 className="flex items-center py-3 text-2xl font-semibold capitalize text-neutral-200">
      <span className="inline-block w-1 h-6 mr-2 rounded-md bg-neutral-200"></span>
          {title}
        </h1>
        <Link href={linkHref} className="text-sm xl:text-lg md:text-md underline text-neutral-200 p-4 hover:text-neutral-400 font-bold">{linkTitle}</Link>
      </div>
    )
}

export default Header
