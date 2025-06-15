import { buttonVariants } from "../ui/button";

const NavBar = () => {
  const links = [
    {
      url: "/",
      label: "Home",
    },
    {
      url: "/about",
      label: "About",
    },
    {
      url: "/contact",
      label: "Contact",
    },
  ];

  return (
    <header className="w-full py-4 bg-white fixed top-0 left-0 border-b border-gray-300 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <p>IE</p>

        <ul className="flex gap-4">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex">
          <a className={buttonVariants()} href="/sign-in">
            Sign-In
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
