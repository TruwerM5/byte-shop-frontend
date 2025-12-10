import { IoMdStar } from 'react-icons/io';

export default function ProductPopularuty({ popularity }: { popularity: number }) {
  const fullStars = Math.floor(popularity);
  const hasPartial = popularity % 1 > 0;
  const totalStars = 5;

  return (
    <div className="popularity flex items-center">
      {Array.from({ length: totalStars }).map((_, index) => {
        if (index < fullStars) {
          return (
            <span
              className="relative"
              key={index}
            >
              <IoMdStar className="text-gray-500" />
              <IoMdStar className="text-red-600 absolute inset-0" />
            </span>
          );
        }

        if (index === fullStars && hasPartial) {
          const percentage = (popularity % 1) * 100;
          return (
            <span
              className="relative"
              key={index}
            >
              <IoMdStar className="text-gray-500" />
              <IoMdStar
                className="text-red-600 absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - percentage}% 0 0)`,
                }}
              />
            </span>
          );
        }

        return (
          <span
            className="relative"
            key={index}
          >
            <IoMdStar className="text-gray-500" />
          </span>
        );
      })}
    </div>
  );
}
