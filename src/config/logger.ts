import { PlatformLoggerSettings, $log } from "@tsed/common";
import { isProduction } from "./config";

if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json",
    },
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json",
    },
  });
}

export const loggerConfig: Partial<PlatformLoggerSettings> = {
  disableRoutesSummary: isProduction,
};
