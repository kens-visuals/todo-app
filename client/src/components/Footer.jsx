export default function Footer() {
  return (
    <footer className="m-4 text-center text-[.6rem] text-light-text-tertiary dark:text-dark-text-secondary md:m-2 md:text-xs">
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
        className="hover:text-tertiary font-bold uppercase text-blue underline transition-all duration-300 hover:text-current"
      >
        Frontend Mentor
      </a>
      . Coded by{' '}
      <a
        href="https://github.com/kens-visuals"
        target="_blank"
        rel="noreferrer"
        className="hover:text-tertiary font-bold uppercase text-blue underline transition-all duration-300 hover:text-current"
      >
        Kens-Visuals
      </a>
    </footer>
  );
}
