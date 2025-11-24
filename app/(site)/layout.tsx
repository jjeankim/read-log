import Footer from "@/components/Footer";
import Header from "@/components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default SiteLayout;
