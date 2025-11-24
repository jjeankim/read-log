import Footer from "@/components/Footer";
import Header from "@/components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="w-full flex justify-center px-4 py-6 flex-1">
        <div className="w-full max-w-7xl">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default SiteLayout;
