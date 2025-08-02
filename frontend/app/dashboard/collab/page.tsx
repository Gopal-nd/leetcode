'use client';
import dynamic from "next/dynamic";

const CollaborativeEditor = dynamic(
  () => import("@/components/OnlineCollabrativeEditor"),
  { ssr: false }
);

export default function Page() {
  return <CollaborativeEditor />;
}
