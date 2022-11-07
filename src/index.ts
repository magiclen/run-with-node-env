#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const cp: typeof import("child_process") = require("child_process");

const argv = process.argv;

if (argv.length <= 3) {
    process.exit(0);
}

const nodeEnv = argv[2];
const command = argv[3];
const args = argv.slice(4);

cp.spawnSync(command, args, {
    env: {
        ...process.env,
        NODE_ENV: nodeEnv,
    },
    argv0: argv[0],
    shell: true,
    stdio: "inherit",
});
