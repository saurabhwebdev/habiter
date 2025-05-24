const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {new Date().getFullYear()} HabitFlow. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-sm font-medium hover:underline" href="#">
              Terms
            </a>
            <a className="text-sm font-medium hover:underline" href="#">
              Privacy
            </a>
            <a className="text-sm font-medium hover:underline" href="#">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
