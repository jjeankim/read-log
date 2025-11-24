import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  thumbnail?: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
}

const BookLogCard = ({id,thumbnail,title,author,likes,comments} :Props) => {
  return (
    <Link
      href={`/logs/${id}`}
      className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
    >
      <div className="w-full h-40 relative mb-3 bg-gray-100 rounded overflow-hidden">
        {thumbnail ? (
          <Image src={'/no-image.png'} alt={title} fill className="object-cover" />
        ) : (
          <Image src="/no-image.png" alt="No Image" fill className="object-cover" />
        )}
      </div>

      <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{author}</p>

      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </Link>
  )
}

export default BookLogCard