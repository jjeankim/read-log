import Image from "next/image";

const MainBanner = () => {
  return (
    <div className="bg-white relative aspect-[16/6] w-full border rounded-2xl overflow-hidden">
      <Image
        src="/banner.svg"
        alt="banner"
        fill
        className="object-cover object-[50%_10%] scale-80"
      />
    </div>
  );
};

export default MainBanner;
