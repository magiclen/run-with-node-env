#!/usr/bin/env node
import { exec, spawn } from "node:child_process";
const argv = process.argv;
if (argv.length <= 3) {
    process.exit(0);
}
const nodeEnv = argv[2];
const command = argv[3];
const args = argv.slice(4);
const child = spawn(command, args, {
    env: {
        ...process.env,
        NODE_ENV: nodeEnv,
    },
    argv0: argv[0],
    shell: true,
    stdio: "inherit",
    detached: true,
});
if (typeof child.pid === "undefined") {
    process.exit(1);
}
const signals = [
    "SIGINT",
    "SIGTERM",
    "SIGHUP",
];
if (process.platform === "win32") {
    signals.push("SIGBREAK", "SIGQUIT");
    for (const signal of signals) {
        process.on(signal, () => {
            exec(`taskkill /PID ${child.pid} /T`);
        });
    }
}
else {
    signals.push("SIGUSR1", "SIGUSR2");
    for (const signal of signals) {
        process.on(signal, () => {
            try {
                process.kill(-child.pid, signal);
            }
            catch {
            }
        });
    }
}
child.on("exit", (code, signal) => {
    process.exit(code ?? (signal ? 1 : 0));
});
