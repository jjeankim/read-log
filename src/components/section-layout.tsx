interface SectionLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SectionLayout = ({ title, children }: SectionLayoutProps) => {
  return (
    <section className="bg-white p-8 rounded-2xl border" >
      <div className="mb-6 text-2xl font-bold">{title}</div>
      {children}
    </section>
  );
};

export default SectionLayout;
