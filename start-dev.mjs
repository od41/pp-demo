import { execSync } from "child_process";
import getPort from "get-port";
import os from "os";

const getIPAddress = () => {
  const platform = os.platform();
  let cmd;

  switch (platform) {
    case "darwin": // macOS
      cmd = "ipconfig getifaddr en0";
      break;
    case "linux":
      cmd = "hostname -I | awk '{print $1}'";
      break;
    case "win32": // Windows
      cmd = "ipconfig";
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }

  try {
    if (platform === "win32") {
      const ipConfig = execSync(cmd).toString();
      const ipMatch = ipConfig.match(/IPv4 Address[.\s]+: ([\d.]+)/);
      return ipMatch ? ipMatch[1] : "127.0.0.1";
    } else {
      return execSync(cmd).toString().trim();
    }
  } catch (error) {
    console.error(`Failed to get IP address: ${error.message}`);
    return "127.0.0.1";
  }
};

(async () => {
  try {
    const ip = getIPAddress();

    // Function to find an available port within a range
    const getAvailablePort = async (start, end) => {
      const portsInUse = [];
      for (let port = start; port <= end; port++) {
        try {
          const availablePort = await getPort({ port });
          if (availablePort === port) {
            return { port, portsInUse };
          } else {
            portsInUse.push(port);
          }
        } catch (error) {
          console.log(error);
        }
      }
      throw new Error(`No available ports found in range ${start}-${end}`);
    };

    // Get an available port in the range 3000-3100
    const { port, portsInUse } = await getAvailablePort(3000, 3100);

    if (portsInUse.length > 0) {
      console.log(`🚧 Ports in use: ${portsInUse.join(", ")}`);
    }
    console.log(`Starting server at http://${ip}:${port}`);

    // Set environment variables
    process.env.HOST = ip;
    process.env.PORT = port.toString();

    // Start the Next.js development server
    execSync(`npx next dev -H ${ip} -p ${port}`, {
      stdio: "inherit",
      env: { ...process.env, HOST: ip, PORT: port.toString() },
    });
  } catch (error) {
    console.error("Failed to start development server:", error.message);
  }
})();
