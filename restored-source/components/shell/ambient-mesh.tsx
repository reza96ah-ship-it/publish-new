export function AmbientMesh() {
  return (
    <div
      aria-hidden="true"
      className="ambient-mesh pointer-events-none fixed inset-0"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    />
  );
}
