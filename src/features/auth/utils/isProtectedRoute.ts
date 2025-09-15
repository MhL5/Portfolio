const protectedPaths: `/${string}`[] = ["/dashboard", "/admin"];

export const isProtectedRoute = (pathname: string) =>
  protectedPaths.some((path) => {
    const normalizedPath = pathname.toLowerCase();
    return (
      normalizedPath === path ||
      (normalizedPath.startsWith(path) && normalizedPath[path.length] === "/")
    );
  });
