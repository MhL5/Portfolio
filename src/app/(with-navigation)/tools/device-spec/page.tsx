"use client";

import { ObjectKeysTyped } from "@/app/(with-navigation)/snippets/utils/ObjectKeysTyped";
import { useEffect, useState, type ReactNode } from "react";

type DeviceInfo = {
  "screen Width": string;
  "screen Height": string;
  "viewport Width": string;
  "viewport Height": string;
  "device Pixel Ratio": number;
  "color Depth": number;
};

export default function DeviceSpec() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const getDeviceInfo = (): DeviceInfo => {
      const info: DeviceInfo = {
        "screen Width": `${window.screen.width}px`,
        "screen Height": `${window.screen.height}px`,
        "viewport Width": `${window.innerWidth}px`,
        "viewport Height": `${window.innerHeight}px`,
        "device Pixel Ratio": window.devicePixelRatio,
        "color Depth": window.screen.colorDepth,
      };

      return info;
    };

    setDeviceInfo(getDeviceInfo());

    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!deviceInfo) return null;

  return (
    <div className="bg-card text-card-foreground mx-auto my-8 w-[calc(100%-2rem)] max-w-xl rounded-lg p-6 shadow-md">
      <h2 className="mb-5 text-xl font-semibold">Device Specifications</h2>

      <ul className="space-y-3">
        {deviceInfo &&
          ObjectKeysTyped(deviceInfo).map((key) => (
            <TitleValue
              key={key}
              title={key}
              value={deviceInfo?.[key] ?? null}
            />
          ))}
      </ul>
    </div>
  );
}

function TitleValue({ title, value }: { title: ReactNode; value: ReactNode }) {
  return (
    <li className="flex items-start justify-between gap-2 border-b py-2 last:border-none">
      <span className="font-medium capitalize">{title}</span>
      <span className="text-sm">{value}</span>
    </li>
  );
}
