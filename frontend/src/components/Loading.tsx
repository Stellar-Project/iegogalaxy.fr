export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-2 min-h-[200px]">
      <img src="/assets/global/loader/now_loading_ball.gif" alt="" className="h-10 w-10" />
      <img src="/assets/global/loader/now_loading.gif" alt="Chargement..." className="h-10" />
    </div>
  );
}
