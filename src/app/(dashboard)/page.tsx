// import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbList,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";

// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import Link from "next/link";

// const getLogList = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("로그 목록을 불러오지 못했습니다.");

//   return res.json();
// };

// export default async function Page() {
//   const { data: logs } = await getLogList();
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator
//             orientation="vertical"
//             className="mr-2 data-[orientation=vertical]:h-4"
//           />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbPage>October 2024</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//           {/* 독후감 검색용 */}
//           <Input />
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">
//           <div className="grid auto-rows-min gap-4 md:grid-cols-5">
//             {logs.map(
//               (log: {
//                 id: number;
//                 bookAuthor: string;
//                 title: string;
//                 rating: number;
//               }) => (
//                 <Link
//                   key={log.id}
//                   href={`/${log.id}`}
//                   className="bg-muted/50 aspect-square rounded-xl border p-2"
//                 >
//                   <div className="flex flex-col gap-2 items-center">
//                     <Image
//                       src={"/book-image.png"}
//                       width={100}
//                       height={40}
//                       alt="book-image"
//                     />
//                     <div className="flex flex-col">
//                       <span className="text-sm">{log.title}</span>
//                       <span className="text-sm">{log.bookAuthor}</span>
//                       <span className="text-sm">{log.rating}</span>
//                     </div>
//                   </div>
//                 </Link>
//               )
//             )}
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
import Image from "next/image";
import Link from "next/link";

const getLogList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("로그 목록을 불러오지 못했습니다.");
  return res.json();
};

export default async function Page() {
  const { data: logs } = await getLogList();

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
      {logs.map(
        (log: {
          id: number;
          bookAuthor: string;
          title: string;
          rating: number;
        }) => (
          <Link
            key={log.id}
            href={`/logs/${log.id}`}
            className="bg-muted/50 aspect-square rounded-xl border p-2"
          >
            <div className="flex flex-col gap-2 items-center">
              <Image
                src={"/book-image.png"}
                width={100}
                height={40}
                alt="book-image"
              />
              <div className="flex flex-col">
                <span className="text-sm">{log.title}</span>
                <span className="text-sm">{log.bookAuthor}</span>
                <span className="text-sm">{log.rating}</span>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
}
