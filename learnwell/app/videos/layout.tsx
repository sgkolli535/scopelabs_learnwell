export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 py-2">
      <div className="inline-block text-center">
        {children}
      </div>
    </section>
  );
}
