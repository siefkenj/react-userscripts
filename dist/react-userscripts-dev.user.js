// ==UserScript==
// @name     React Userscripts dev
// @version  1.1
// @description Development mode for React Userscripts.
// @include https://*google.com/*
// @grant    none
// ==/UserScript==

"use strict";

function log(...args) {
    console.log("%cUserscript:", "color: purple; font-weight: bold", ...args);
}

log("Dev mode started");

async function main() {
    const resp = await fetch("http://localhost:8124/react-userscripts.user.js");
    const script = await resp.text();
    if (script.trim() === "") {
        log("No user script found");
        return;
    }
    log("Got Dev script");
    eval(script);
    log("Dev script evaled");
}

// Make sure we run once at the start
main.bind({})().catch((e) => {
    log("ERROR", e);
});
