import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold uppercase tracking-[.8rem] text-white">
        Todo
      </h1>

      <ThemeToggle />
    </div>
  );
}
