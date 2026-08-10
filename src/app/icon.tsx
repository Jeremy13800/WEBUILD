import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1712",
          borderRadius: 7,
          color: "#dd8c57",
          fontSize: 20,
          fontWeight: 600,
          fontStyle: "italic",
        }}
      >
        W
      </div>
    ),
    size,
  );
}
