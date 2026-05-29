import faviconUrl from "../../public/favicon/favicon.svg?url";

/** Workspace icon — same asset as the site favicon (square). */
export function StudioIcon() {
  return (
    <img
      src={faviconUrl}
      alt="The Skinbar"
      style={{
        display: "block",
        height: "100%",
        width: "100%",
        objectFit: "contain",
      }}
    />
  );
}
