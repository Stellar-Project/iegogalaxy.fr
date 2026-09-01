interface LoadingProps {
  className?: string;
  fullScreen?: boolean;
  message?: string;
}

export default function Loading({
  className = "",
  fullScreen = false,
  message = "Chargement en cours...",
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col sm:flex-row items-center justify-center gap-3 select-none text-foreground ${
        fullScreen ? "min-h-[70vh]" : "min-h-55"
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        <img
          src="/assets/global/loader/now_loading_ball.gif"
          alt=""
          aria-hidden="true"
          className="h-10 w-10 object-contain"
        />
        <img
          src="/assets/global/loader/now_loading.gif"
          alt={message}
          className="h-9 object-contain"
        />
      </div>

      <span className="sr-only font-black">{message}</span>
    </div>
  );
}