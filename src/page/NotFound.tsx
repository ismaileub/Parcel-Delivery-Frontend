import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <p className="text-sm font-semibold tracking-widest text-amber-400/80">
        404 ERROR
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        The page you are looking for doesn&apos;t exist or has been moved. Check
        the URL, or go back to the homepage.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-amber-400 px-6 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-amber-500"
        >
          Go to Home
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
