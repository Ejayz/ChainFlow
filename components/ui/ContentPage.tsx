"use client";

export default function ContentPage({
  children,
  cssStyle,
}: Readonly<{
  children: React.ReactNode;
  cssStyle: string;
}>) {
  return (
    <main
      className={`${cssStyle} flex min-h-screen  items-center justify-between `}
    >
      {children}
    </main>
  );
}
