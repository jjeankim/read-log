interface LogPageProps {
  params: { id: string };
}

export default async function LogPage({ params }: LogPageProps) {
  const { id } = params; // "/1" → "1"

  // 예시: DB 조회
  // const log = await prisma.log.findUnique({ where: { id: Number(id) } });

  return (
    <div className="p-4">
      <h1>독후감 상세 페이지</h1>
      <p>로그 ID: {id}</p>
    </div>
  );
}
