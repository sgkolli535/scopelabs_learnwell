export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 md:pt-10">
      <div className="inline-block px-28 text-center justify-center">
        {children}
      </div>
    </section>
  );
}
