#!/usr/bin/env node

import type { SpawnOptions } from "node:child_process";
import { spawn, spawnSync } from "node:child_process";

const argv = process.argv;

if (argv.length <= 3) {
    process.exit(0);
}

const nodeEnv = argv[2];
const command = argv[3];
const args = argv.slice(4);
const spawnOptions: SpawnOptions = {
    env: {
        ...process.env,
        NODE_ENV: nodeEnv,
    },
    argv0: argv[0],
    shell: true,
    stdio: "inherit",
};

if (process.platform === "win32") {
    spawnSync(command, args, spawnOptions);
} else {
    spawnOptions.detached = true;

    const child = spawn(command, args, spawnOptions);

    if (typeof child.pid === "undefined") {
        process.exit(1);
    }

    const signals: NodeJS.Signals[] = [
        "SIGINT",
        "SIGTERM",
        "SIGHUP",
        "SIGUSR1",
        "SIGUSR2",
    ];

    for (const signal of signals) {
        process.on(signal, () => {
            try {
                // the pid has been checked before
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                process.kill(-child.pid!, signal);
            } catch {
                // do nothing
            }
        });
    }

    child.on("exit", (code, signal) => {
        process.exit(code ?? (signal ? 1 : 0));
    });
}
