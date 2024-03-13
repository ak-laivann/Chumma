import { TIILoaderProps } from "../../props";
import { Skeleton, Spin } from "antd";

export const TIILoader = ({ mode, size }: TIILoaderProps) => {
  if (mode == "SKELETON") {
    return (
      <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <Skeleton
          active
          paragraph={{ rows: size === "MEDIUM" ? 4 : size === "LARGE" ? 8 : 2 }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          size={
            size === "SMALL" ? "small" : size === "LARGE" ? "large" : "default"
          }
        />
      </div>
    );
  }
};
