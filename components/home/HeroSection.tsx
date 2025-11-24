"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    title: "당신의 독서를 더 특별하게",
    desc: "읽고, 기록하고, 공유하는 나만의 독서 공간",
    cta: "독서 기록 작성하기",
    href: "/logs/write",
    bg: "bg-primary/10",
  },
  {
    title: "오늘의 추천 책",
    desc: "카카오 책 검색 API로 추천 책을 만나보세요",
    cta: "추천 책 보기",
    href: "/recommend",
    bg: "bg-yellow-100",
  },
  {
    title: "나만의 독서 통계를 확인해보세요",
    desc: "한눈에 보는 나의 1년 독서 기록",
    cta: "독서 통계 보러가기",
    href: "/stats",
    bg: "bg-green-100",
  },
];

const HeroSection = () => {
  return (
    <section className="w-full py-6 rel relative">
     
        <div className=" rounded-xl shadow">
          <Carousel
            className="w-full"
            // plugins={[
            //   Autoplay({
            //     delay: 3000,
            //   }),
            // ]}
          >
            <CarouselContent>
              {heroSlides.map((slide, idx) => (
                <CarouselItem key={idx}>
                  <div
                    className={`flex flex-col md:flex-row items-center justify-between px-8 py-12 rounded-xl ${slide.bg}`}
                  >
                    {/* Left Text */}
                    <div className="space-y-4 max-w-md">
                      <h2 className="text-3xl md:text-4xl font-bold">
                        {slide.title}
                      </h2>
                      <p className="text-gray-700 text-sm md:text-base">
                        {slide.desc}
                      </p>
                      <Link href={slide.href}>
                        <Button size="lg" className="mt-3">
                          {slide.cta}
                        </Button>
                      </Link>
                    </div>

                    {/* Right Placeholder Image */}
                    <div className="hidden md:block w-40 h-40 bg-gray-200 rounded-xl"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <CarouselPrevious className="-left-10 opacity-50"/>
            <CarouselNext className="-right-10 opacity-50"/>
          </Carousel>
        </div>
   
    </section>
  );
};

export default HeroSection;
