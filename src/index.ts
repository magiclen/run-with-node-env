#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const argv = process.argv;

if (argv.length <= 3) {
    process.exit(0);
}

const nodeEnv = argv[2];
const command = argv[3];
const args = argv.slice(4);

spawnSync(command, args, {
    env: {
        ...process.env,
        NODE_ENV: nodeEnv,
    },
    argv0: argv[0],
    shell: true,
    stdio: "inherit",
});
