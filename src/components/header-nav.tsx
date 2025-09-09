import Link from "next/link";

const navItems = [
  { label: "홈", href: "/" },
  { label: "로그", href: "/logs" },
  { label: "추천", href: "/logs/recommended" },
  { label: "내 서재", href: "/my-library" },
];

const HeaderNav = () => {
  return (
    <div className="flex items-center gap-8">
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default HeaderNav;
