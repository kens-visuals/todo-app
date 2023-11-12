import ThemeToggle from '@/app/components/ThemeToggle';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold uppercase tracking-[.8rem] text-white md:text-4xl md:tracking-[1rem]">
        Todo
      </h1>

      <ThemeToggle />
    </div>
  );
}
