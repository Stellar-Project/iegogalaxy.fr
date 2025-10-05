import {
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

export default function Footer() {
  const version = import.meta.env.VITE_APP_VERSION || "dev";

  return (
    <footer className="z-10 relative bg-neutral-950 border-t border-gray-700 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold tracking-tight select-none text-white">
            Stellar-Project
          </span>
          <span className="text-sm mt-1 select-none text-gray-400">
            &copy; {new Date().getFullYear()} Stellar-Project. Tout droits
            réservés.
          </span>
        </div>

        <div className="flex gap-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <TwitterIcon fontSize="large" />
          </a>
          <a
            href="https://github.com/Stellar-Project"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-100 transition-colors"
          >
            <GitHubIcon fontSize="large" />
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end text-xs gap-1">
          <a
            href="https://github.com/Stellar-Project"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-indigo-400"
          >
            Stellar-Project
          </a>
          <span className="text-gray-400">
            Version du site : {version}
          </span>
        </div>
      </div>
    </footer>
  );
}
